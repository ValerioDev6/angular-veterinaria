import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedZorroModule } from '../../../../shared/nz-modules/shared-zorro.module';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-create-paciente',
  imports: [SharedZorroModule, FormsModule, CommonModule],
  templateUrl: './create-paciente.component.html',
  styles: ``,
  providers: [NzMessageService],
})
export default class CreatePacienteComponent {
  private readonly pacienteService = inject(PacienteService);
  private readonly messageService = inject(NzMessageService);
  file_imagen: any = null;
  imagen_previsualiza: string = 'https://via.placeholder.com/200';

  first_name = '';
  last_name = '';
  email = '';
  phone = '';
  address = '';
  city = '';
  type_documento = '';
  n_documento = '';
  // Patient data
  name = '';
  species = '';
  breed = '';
  birth_date = new Date();
  gender = '';
  color = '';
  weight = 0.0;
  medical_notes = '';

  processFile(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.indexOf('image') >= 0) {
      this.file_imagen = file;
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imagen_previsualiza = e.target.result);
      reader.readAsDataURL(file);
    } else {
      this.messageService.error('El archivo no es una imagen');
    }
  }

  onSave(): void {
    if (!this.validateForm()) {
      return;
    }

    const formDataToSend = new FormData();

    // Owner information
    formDataToSend.append('first_name', this.first_name.trim());
    formDataToSend.append('last_name', this.last_name.trim());
    formDataToSend.append('email', this.email.trim());
    formDataToSend.append('phone', this.phone.trim());
    formDataToSend.append('address', this.address.trim());
    formDataToSend.append('city', this.city.trim());
    formDataToSend.append('type_documento', this.type_documento.trim());
    formDataToSend.append('n_documento', this.n_documento.trim());

    // Patient information
    formDataToSend.append('name', this.name.trim());
    formDataToSend.append('species', this.species.trim());
    formDataToSend.append('breed', this.breed.trim());
    formDataToSend.append('birth_date', this.birth_date.toISOString());
    formDataToSend.append('gender', this.gender.trim());
    formDataToSend.append('color', this.color.trim());
    formDataToSend.append('weight', this.weight.toString());
    formDataToSend.append('medical_notes', this.medical_notes.trim());

    // Photo upload
    if (this.file_imagen) {
      formDataToSend.append('photo', this.file_imagen);
    }

    this.pacienteService.addPaciente(formDataToSend).subscribe({
      next: (resp: any) => {
        if (resp.message == 403) {
          this.messageService.error('El paciente con ese documento ya existe');
          return;
        }
        this.messageService.success('Paciente creado exitosamente');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error:', error);
        this.messageService.error('Error al crear el paciente');
      },
    });
  }

  private validateForm(): boolean {
    // Validación del propietario
    if (!this.first_name?.trim()) {
      this.messageService.error('El nombre del propietario es obligatorio');
      return false;
    }
    if (!this.last_name?.trim()) {
      this.messageService.error('El apellido del propietario es obligatorio');
      return false;
    }
    if (!this.email?.trim()) {
      this.messageService.error('El correo electrónico es obligatorio');
      return false;
    }
    if (!this.phone?.trim()) {
      this.messageService.error('El teléfono es obligatorio');
      return false;
    }
    if (!this.type_documento) {
      this.messageService.error('El tipo de documento es obligatorio');
      return false;
    }
    if (!this.n_documento?.trim()) {
      this.messageService.error('El número de documento es obligatorio');
      return false;
    }

    // Validación del paciente
    if (!this.name?.trim()) {
      this.messageService.error('El nombre del paciente es obligatorio');
      return false;
    }
    if (!this.species?.trim()) {
      this.messageService.error('La especie es obligatoria');
      return false;
    }
    if (!this.breed?.trim()) {
      this.messageService.error('La raza es obligatoria');
      return false;
    }
    if (!this.gender) {
      this.messageService.error('El género es obligatorio');
      return false;
    }
    if (this.weight <= 0) {
      this.messageService.error('El peso debe ser mayor que cero');
      return false;
    }

    return true;
  }

  public resetForm(): void {
      this.first_name= '';
      this.last_name= '';
      this.email= '';
      this.phone= '';
      this.address= '';
      this.city= '';
      this.type_documento= '';
      this.n_documento= '';
      this.name= '';
      this.species= '';
      this.breed= '';
      this.birth_date = new  Date();
      this.gender= '';
      this.color= '';
      this.weight= 0;
      this.medical_notes= '';

    this.file_imagen = null;
    this.imagen_previsualiza = 'https://via.placeholder.com/200';
  }
}
