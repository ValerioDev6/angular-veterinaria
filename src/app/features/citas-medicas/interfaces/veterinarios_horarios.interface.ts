export interface IVeterinarianShedule {
  veterinarie_time_availability: VeterinarieTimeAvailability[];
}

export interface VeterinarieTimeAvailability {
  id:                  string;
  full_name:           string;
  segment_time_groups: SegmentTimeGroup[];
}

export interface SegmentTimeGroup {
  hour:               string;
  hour_format:        string;
  segment_times:      SegmentTime[];
  count_availability: number;
}

export interface SegmentTime {
  id:                           number;
  veterinarie_schedule_day_id:  string;
  veterinarie_schedule_hour_id: string;
  hour:                         string;
  schedule_hour:                ScheduleHour;
  check:                        boolean;
}

export interface ScheduleHour {
  hour_start:        string;
  hour_end:          string;
  hour:              string;
  hour_start_format: string;
  hour_end_format:   string;
}
