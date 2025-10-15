import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { VeterinarioService } from '../../services/veterinario.service';

@Component({
  selector: 'app-veterinario-page',
  imports: [SharedZorroModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './veterinario-page.component.html',
})
export class VeterinarioPageComponent {
  private readonly veterinarioService = inject(VeterinarioService);
  private readonly router = inject(Router);

  veterinarios = this.veterinarioService.veterinarios;
  isLoading = this.veterinarioService.loading;
  search = this.veterinarioService.search;
  total = this.veterinarioService.total;
  page = this.veterinarioService.page;
  limit = this.veterinarioService.limit;
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
    this.veterinarioService.refresh();
  }

  redirectCreateUser(): void {
    this.router.navigateByUrl('/admin/veterinarios/registrar');
  }
}
