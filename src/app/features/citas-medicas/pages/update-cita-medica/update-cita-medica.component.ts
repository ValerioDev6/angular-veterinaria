import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, concatMap, map } from 'rxjs';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { ICitaResponse } from '../../interfaces/cita.interface';
import { IComboPacientes } from '../../interfaces/pacientes_combo.dto';
import { SegmentTime, VeterinarieTimeAvailability } from '../../interfaces/veterinarios_horarios.interface';
import { CitasMedicasService } from '../../services/citas.service';

@Component({
  selector: 'app-update-cita-medica',
  imports: [SharedZorroModule, CommonModule, FormsModule, ReactiveFormsModule, NzCheckboxModule, RouterLink],
  templateUrl: './update-cita-medica.component.html',
  styleUrls: ['./update-cita-medica.component.scss'],
})
export default class UpdateCitaMedicaComponent implements OnInit {
  private readonly citasService = inject(CitasMedicasService);
  private readonly messageService = inject(NzMessageService);
  private readonly activatedRouter = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  selectedPet = signal<IComboPacientes | null>(null);
  petResource = this.citasService.pacientes;
  veterinarians = signal<VeterinarieTimeAvailability[]>([]);
  loading = signal<boolean>(false);

  cita = signal<ICitaResponse | null>(null);

  // ⭐ Guardar veterinario y horarios seleccionados
  selectedVeterinarianId = signal<string | null>(null);
  selectedSegmentIds = signal<string[]>([]);

  searchForm = this.fb.group({
    date_appointment: [new Date(), Validators.required],
    hour: [''],
  });

  citaForm: FormGroup = this.fb.group({
    reason: ['', Validators.required], // ⭐ REASON AQUÍ
    pet_id: [null, Validators.required],
    monto: [0, [Validators.required, Validators.min(0)]],
    adelanto: [0, [Validators.min(0)]],
    metodo_pago: ['EFECTIVO', Validators.required],
  });

  // Getters
  get date_appointment() {
    return this.searchForm.get('date_appointment');
  }
  get hour() {
    return this.searchForm.get('hour');
  }
  get reason() {
    return this.citaForm.get('reason');
  }
  get pet_id() {
    return this.citaForm.get('pet_id');
  }
  get amount() {
    return this.citaForm.get('monto');
  }
  get adelanto() {
    return this.citaForm.get('adelanto');
  }
  get metodo_pago() {
    return this.citaForm.get('metodo_pago');
  }

  ngOnInit(): void {
    // Escucha cambios en el formulario
    this.citaForm.get('pet_id')?.valueChanges.subscribe((petId) => {
      if (petId) {
        // Busca la mascota seleccionada en el recurso
        const pet = this.petResource().find((p) => p.id === petId);
        this.selectedPet.set(pet || null);
      } else {
        this.selectedPet.set(null);
      }
    });
    this.subscribeToRouteParams();
  }

  private subscribeToRouteParams(): void {
    this.activatedRouter.params
      .pipe(
        map((params) => params['id']),
        concatMap((id) => this.citaById(id)),
      )
      .subscribe({
        next: (cita) => {
          this.cita.set(cita);
          this.setFormValues(cita);
        },
      });
  }

  private citaById(id: number): Observable<ICitaResponse> {
    return this.citasService.getCitaById(id);
  }
  setFormValues(cita: ICitaResponse): void {
    // 1️⃣ Llenar el searchForm
    this.searchForm.setValue({
      date_appointment: cita.date_appointment,
      hour: cita.selected_segment_times[0]?.schedule_hour?.hour ?? null,
    });

    // 2️⃣ Llenar el citaForm
    this.citaForm.patchValue({
      reason: cita.reason,
      pet_id: cita.pet_id,
      monto: +cita.pago?.monto || 0,
      adelanto: +cita.pago?.adelanto || 0,
      metodo_pago: cita.pago?.metodo_pago || 'EFECTIVO',
    });

    // 3️⃣ Selecciones
    this.selectedPet.set({
      id: cita.pet.id,
      name: cita.pet.name,
      species: cita.pet.species,
      breed: cita.pet.breed,
    } as any);

    // 4️⃣ ⭐ IMPORTANTE: Establecer veterinario y horarios ANTES de buscar
    this.selectedVeterinarianId.set(cita.veterinarian_id);
    this.selectedSegmentIds.set(cita.selected_segment_times.map((s) => s.segment_time_id));

    console.log('✅ Horarios pre-seleccionados:', this.selectedSegmentIds()); // Debug

    // 5️⃣ Cargar calendario (los checkboxes ya estarán marcados)
    this.searchVeterinarians();
  }

  searchVeterinarians() {
    if (this.searchForm.invalid) {
      this.messageService.error('Selecciona una fecha');
      return;
    }

    const date = this.searchForm.get('date_appointment')?.value;
    const hour = this.searchForm.get('hour')?.value;
    if (!date) return;

    const formattedDate = this.formatDate(date);
    this.loading.set(true);

    this.citasService.getVeterinarianByShedule(formattedDate, hour || undefined).subscribe({
      next: (response) => {
        this.veterinarians.set(response.veterinarie_time_availability);
        if (response.veterinarie_time_availability.length === 0) {
          this.messageService.warning('No hay veterinarios disponibles');
        }
        this.citasService.refresh();
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.messageService.error('Error al buscar veterinarios');
        this.loading.set(false);
      },
    });
  }

  // Cuando selecciona/deselecciona un checkbox
  selectSegment(veterinarian: VeterinarieTimeAvailability, segment: SegmentTime, isChecked: boolean) {
    if (segment.check) {
      this.messageService.warning('Horario ocupado');
      return;
    }

    const segmentId = segment.veterinarie_schedule_hour_id;

    if (isChecked) {
      if (!this.selectedVeterinarianId()) {
        this.selectedVeterinarianId.set(veterinarian.id);
      }
      if (this.selectedVeterinarianId() !== veterinarian.id) {
        this.messageService.warning('Selecciona horarios del mismo veterinario');
        return;
      }
      this.selectedSegmentIds.set([...this.selectedSegmentIds(), segmentId]);
    } else {
      const newIds = this.selectedSegmentIds().filter((id) => id !== segmentId);
      this.selectedSegmentIds.set(newIds);
      if (newIds.length === 0) {
        this.selectedVeterinarianId.set(null);
      }
    }
  }

  // Verificar si está seleccionado (para el template)
  isSegmentSelected(segmentId: string): boolean {
    return this.selectedSegmentIds().includes(segmentId);
  }

  // ⭐ GUARDAR CITA
  saveCita() {
    if (this.searchForm.invalid || this.citaForm.invalid) {
      this.messageService.error('Completa todos los campos');
      return;
    }
    if (!this.selectedVeterinarianId() || this.selectedSegmentIds().length === 0) {
      this.messageService.error('Selecciona veterinario y horarios');
      return;
    }

    // ✅ Calcular el día de la semana
    const appointmentDate = this.searchForm.value.date_appointment! as Date;
    const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
    const dayName = diasSemana[appointmentDate.getDay()];

    const payload = {
      date_appointment: this.formatDate(appointmentDate),
      day: dayName, // ✅ AGREGAR ESTO
      reason: this.citaForm.value.reason,
      reprograming: false,
      state_payment: 'pendiente',
      pet_id: this.citaForm.value.pet_id,
      veterinarian_id: this.selectedVeterinarianId(),
      monto: this.citaForm.value.monto,
      adelanto: this.citaForm.value.adelanto || 0,
      metodo_pago: this.citaForm.value.metodo_pago,
      selected_segment_times: this.selectedSegmentIds().map((id) => ({ segment_time_id: id })),
    };

    console.log('📤 Payload a enviar:', payload); // Para debug

    this.loading.set(true);
    this.citasService.addCita(payload).subscribe({
      next: () => {
        this.messageService.success('Cita actualizada exitosamente');
        this.resetForm();
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.messageService.error('Error al crear cita');
        this.loading.set(false);
      },
    });
  }
  resetSearch() {
    this.searchForm.reset();
    this.veterinarians.set([]);
    this.selectedVeterinarianId.set(null);
    this.selectedSegmentIds.set([]);
  }

  resetForm() {
    this.citaForm.reset({ metodo_pago: 'EFECTIVO', amount: 0, adelanto: 0 });
    this.resetSearch();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
