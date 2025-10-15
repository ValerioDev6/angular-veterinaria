import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, concatMap, map, takeUntil } from 'rxjs';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { AutoDestroyService } from '../../../../shared/utils/auto-desstroy.service';
import { IStaff } from '../../interfaces/user.interface';
import { StaffService } from '../../service/staff.service';

@Component({
  selector: 'app-update-staff',
  imports: [FormsModule, SharedZorroModule, CommonModule],
  templateUrl: './update-staff.component.html',
  styles: ``,
  providers: [AutoDestroyService, NzMessageService],
})
export default class UpdateStaffComponent implements OnInit {
  private readonly staffService = inject(StaffService);
  private readonly messageService = inject(NzMessageService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly $destroy = inject(AutoDestroyService);
  $staff: WritableSignal<IStaff | null> = signal(null);

  documentTypes = [
    { value: 'DNI', label: 'DNI' },
    { value: 'Pasaporte', label: 'Pasaporte' },
    { value: 'Carnet de Extranjería', label: 'Carnet de Extranjería' },
    { value: 'PTP', label: 'PTP' },
    { value: 'DOCTOR', label: 'Doctor' },
  ];

  roles = this.staffService.rolCombo;

  // Form fields
  username: string = '';
  email: string = '';
  phone: string = '';
  type_documento: string = '';
  n_documento: string = '';
  birthday: Date | string = '';
  roleId: string = '';
  avatar: string = '';

  imagen_previsualiza: any =
    'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg';
  file_imagen: any = null;

  ngOnInit(): void {
    this.subcribeToRouteParams();
  }

  private subcribeToRouteParams(): void {
    this.activatedRoute.params
      .pipe(
        map((params) => params['id']),
        concatMap((id) => this.getStaffById(id)),
        takeUntil(this.$destroy),
      )
      .subscribe({
        next: (staff) => {
          this.$staff.set(staff);
          this.setFormValues(staff);
        },
      });
  }

  private getStaffById(id: string): Observable<IStaff> {
    return this.staffService.getStaffById(id);
  }

  private setFormValues(staff: IStaff): void {
    this.username = staff.username;
    this.email = staff.email;
    this.phone = staff.phone;
    this.type_documento = staff.type_documento;
    this.n_documento = staff.n_documento;
    this.birthday = staff.birthday;
    if (staff.roles && staff.roles.id) {
      this.roleId = staff.roles.id.toString();
    }
    this.avatar = staff.avatar;
    if (staff.avatar) {
      this.imagen_previsualiza = staff.avatar;
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
    const staffId = this.$staff()?.id;
    if (!staffId) {
      this.messageService.error('ID de usuario no encontrado');
      return;
    }

    if (
      !this.username ||
      !this.email ||
      !this.phone ||
      !this.type_documento ||
      !this.n_documento ||
      !this.birthday ||
      !this.roleId
    ) {
      this.messageService.error('Los campos con * son obligatorios');
      return;
    }

    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('email', this.email);


    formData.append('phone', this.phone);
    formData.append('type_documento', this.type_documento);
    formData.append('n_documento', this.n_documento);

    const formattedBirthday = this.birthday instanceof Date ? this.birthday.toISOString().split('T')[0] : this.birthday;

    formData.append('birthday', formattedBirthday);
    formData.append('roleId', this.roleId);

    // Only append avatar if a new file has been selected
    if (this.file_imagen) {
      formData.append('avatar', this.file_imagen, this.file_imagen.name);
    }

    this.staffService.updatedStaff(staffId, formData).subscribe({
      next: () => {
        this.messageService.success('Usuario actualizado exitosamente');
        this.router.navigate(['/admin/users/lista']);
        this.staffService.refresh();
      },
      error: (error) => {
        this.messageService.error(
          `Error al actualizar el usuario: ${error.errors || error.message || 'Error desconocido'}`,
        );
      },
    });
  }

  redirectToListStaff() {
    this.router.navigate(['/admin/users/lista']);
  }
}
