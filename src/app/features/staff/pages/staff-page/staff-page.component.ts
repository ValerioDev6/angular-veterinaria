import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { CrearUsuarioComponent } from '../../components/crear-usuario/crear-usuario.component';
import { User } from '../../interfaces/staff.interface';
import { StaffService } from '../../service/staff.service';

@Component({
  selector: 'app-staff-page',
  imports: [SharedZorroModule, DatePipe, FormsModule],
  templateUrl: './staff-page.component.html',
  styles: ``,
  providers: [NzMessageService, NzModalService],
})
export default class StaffPageComponent {
  private readonly staffService = inject(StaffService);
  private readonly router = inject(Router);
  private readonly messageService = inject(NzMessageService);
  private readonly modalService = inject(NzModalService);

  stafs = this.staffService.staff;
  isLoading = this.staffService.loading;
  search = this.staffService.search;

  total = this.staffService.total;
  page = this.staffService.page;
  limit = this.staffService.limit;
  searchTerm = signal<string>('');

  pageChanged(newPage: number): void {
    this.page.set(newPage);
  }

  changePageSize(size: number): void {
    this.limit.set(size);
    this.page.set(1);
  }

  onSearch(): void {
    this.search.set(this.searchTerm());
    this.page.set(1);
  }

  refreshData(): void {
    this.staffService.refresh();
  }

  showDeleteConfirmModal(user: User): void {
    this.modalService.confirm({
      nzTitle: `Esta seguro de eliminar este usuario: ${user.username}?`,
      nzContent: 'Esta accion no se puede desacer',
      nzOkText: 'SI',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteUser(user),
      nzCancelText: 'No',
    });
  }

  deleteUser(user: User): void {
    this.staffService.deleteStaffById(user.id).subscribe({
      next: () => {
        this.messageService.success('Usuario eliminado con exito');
        this.refreshData();
      },
      error: () => {
        this.messageService.error('Error al eliminar el usuario');
      },
    });
  }

  openModal() {
    const modal = this.modalService.create({
      nzTitle: 'Crear Usuario',
      nzContent: CrearUsuarioComponent,
      nzFooter: null,
    });

    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.staffService.refresh();
      }
    });
  }

  updateStaff(staff: any): void {
    this.router.navigate(['/admin/users/', staff.id]);
  }
}
