import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { IComboPacientes } from '../../../citas-medicas/interfaces/pacientes_combo.dto';
import {
  SegmentTime,
  VeterinarieTimeAvailability,
} from '../../../citas-medicas/interfaces/veterinarios_horarios.interface';
import { CitasMedicasService } from '../../../citas-medicas/services/citas.service';
import { VacunaService } from '../../services/vacunas.serive';

@Component({
  selector: 'app-create-vacuna',
  imports: [SharedZorroModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, NzCheckboxModule],
  templateUrl: './create-vacuna.component.html',
  styleUrls: ['./create-vacuna.component.scss'],
})
export default class CreateVacunaComponent implements OnInit {
  private readonly vacunaService = inject(VacunaService);
  private readonly citasMedicasService = inject(CitasMedicasService);
  private readonly messageService = inject(NzMessageService);
  private readonly fb = inject(FormBuilder);

  selectedPet = signal<IComboPacientes | null>(null);
  petResource = this.citasMedicasService.pacientes;
  veterinarians = signal<VeterinarieTimeAvailability[]>([]);
  loading = signal<boolean>(false);

  searchForm = this.fb.group({
    date_appointment: [null, Validators.required],
    hour: [null],
  });

  vacunasForm: FormGroup = this.fb.group({
    reason: ['', Validators.required],
    vaccine_names: ['', Validators.required],
    outside: [false, Validators.required],
    next_due_date: [new Date(), Validators.required],
    pet_id: [null, Validators.required],
    monto: [0, [Validators.required, Validators.min(0)]],
    adelanto: [0, [Validators.min(0)]],
    metodo_pago: ['EFECTIVO', Validators.required],
  });

  get date_appointment() {
    return this.searchForm.get('date_appointment');
  }
  get hour() {
    return this.searchForm.get('hour');
  }

  get vaccine_names() {
    return this.vacunasForm.get('vaccine_names');
  }
  get reason() {
    return this.vacunasForm.get('reason');
  }
  get pet_id() {
    return this.vacunasForm.get('pet_id');
  }
  get amount() {
    return this.vacunasForm.get('monto');
  }
  get adelanto() {
    return this.vacunasForm.get('adelanto');
  }
  get metodo_pago() {
    return this.vacunasForm.get('metodo_pago');
  }

  selectedVeterinarianId = signal<string | null>(null);
  selectedSegmentIds = signal<string[]>([]);

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

    this.citasMedicasService.getVeterinarianByShedule(formattedDate, hour || undefined).subscribe({
      next: (response) => {
        this.veterinarians.set(response.veterinarie_time_availability);
        if (response.veterinarie_time_availability.length === 0) {
          this.messageService.warning('No hay veterinarios disponibles');
        }
        this.citasMedicasService.refresh();
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

  saveVacunas() {
    if (this.searchForm.invalid || this.vacunasForm.invalid) {
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
      vaccination_day: this.formatDate(appointmentDate),
      day: dayName,
      reason: this.vacunasForm.value.reason,
      state_payment: 'pendiente',
      pet_id: this.vacunasForm.value.pet_id,
      veterinarian_id: this.selectedVeterinarianId(),
      vaccine_names: this.vacunasForm.value.vaccine_names,
      outside: this.vacunasForm.value.outside,
      next_due_date: this.vacunasForm.value.next_due_date,
      monto: this.vacunasForm.value.monto,
      adelanto: this.vacunasForm.value.adelanto || 0,
      metodo_pago: this.vacunasForm.value.metodo_pago,
      selected_segment_times: this.selectedSegmentIds().map((id) => ({ segment_time_id: id })),
    };

    console.log('📤 Payload a enviar:', payload); // Para debug

    this.loading.set(true);
    this.vacunaService.addVacuna(payload).subscribe({
      next: () => {
        this.messageService.success('Registro de vacuna creada!');
        this.resetForm();
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.messageService.error('Error al crear vacunas');
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
    this.vacunasForm.reset({ metodo_pago: 'EFECTIVO', amount: 0, adelanto: 0 });
    this.resetSearch();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit() {
    // Escucha cambios en el formulario
    this.vacunasForm.get('pet_id')?.valueChanges.subscribe((petId) => {
      if (petId) {
        // Busca la mascota seleccionada en el recurso
        const pet = this.petResource().find((p) => p.id === petId);
        this.selectedPet.set(pet || null);
      } else {
        this.selectedPet.set(null);
      }
    });
  }
}
