import { CommonModule } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
// import { CreateMontoComponent } from '../../components/create-monto/create-monto.component';
import { Pago } from '../../interface/pagos.interface';
import { PagosService } from '../../service/pagos.service';

@Component({
  selector: 'app-pagos-page',
  imports: [SharedZorroModule, CommonModule, FormsModule],

  templateUrl: './pagos-page.component.html',
  styles: ``,
  providers: [NzModalService],
})
export class PagosPageComponent {
  private readonly pagosService = inject(PagosService);
  private readonly modalService = inject(NzModalService);

  pagos = this.pagosService.pagos;
  total = this.pagosService.pagosTotal;
  page = this.pagosService.page;
  limit = this.pagosService.limit;
  isLoading = this.pagosService.isLoading;

  searchTerm = signal<string>('');
  speciesFilter = signal<string>('');
  veterinarianFilter = signal<string>('');
  statePaymentFilter = signal<string>('');
  dateFromFilter = signal<Date | null>(null);
  dateToFilter = signal<Date | null>(null);

  petName: WritableSignal<string> = this.pagosService.petName;
  species = this.pagosService.species;
  veterinarianName = this.pagosService.veterinarianName;
  state_payment = this.pagosService.state_payment;
  dateFrom = this.pagosService.dateFrom;
  dateTo = this.pagosService.dateTo;
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
    this.pagosService.refresh();
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getTipoColor(tipo: string): string {
    const colors: { [key: string]: string } = {
      CITA: 'blue',
      VACUNA: 'green',
      CIRUGÍA: 'red',
    };
    return colors[tipo] || 'default';
  }

  openModal(pago: Pago): void {
    const modal = this.modalService.create({
      nzTitle: 'Agregar Pago',
      // nzContent: CreateMontoComponent,
      nzFooter: null,
      nzWidth: '600px',
      nzData: {
        pago: pago, // ← PASAS TODO EL OBJETO
      },
    });

    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.pagosService.refresh();
      }
    });
  }
}
