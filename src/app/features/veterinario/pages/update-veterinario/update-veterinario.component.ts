import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, concatMap, map } from 'rxjs';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { StaffService } from '../../../staff/service/staff.service';
import { IVeterinario } from '../../interfaces/veterinario.interface';
import { VeterinarioService } from '../../services/veterinario.service';

@Component({
  selector: 'app-update-veterinario',
  imports: [SharedZorroModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './update-veterinario.component.html',
  styleUrl: './update-veterinario.component.scss',
})
export class UpdateVeterinarioComponent implements OnInit {
  private readonly veterinarianService = inject(VeterinarioService);
  private readonly staffService = inject(StaffService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly messageService = inject(NzMessageService);
  sheduleHours = this.veterinarianService.sheduleHours;

  private readonly router = inject(Router);
  $veterinarian = signal<IVeterinario | null>(null);
  roles = this.staffService.rolCombo;

  username: string = '';
  email: string = '';
  phone: string = '';
  type_documento: string = '';
  n_documento = '';
  birthday: Date | string = '';
  roleId: string = '';
  avatar: string = '';
  shedule: any = '';

  imagen_previsualiza: any = 'https://preview.keenthemes.com/metronic8/demo1/assets/media/svg/illustrations/easy/2.svg';
  file_imagen: any = null;

  ngOnInit(): void {
    this.subcribeToRouteParams();
  }

  private veterinarianById(id: string): Observable<IVeterinario> {
    return this.veterinarianService.getVeterinarioById(id);
  }

  private subcribeToRouteParams(): void {
    this.activatedRoute.params
      .pipe(
        map((params) => params['id']),
        concatMap((id) => this.veterinarianById(id)),
        // takeUntilDestroyed(),
      )
      .subscribe({
        next: (veterinarian) => {
          this.$veterinarian.set(veterinarian);
          this.setFormValues(veterinarian);
        },
      });
  }
  private setFormValues(veterinarian: IVeterinario): void {
    this.username = veterinarian.username;
    this.email = veterinarian.email;
    this.phone = veterinarian.phone;
    this.type_documento = veterinarian.type_documento;
    this.n_documento = veterinarian.n_documento;
    this.birthday = veterinarian.birthday;
    this.avatar = veterinarian.avatar;

    if (veterinarian.role && veterinarian.role.id) {
      this.roleId = veterinarian.role.id.toString();
    }
    this.avatar = veterinarian.avatar;
    if (veterinarian.avatar) {
      this.imagen_previsualiza = veterinarian.avatar;
    }
    if (veterinarian.schedule && veterinarian.schedule.length > 0) {
      this.loadScheduleToCheckboxes(veterinarian.schedule);
    }
  }

  // Nuevo método para cargar los horarios en los checkboxes
  private loadScheduleToCheckboxes(schedule: any[]): void {
    // Limpiar selecciones previas
    this.selectedSchedules = {};

    // Recorrer cada día del schedule
    schedule.forEach((daySchedule) => {
      const dayInEnglish = daySchedule.day; // 'monday', 'tuesday', etc.

      // Recorrer cada hora del día
      daySchedule.hours.forEach((hour: any) => {
        // Crear la clave: 'monday-1', 'tuesday-5', etc.
        const key = `${dayInEnglish}-${hour.id}`;
        // Marcar como seleccionado
        this.selectedSchedules[key] = true;
      });
    });
  }

  processFile($event: any) {
    if ($event.target.files[0].type.indexOf('image') < 0) {
      this.messageService.error('Validacion!, El archivo no es una imagen');
      return;
    }
    this.file_imagen = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file_imagen);
    reader.onloadend = () => (this.imagen_previsualiza = reader.result);
  }

  days = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
  groupedHours = computed(() => {
    const hours = this.sheduleHours();
    const grouped: { [key: string]: any[] } = {};

    hours.forEach((slot) => {
      if (!grouped[slot.hour as string]) {
        grouped[slot.hour as string] = [];
      }
      grouped[slot.hour as string].push(slot);
    });

    return Object.keys(grouped)
      .sort()
      .map((hour) => ({
        hour,
        slots: grouped[hour],
      }));
  });

  dayMap: { [key: string]: string } = {
    LUNES: 'monday',
    MARTES: 'tuesday',
    MIERCOLES: 'wednesday',
    JUEVES: 'thursday',
    VIERNES: 'friday',
  };

  // Estado de checkboxes seleccionados
  selectedSchedules: { [key: string]: boolean } = {};

  // Verificar si está marcado
  isChecked(day: string, slotId: string): boolean {
    const key = `${this.dayMap[day]}-${slotId}`;
    return this.selectedSchedules[key] || false;
  }

  // Manejar cambio de checkbox
  onCheckboxChange(day: string, slotId: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const key = `${this.dayMap[day]}-${slotId}`;
    this.selectedSchedules[key] = checkbox.checked;
  }

  // Obtener horarios seleccionados
  getSelectedSchedules() {
    const schedules: any[] = [];
    Object.keys(this.selectedSchedules).forEach((key) => {
      if (this.selectedSchedules[key]) {
        const [day, slotId] = key.split('-');
        schedules.push({
          day: day,
          segment_time_id: Number.parseInt(slotId, 10),
        });
      }
    });

    return schedules;
  }
  onUpdateVeterinarie() {
  const veterinarianId = this.$veterinarian()?.id;

  if (!veterinarianId) {
    this.messageService.error('ID de veterinario no encontrado');
    return;
  }

  // Validar campos obligatorios
  if (
    !this.username ||
    !this.email ||
    !this.phone ||
    !this.type_documento ||
    !this.n_documento ||
    !this.birthday ||
    !this.roleId
  ) {
    this.messageService.error('Por favor complete todos los campos obligatorios');
    return;
  }

  // Validar horarios
  const schedules = this.getSelectedSchedules();
  if (schedules.length === 0) {
    this.messageService.error('Debe seleccionar al menos un horario de atención');
    return;
  }

  // Crear FormData
  const formData = new FormData();
  formData.append('username', this.username);
  formData.append('email', this.email);
  formData.append('phone', this.phone);
  formData.append('type_documento', this.type_documento);
  formData.append('n_documento', this.n_documento);

  // Formatear fecha
  const formattedBirthday =
    this.birthday instanceof Date
      ? this.birthday.toISOString().split('T')[0]
      : this.birthday;
  formData.append('birthday', formattedBirthday);

  formData.append('roleId', this.roleId);

  // Solo agregar imagen si hay una nueva
  if (this.file_imagen) {
    formData.append('avatar', this.file_imagen, this.file_imagen.name);
  }

  // Agregar horarios
  formData.append('schedule_hour_veterinarie', JSON.stringify(schedules));

  // Enviar actualización
  this.veterinarianService.updatedVeterinarian(veterinarianId, formData).subscribe({
    next: () => {
      this.messageService.success('Veterinario actualizado exitosamente');
      this.router.navigate(['/admin/veterinarios/lista']);
    },
    error: (error) => {
      this.messageService.error(
        `Error al actualizar: ${error.error?.message || error.message || 'Error desconocido'}`
      );
    },
  });
}

  resetForm(): void {
    // Limpiar campos básicos
    this.username = '';
    this.email = '';
    this.phone = '';
    this.type_documento = '';
    this.n_documento = '';
    this.birthday = '';
    this.roleId = '';
    this.avatar = '';
    this.shedule = '';
    // Limpiar imagen
    this.file_imagen = null;
    this.imagen_previsualiza =
      'https://preview.keenthemes.com/metronic8/demo1/assets/media/svg/illustrations/easy/2.svg';
    // Limpiar checkboxes seleccionados
    this.selectedSchedules = {};
  }
}
