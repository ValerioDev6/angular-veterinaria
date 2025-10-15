export interface ICitaResponse {
  id:                     number;
  day:                    string;
  date_appointment:       Date ;
  reason:                 string;
  reprograming:           boolean;
  state_payment:          string;
  veterinarian_id:        string;
  pet_id:                 number;
  pet:                    Pet;
  veterinarian:           Veterinarian;
  pago:                   Pago;
  selected_segment_times: SelectedSegmentTime[];
}

export interface Pago {
  id:          number;
  monto:       string;
  adelanto:    string;
  metodo_pago: string;
  estado:      string;
}

export interface Pet {
  id:      number;
  name:    string;
  species: string;
  breed:   string;
}

export interface SelectedSegmentTime {
  id:              number;
  segment_time_id: string;
  schedule_hour:   ScheduleHour;
}

export interface ScheduleHour {
  hour:              string;
  hour_start:        string;
  hour_end:          string;
  hour_start_format: string;
  hour_end_format:   string;
}

export interface Veterinarian {
  id:       string;
  username: string;
  email:    string;
}
