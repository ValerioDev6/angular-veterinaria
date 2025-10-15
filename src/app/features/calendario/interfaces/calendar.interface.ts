export interface ICalendarResponse {
  calendars: Calendar[];
}

export interface Calendar {
  id:            number;
  title:         string;
  start:         Date;
  end:           Date;
  allDay:        boolean;
  url:           string;
  extendedProps: ExtendedProps;
}

export interface ExtendedProps {
  calendar:    string;
  description: string;
  notes:       string;
  day:         string;
  state:       string;
  amount:      string;
  veterinarie: Veterinarie;
  pet:         Pet;
}

export interface Pet {
  id:     number;
  name:   string;
  specie: string;
  breed:  string;
  photo:  string;
  owner:  Owner;
}

export interface Owner {
  id:         number;
  first_name: string;
  last_name:  string;
  phone:      string;
  n_document: string;
}

export interface Veterinarie {
  full_name: string;
  role:      Role;
}

export interface Role {
  name: string;
}
