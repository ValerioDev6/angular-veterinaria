import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { Calendar } from '../../interfaces/calendar.interface';
import { CalendarioService } from '../../services/calendario.service';

@Component({
  selector: 'app-calendario-page',
  imports: [SharedZorroModule, DatePipe, ReactiveFormsModule],
  templateUrl: './calendario-page.component.html',
  styles: [
    `
      .events {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .events .ant-badge-status {
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-overflow: ellipsis;
        font-size: 12px;
      }
    `,
  ],
  providers: [NzMessageService],
})
export class CalendarioPageComponent implements OnInit {
  private readonly messageService = inject(NzMessageService);
  private readonly calendarService = inject(CalendarioService);
  citaForm!: FormGroup;
  private readonly fb = inject(FormBuilder);
  calendar = signal<Calendar[] | null>(null);
  visible = signal<boolean>(false);
  selectedEvent = signal<Calendar | null>(null);
  loading = signal<boolean>(false);
  ngOnInit(): void {
    this.initForm();
    this.getCalendarData();
  }

  getCalendarData() {
    this.calendarService.getCalendar().subscribe({
      next: (calendar) => {
        this.calendar.set(calendar.calendars);
      },
    });
  }

  // ✅ Obtener eventos por fecha
  getEventsForDate(date: Date): Calendar[] {
    if (!this.calendar()) return [];

    // ✅ Usar toISOString y quedarnos solo con la fecha
    const dateStr = date.toISOString().split('T')[0]; // "2024-10-09"

    return this.calendar()!.filter((event) => {
      const eventDate = new Date(event.start).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
  }

  initForm() {
    this.citaForm = this.fb.group({
      state: ['pendiente', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0)]],
      reason: ['', [Validators.required]],
      notes: [''],
    });
  }
  // ✅ Badge status según el estado del pago
  getBadgeStatus(state: string): 'success' | 'processing' | 'default' | 'error' | 'warning' {
    switch (state) {
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

  openEvent(event: Calendar) {
    this.selectedEvent.set(event);

    // ✅ Cargar datos del evento en el formulario
    this.citaForm.patchValue({
      state: event.extendedProps.state,
      amount: Number.parseFloat(event.extendedProps.amount),
      reason: event.extendedProps.description,
      notes: event.extendedProps.notes || '',
    });

    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
    this.selectedEvent.set(null);
    this.citaForm.reset();
  }

  onSubmit() {
    if (this.citaForm.invalid) {
      Object.values(this.citaForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    this.loading.set(true);
    const citaId = this.selectedEvent()!.id;
    const formData = this.citaForm.value;

    // ✅ Aquí haces tu llamada al servicio para actualizar
    this.calendarService.updateCita(citaId, formData).subscribe({
      next: () => {
        this.messageService.success('Cita actualizada correctamente');
        this.loading.set(false);
        this.close();
        this.getCalendarData(); // Recargar datos
      },
      error: (err: any) => {
        this.messageService.error(`Error al actualizar la cita: ${err}`);
        this.loading.set(false);
      },
    });
  }
}
