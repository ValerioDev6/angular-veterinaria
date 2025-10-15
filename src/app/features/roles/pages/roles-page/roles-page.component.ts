import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IPERMISOS } from '../../../../core/auth/interfaces/auth_responser.interface';
import { HasPermissionDirective } from '../../../../core/directive/permission.directive';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { CreateRolComponent } from '../../components/create-rol/create-rol.component';
import { UpdateRolComponent } from '../../components/update-rol/update-rol.component';
import { IRol } from '../../interfaces/rol.inteface';
import { RolService } from '../../services/roles.service';

@Component({
  selector: 'app-roles-page',
  imports: [SharedZorroModule, DatePipe, ReactiveFormsModule, FormsModule, HasPermissionDirective],
  templateUrl: './roles-page.component.html',
  styles: ``,
  providers: [NzModalService, NzMessageService],
})
export default class RolesPageComponent {

  PERMISOS = IPERMISOS;

  private readonly rolService = inject(RolService);
  private readonly router = inject(Router);
  private readonly modalService = inject(NzModalService);
  private readonly messageService = inject(NzMessageService);

  errorMessage = this.rolService.errorMessage;
  roles = this.rolService.roles;
  isLoading = this.rolService.isLoading;

  total = this.rolService.total;
  page = this.rolService.page;
  limit = this.rolService.limit;
  searchTerm = signal('');

  pageChanged(newPage: number): void {
    this.rolService.page.set(newPage);
  }

  changePageSize(size: number): void {
    this.rolService.limit.set(size);
    this.rolService.page.set(1);
  }

  onSearch(): void {
    this.rolService.search.set(this.searchTerm());
    this.rolService.page.set(1);
  }

  refreshData(): void {
    this.rolService.refresh();
  }

  viewRol(rol: IRol) {
    this.router.navigate([`/admin/roles/${rol.id}`]);
  }

  showDeleteConfirmModal(rol: IRol): void {
    this.modalService.confirm({
      nzTitle: '¿Estás seguro de que deseas eliminar este rol?',
      nzContent: 'Esta acción no se puede deshacer',
      nzOkText: 'Sí',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteRol(rol),
      nzCancelText: 'No',
    });
  }

  deleteRol(rol: IRol) {
    this.rolService.deleteRolById(rol.id).subscribe({
      next: () => {
        this.messageService.success('Success! Rol eliminado correctamente.');
        this.rolService.refresh(); // Ejecutamos la función retornada por el computed
      },
      error: () => {
        this.messageService.error('Error al eliminar el rol');
      },
    });
  }

  openModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Crear Rol',
      nzContent: CreateRolComponent,
      nzFooter: null, // Optional - remove default footer
      nzWidth: '600px', // Optional - set width
    });

    // You can subscribe to the afterClose event
    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.rolService.refresh();
      }
    });
  }

  openEditModal(role: IRol): void {
    const modal = this.modalService.create({
      nzTitle: 'Editar Rol',
      nzContent: UpdateRolComponent,
      nzData: { id: role.id },
      nzFooter: null,
    });

    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.rolService.refresh();
      }
    });
  }
}
