import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { StaffService } from '../../../staff/service/staff.service';
import { VeterinarioService } from '../../services/veterinario.service';

@Component({
  selector: 'app-create-veterinario',
  imports: [SharedZorroModule, FormsModule, CommonModule],
  templateUrl: './create-veterinario.component.html',
  styleUrls: ['./create-veterinario.component.scss'],
  providers: [NzMessageService],
})
export class CreateVeterinarioComponent {
  private readonly veterinarioService = inject(VeterinarioService);
  private readonly staffService = inject(StaffService);
  private readonly messageService = inject(NzMessageService);

  sheduleHours = this.veterinarioService.sheduleHours;

  roles$ = this.staffService.rolCombo;

  username: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  type_documento: string = '';
  n_documento = '';
  birthday: Date | string = '';
  roles: string = '';
  avatar: string = '';
  shedule: any = '';

  imagen_previsualiza: any = 'https://preview.keenthemes.com/metronic8/demo1/assets/media/svg/illustrations/easy/2.svg';
  file_imagen: any = null;

  processFile = (file: NzUploadFile): boolean => {
    // Check if file is an image
    const isImage = file.type?.indexOf('image') !== -1;
    if (!isImage) {
      this.messageService.error('Validación: El archivo no es una imagen');
      return false;
    }

    // Read the file
    const reader = new FileReader();
    reader.readAsDataURL(file as any);
    reader.onloadend = () => {
      this.imagen_previsualiza = reader.result;
      this.file_imagen = file;
    };

    return true;
  };



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

  onCreateStaff(): void {
    // Validaciones existentes...
    if (
      !this.username ||
      !this.email ||
      !this.password ||
      !this.phone ||
      !this.type_documento ||
      !this.n_documento ||
      !this.birthday ||
      !this.roles ||
      !this.file_imagen
    ) {
      this.messageService.error('Los campos con * son obligatorios');
      return;
    }

    // Validar horarios
    const schedules = this.getSelectedSchedules();
    if (schedules.length === 0) {
      this.messageService.error('Debe seleccionar al menos un horario');
      return;
    }

    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('phone', this.phone);
    formData.append('type_documento', this.type_documento);
    formData.append('n_documento', this.n_documento);

    const formattedBirthday =
      this.birthday instanceof Date
        ? this.birthday.toISOString().split('T')[0]
        : this.birthday;
    formData.append('birthday', formattedBirthday);
    formData.append('roleId', this.roles);
    formData.append('avatar', this.file_imagen, this.file_imagen.name);

    // Agregar horarios
    formData.append('schedule_hour_veterinarie', JSON.stringify(schedules));

    this.veterinarioService.createVeterinario(formData).subscribe({
      next: () => {
        this.messageService.success('Veterinario creado exitosamente');
        this.resetForm();
        this.veterinarioService.refresh();

      },
      error: (error) => {
        this.messageService.error(
          `Error al crear el usuario: ${
            error.errors || error.message || 'Error desconocido'
          }`
        );
      },
    });
  }
  // Método para resetear el formulario
  resetForm(): void {
    // Limpiar campos básicos
    this.username = '';
    this.email = '';
    this.password = '';
    this.phone = '';
    this.type_documento = '';
    this.n_documento = '';
    this.birthday = '';
    this.roles = '';
    this.avatar = '';
    this.shedule = '';
    // Limpiar imagen
    this.file_imagen = null;
    this.imagen_previsualiza = 'https://preview.keenthemes.com/metronic8/demo1/assets/media/svg/illustrations/easy/2.svg';
    // Limpiar checkboxes seleccionados
    this.selectedSchedules = {};
  }
}
