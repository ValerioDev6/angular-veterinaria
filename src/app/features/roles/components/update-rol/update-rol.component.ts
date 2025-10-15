import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { PERMISOS } from '../../../../core/constants/role-permission.constant';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { RolePermission } from '../../interfaces/rol.inteface';
import { RolService } from '../../services/roles.service';
interface ModalData {
  id: string;
}
@Component({
  selector: 'app-update-rol',
  imports: [SharedZorroModule, ReactiveFormsModule],
  templateUrl: './update-rol.component.html',
  styles: ``,
})
export class UpdateRolComponent {
  private readonly rolService = inject(RolService);
  private readonly fb = inject(FormBuilder);
  private readonly modalRef = inject(NzModalRef);
  private readonly messageService = inject(NzMessageService);
  private readonly data = inject<ModalData>(NZ_MODAL_DATA);
  permisosModulos = PERMISOS;
  loading = signal(false);
  formGroup!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.loadRoleData();
  }

  private initForm(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      selectedPermissions: this.fb.array([]),
    });
  }

  private loadRoleData(): void {
    this.loading.set(true);
    this.rolService.getRoleById(this.data.id).subscribe({
      next: (role) => {
        this.formGroup.patchValue({
          name: role.name,
        });

        // Clear existing permissions
        while (this.selectedPermissionsArray.length > 0) {
          this.selectedPermissionsArray.removeAt(0);
        }

        // Add current permissions
        if (role.role_permissions) {
          role.role_permissions.forEach((rolePermission: RolePermission) => {
            this.selectedPermissionsArray.push(this.fb.control(rolePermission.permissions.id));
          });
        }

        this.loading.set(false);
      },
      error: (error) => {
        this.messageService.error(`Error al cargar el rol: ${error.message}`);
        this.loading.set(false);
        console.error(error);
      },
    });
  }
  get selectedPermissionsArray(): FormArray {
    return this.formGroup.get('selectedPermissions') as FormArray;
  }
  isPermissionSelected(permissionId: string): boolean {
    return this.selectedPermissionsArray.controls.some((control) => control.value === permissionId);
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
    return this.formGroup.controls['name'] as FormControl;
  }

  onUpdateRol(): void {
    if (this.formGroup.invalid) {
      this.validateForm();
      return;
    }

    const rolData = {
      name: this.formGroup.get('name')?.value,
      permissions: this.selectedPermissionsArray.value,
    };

    this.loading.set(true);
    this.rolService.updatedRole(this.data.id, rolData).subscribe({
      next: () => {
        this.messageService.success('Rol actualizado exitosamente');
        this.modalRef.close(true);
      },
      error: (error) => {
        this.messageService.error(`Error al actualizar el rol: ${error.message}`);
        this.loading.set(false);
        console.error(error);
      },
    });
  }

  private validateForm(): void {
    Object.values(this.formGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  cancelEdit(): void {
    this.modalRef.close(false);
  }
}
