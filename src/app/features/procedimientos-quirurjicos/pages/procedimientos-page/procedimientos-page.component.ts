import { CommonModule } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { CirujiaService } from '../../service/cirujias.service';

@Component({
  selector: 'app-procedimientos-page',
  imports: [SharedZorroModule, FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './procedimientos-page.component.html',
  styles: ``
})
export default class ProcedimientosPageComponent {

  private readonly _cirujiasService = inject(CirujiaService)



  cirujiasLocal = this._cirujiasService.cirujias;
  total = this._cirujiasService.cirujiasTotal;
  page = this._cirujiasService.page;
  limit = this._cirujiasService.limit;
  isLoading = this._cirujiasService.isLoading;

  searchTerm = signal<string>('');
  speciesFilter = signal<string>('');
  veterinarianFilter = signal<string>('');
  statePaymentFilter = signal<string>('');
  dateFromFilter = signal<Date | null>(null);
  dateToFilter = signal<Date | null>(null);

  petName: WritableSignal<string> = this._cirujiasService.petName;
  species = this._cirujiasService.species;
  veterinarianName = this._cirujiasService.veterinarianName;
  state_payment = this._cirujiasService.state_payment;
  dateFrom = this._cirujiasService.dateFrom;
  dateTo = this._cirujiasService.dateTo;
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
    this._cirujiasService.refresh();
  }
 private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


}
