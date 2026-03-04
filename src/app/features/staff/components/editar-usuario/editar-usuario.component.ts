import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { StaffService } from '../../service/staff.service';

@Component({
  selector: 'app-editar-usuario',
  imports: [SharedZorroModule, FormsModule, CommonModule],
  templateUrl: './editar-usuario.component.html',
  styles: ``,
  providers: [NzMessageService],
})
export class EditarUsuarioComponent implements OnInit {
  private readonly staffService = inject(StaffService);
  private readonly messageService = inject(NzMessageService);

  modalRef = inject(NzModalRef);
  staff: any = null; // Recibido por el modal

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

  ngOnInit(): void {
    if (this.staff) {
      this.username = this.staff.username;
      this.email = this.staff.email;
      this.phone = this.staff.phone;
      this.type_documento = this.staff.type_documento;
      this.n_documento = this.staff.n_documento;
      this.birthday = this.staff.birthday;
      this.roles = this.staff.roles;
      this.imagen_previsualiza = this.staff.avatar || this.imagen_previsualiza;
    }
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

  onUpdateStaff(): void {
    // Lógica para actualizar (dejar vacía o básica si el usuario solo quiere UI)
    this.messageService.info('Lógica de actualización pendiente de implementar');
  }
}
