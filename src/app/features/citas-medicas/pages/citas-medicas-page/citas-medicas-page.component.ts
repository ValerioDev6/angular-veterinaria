import { CommonModule } from '@angular/common';
import { Component, Signal, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { Cita } from '../../interfaces/citas_pagiantion.dto';
import { CitasMedicasService } from '../../services/citas.service';

@Component({
  selector: 'app-citas-medicas-page',
  imports: [SharedZorroModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './citas-medicas-page.component.html',
  providers: [NzModalService, NzMessageService]

})
export default class CitasMedicasPageComponent {
  private readonly citasService = inject(CitasMedicasService);
  private readonly router = inject(Router);
  private readonly modalService = inject(NzModalService);
  private readonly messageService = inject(NzMessageService);

  citas: Signal<Cita[]> = this.citasService.citas;
  total = this.citasService.citasTotal;
  page = this.citasService.page;
  limit = this.citasService.limit;
  isLoading = this.citasService.isLoading;

  // Filtros
  searchTerm = signal<string>('');
  speciesFilter = signal<string>('');
  veterinarianFilter = signal<string>('');
  statePaymentFilter = signal<string>('');
  dateFromFilter = signal<Date | null>(null);
  dateToFilter = signal<Date | null>(null);

  petName: WritableSignal<string> = this.citasService.petName;
  species = this.citasService.species;
  veterinarianName = this.citasService.veterinarianName;
  state_payment = this.citasService.state_payment;
  dateFrom = this.citasService.dateFrom;
  dateTo = this.citasService.dateTo;

  onFilterSpecies(): void {
    this.species.set(this.speciesFilter());
    this.page.set(1);
  }

  onSearch(): void {
    this.petName.set(this.searchTerm());
    this.page.set(1);
  }

  onFilterVeterinarian(): void {
    this.veterinarianName.set(this.veterinarianFilter());
    this.page.set(1);
  }

  onFilterStatePayment(): void {
    this.state_payment.set(this.statePaymentFilter());
    this.page.set(1);
  }

  onDateFromChange(date: Date | null): void {
    this.dateFromFilter.set(date);
    this.dateFrom.set(date ? this.formatDate(date) : '');
    this.page.set(1);
  }

  onDateToChange(date: Date | null): void {
    this.dateToFilter.set(date);
    this.dateTo.set(date ? this.formatDate(date) : '');
    this.page.set(1);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.speciesFilter.set('');
    this.veterinarianFilter.set('');
    this.statePaymentFilter.set('');
    this.dateFromFilter.set(null);
    this.dateToFilter.set(null);

    this.petName.set('');
    this.species.set('');
    this.veterinarianName.set('');
    this.state_payment.set('');
    this.dateFrom.set('');
    this.dateTo.set('');
    this.page.set(1);
  }

  pageChanged(newPage: number): void {
    this.page.set(newPage);
  }

  changePageSize(size: number): void {
    this.limit.set(size);
    this.page.set(1);
  }

  refreshData(): void {
    this.citasService.refresh();
  }

  onCreatePaciente(): void {
    this.router.navigateByUrl('/admin/citas-medicas/registrar');
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  showDeleteConfirmModal(cita: Cita): void {
      this.modalService.confirm({
        nzTitle: '¿Estás seguro de que deseas eliminar esta cita?',
        nzContent: 'Esta acción no se puede deshacer',
        nzOkText: 'Sí',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.deleteCita(cita),
        nzCancelText: 'No',
      });
    }

    deleteCita(cita: Cita) {
      this.citasService.deleteCitaMedica(cita.id).subscribe({
        next: () => {
          this.messageService.success('Success! Cita Medica eliminado correctamente.');
          this.citasService.refresh(); // Ejecutamos la función retornada por el computed
        },
        error: () => {
          this.messageService.error('Error al eliminar la cita');
        },
      });
    }

}
