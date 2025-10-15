import { CommonModule } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { VacunaService } from '../../services/vacunas.serive';

@Component({
  selector: 'app-vacunas-page',
  imports: [SharedZorroModule, RouterLink, CommonModule, FormsModule],
  templateUrl: './vacunas-page.component.html',
  styles: ``,
  providers: [NzModalService, NzMessageService]

})
export default class VacunasPageComponent {

  private readonly vacunasService = inject(VacunaService)
  private readonly messageService = inject(NzMessageService)
  private readonly modalService = inject(NzModalService)

  vacunas = this.vacunasService.vacines;
  total = this.vacunasService.vacinesTotal;
  page = this.vacunasService.page;
  limit = this.vacunasService.limit;
  isLoading = this.vacunasService.isLoading;

  searchTerm = signal<string>('');
  speciesFilter = signal<string>('');
  veterinarianFilter = signal<string>('');
  statePaymentFilter = signal<string>('');
  dateFromFilter = signal<Date | null>(null);
  dateToFilter = signal<Date | null>(null);

  petName: WritableSignal<string> = this.vacunasService.petName;
  species = this.vacunasService.species;
  veterinarianName = this.vacunasService.veterinarianName;
  state_payment = this.vacunasService.state_payment;
  dateFrom = this.vacunasService.dateFrom;
  dateTo = this.vacunasService.dateTo;
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
    this.vacunasService.refresh();
  }
 private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
