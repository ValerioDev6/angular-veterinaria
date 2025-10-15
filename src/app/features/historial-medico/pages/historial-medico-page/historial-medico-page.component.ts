import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { HistorialMedicoService } from '../../service/historial-medica.service';
@Component({
  selector: 'app-historial-medico-page',
  imports: [SharedZorroModule, ReactiveFormsModule, FormsModule, CommonModule, NzTimelineModule],
  templateUrl: './historial-medico-page.component.html',
  styles: ``,
})
export default class HistorialMedicoPageComponent implements OnInit {
  private readonly messageService = inject(NzMessageService);
  private readonly medicalRecordService = inject(HistorialMedicoService);

  petNameFilter = signal<string>('');
  serviceTypeFilter = signal<string>('TODOS');
  isLoading = signal<boolean>(false);

  medicalRecords = signal<any[]>([]);
  total = signal<number>(0);

  // Datos filtrados
  filteredRecords = computed(() => {
    let records = this.medicalRecords();

    if (this.serviceTypeFilter() !== 'TODOS') {
      records = records.filter((r) => r.event_type === this.serviceTypeFilter());
    }

    return records;
  });

  ngOnInit(): void {
    // Cargar automáticamente al iniciar
    this.loadMedicalHistory();
  }

  onSearch(): void {
    if (!this.petNameFilter().trim()) {
      this.messageService.warning('Ingresa el nombre de la mascota');
      return;
    }

    this.loadMedicalHistory();
  }

  loadMedicalHistory(): void {
    const petName = this.petNameFilter().trim();
    const serviceType = this.serviceTypeFilter();

    if (!petName) return;

    this.isLoading.set(true);

    this.medicalRecordService.getMedicalHistoryByPetName(petName, serviceType).subscribe({
      next: (response) => {
        this.medicalRecords.set(response.medical_records);
        this.total.set(response.total);
        this.isLoading.set(false);

        if (response.total === 0) {
          this.messageService.info('No hay registros para esta mascota');
        }
      },
      error: (error) => {
        console.error('Error:', error);
        this.messageService.error('Error al cargar historial médico');
        this.isLoading.set(false);
      },
    });
  }

  onServiceTypeChange(type: string): void {
    this.serviceTypeFilter.set(type);
  }

  clearFilters(): void {
    this.petNameFilter.set('');
    this.serviceTypeFilter.set('TODOS');
    this.medicalRecords.set([]);
    this.total.set(0);
  }

  getServiceIcon(type: string): string {
    switch (type) {
      case 'CITA':
        return 'calendar';
      case 'VACUNA':
        return 'medicine-box';
      case 'CIRUGÍA':
        return 'scissor';
      default:
        return 'file-text';
    }
  }

  getServiceColor(type: string): string {
    switch (type) {
      case 'CITA':
        return 'blue';
      case 'VACUNA':
        return 'green';
      case 'CIRUGÍA':
        return 'red';
      default:
        return 'default';
    }
  }

  getPaymentStatusColor(status: string): string {
    switch (status) {
      case 'pagado':
        return 'success';
      case 'pendiente':
        return 'warning';
      case 'cancelado':
        return 'error';
      default:
        return 'default';
    }
  }
  calculateAge(birthDate: Date): string {
    const today = new Date();
    const birth = new Date(birthDate);
    const years = today.getFullYear() - birth.getFullYear();
    return `${years} año${years !== 1 ? 's' : ''}`;
  }

  getServiceColorBg(type: string): string {
    const colors: { [key: string]: string } = {
      CITA: '#EEF2FF',
      VACUNA: '#F0FDF4',
      CIRUGÍA: '#FEF2F2',
    };
    return colors[type] || '#F3F4F6';
  }

  formatDateDisplay(date: any): string {
    return new Date(date).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
