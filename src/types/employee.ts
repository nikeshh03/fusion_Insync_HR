export interface Employee {
  id: string;
  full_name: string;
  email: string;
  department: string;
  position: string;
  joining_date: string;
  salary: number;
  performance_score: number;
  education_level: string;
  years_of_experience: number;
  skills: string[];
  previous_positions: string[];
  training_completed: string[];
  certifications: string[];
  last_promotion_date: string | null;
  attendance_rate: number;
  projects_completed: number;
  overtime_hours: number;
  satisfaction_score: number;
  last_review_date: string;
  manager_feedback: string;
  career_goals: string;
}