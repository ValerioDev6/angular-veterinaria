import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { Paciente } from '../../interfaces/pacientes.interface';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-mascota-page',
  imports: [SharedZorroModule, FormsModule, DatePipe, RouterLink],
  templateUrl: './mascota-page.component.html',
  styles: ``,
  providers: [NzMessageService],
})
export default class MascotaPageComponent {
  private readonly pacienteService = inject(PacienteService);
  private readonly router = inject(Router);
  private readonly messageService = inject(NzMessageService);

  pacientes = this.pacienteService.pacientes;
  isLoading = this.pacienteService.loading;
  search = this.pacienteService.search;
  total = this.pacienteService.total;
  page = this.pacienteService.page;
  limit = this.pacienteService.limit;
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
    this.pacienteService.refresh();
  }

  onCreatePaciente(): void {
    this.router.navigateByUrl('/admin/mascotas/registrar');
  }
}
