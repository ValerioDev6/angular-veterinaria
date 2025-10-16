import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Pago } from '../../interface/pagos.interface';
import { PagosService } from '../../service/pagos.service';

@Component({
  selector: 'app-create-monto',
  imports: [FormsModule, NzFormModule, NzInputNumberModule, NzSelectModule, NzButtonModule, CommonModule],
  templateUrl: './create-monto.component.html',
  styleUrl: './create-monto.component.scss',
})
export class CreateMontoComponent {
  readonly nzModalData: { pago: Pago } = inject(NZ_MODAL_DATA);
  private messageService = inject(NzMessageService);
  private modal = inject(NzModalRef);
  private pagosService = inject(PagosService);

  pago = this.nzModalData.pago;

  formData = {
    monto: 0,
    metodo_pago: 'efectivo',
  };

  // Calcular deuda pendiente
  get deudaPendiente(): number {
    return this.pago.monto - this.pago.adelanto;
  }

  submitForm() {
    // Construir payload según el TIPO
    const payload: any = {
      monto: this.formData.monto,
      metodo_pago: this.formData.metodo_pago,
    };

    // Agregar el ID correcto según el tipo
    if (this.pago.tipo === 'CITA') {
      payload.cita_id = this.pago.servicio_id;
    } else if (this.pago.tipo === 'VACUNA') {
      payload.vacuna_id = this.pago.servicio_id;
    } else if (this.pago.tipo === 'CIRUGÍA') {
      payload.surgiere_id = this.pago.servicio_id;
    }

    this.pagosService.addPayment(payload).subscribe({
      next: (response: any) => {
        if (response.message === 403) {
          // Mostrar error de validación
          this.messageService.info(response.message_text);
        } else {
          // Éxito
          this.modal.close(true);
        }
      },
      error: (error) => {
        // Error del servidor
        console.error('Error al registrar pago:', error);
        this.messageService.error('Error al registrar el pago. Intente nuevamente.');
      },
    });
  }

  cancel() {
    this.modal.close(false);
  }
}
