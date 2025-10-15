import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { StaffService } from '../../service/staff.service';

@Component({
  selector: 'app-crear-usuario',
  imports: [SharedZorroModule, FormsModule, CommonModule],
  templateUrl: './crear-usuario.component.html',
  styles: ``,
  providers: [NzMessageService],
})
export class CrearUsuarioComponent {
  private readonly staffService = inject(StaffService);
  private readonly messageService = inject(NzMessageService);

  modalRef = inject(NzModalRef);
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

  imagen_previsualiza: any = 'https://preview.keenthemes.com/metronic8/demo1/assets/media/svg/illustrations/easy/2.svg';
  file_imagen: any = null;

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
  onCreateStaff(): void {
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

    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('phone', this.phone);
    formData.append('type_documento', this.type_documento);
    formData.append('n_documento', this.n_documento);

    const formattedBirthday = this.birthday instanceof Date ? this.birthday.toISOString().split('T')[0] : this.birthday;

    formData.append('birthday', formattedBirthday);
    formData.append('roles', this.roles);
    formData.append('avatar', this.file_imagen, this.file_imagen.name);

    this.staffService.addStaff(formData).subscribe({
      next: (resp) => {
        this.messageService.success('Staff creado exitosamente');
        this.modalRef.close(true);
      },
      error: (error) => {
        const errorMessage = error.error?.error || error.error?.message || 'Error desconocido';
        if (error.status === 403) {
          this.messageService.error(errorMessage);
        } else {
          this.messageService.error(`Error al crear el usuario: ${errorMessage}`);
        }
      },
    });
  }
}
