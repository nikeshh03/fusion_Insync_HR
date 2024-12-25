export interface AttritionData {
  year: string;
  month: string;
  department: string;
  count: number;
}

export interface DepartmentData {
  [key: string]: number;
}