
export interface ISheduleHours {
  shedule_hours_groups: SheduleHoursGroup[];
}

export interface SheduleHoursGroup {
  id_group:          string;
  hour:              string;
  // hour_format:       string;
  hour_start:        string;
  hour_end:          string;
  hour_start_format: string;
  hour_end_format:   string;
}
