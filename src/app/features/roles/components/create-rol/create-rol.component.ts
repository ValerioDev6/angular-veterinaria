import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { PERMISOS } from '../../../../core/constants/role-permission.constant';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { RolService } from '../../services/roles.service';

@Component({
  selector: 'app-create-rol',
  imports: [SharedZorroModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-rol.component.html',
  styles: ``,
  providers: [NzMessageService],
})
export class CreateRolComponent {
  private readonly rolService = inject(RolService);
  private readonly messageService = inject(NzMessageService);
  modalRef = inject(NzModalRef);
  private fb = inject(FormBuilder);

  permisosModulos = PERMISOS;

  formRol = signal<FormGroup>(
    this.fb.group({
      name: ['', Validators.required],
      selectedPermissions: this.fb.array([]),
    }),
  );

  get selectedPermissionsArray(): FormArray {
    return this.formRol().get('selectedPermissions') as FormArray;
  }

  onPermissionChange(permissionId: string, isChecked: boolean): void {
    if (isChecked) {
      this.addPermission(permissionId);
    } else {
      this.removePermission(permissionId);
    }
  }

  private addPermission(permissionId: string): void {
    const exists = this.selectedPermissionsArray.controls.some((control) => control.value === permissionId);

    if (!exists) {
      this.selectedPermissionsArray.push(this.fb.control(permissionId));
    }
  }

  private removePermission(permissionId: string): void {
    const index = this.selectedPermissionsArray.controls.findIndex((control) => control.value === permissionId);

    if (index >= 0) {
      this.selectedPermissionsArray.removeAt(index);
    }
  }
  get nameField(): FormControl {
    return this.formRol().controls['name'] as FormControl;
  }

  onCreateRol(): void {
    if (this.formRol().invalid) {
      this.markFormTouched();
      return;
    }

    const rolData = {
      name: this.formRol().get('name')?.value,
      permissions: this.selectedPermissionsArray.value,
    };

    this.rolService.addRole(rolData).subscribe({
      next: (response) => {
        this.messageService.success('Rol creado exitosamente');
        this.modalRef.close(true);
      },
      error: (error) => {
        this.messageService.error(`Error al crear el rol ${error.errors}`);
        console.error(error);
      },
    });
  }

  private markFormTouched(): void {
    Object.values(this.formRol().controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
