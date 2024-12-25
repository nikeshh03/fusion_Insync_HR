import { AttritionData } from '../types/attrition';

export function validateAttritionData(data: any[]): AttritionData[] {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No data found in CSV file');
  }

  // Check if the first row has the required headers
  const requiredFields = ['year', 'month', 'department', 'count'];
  const headers = Object.keys(data[0]);
  const missingFields = requiredFields.filter(field => !headers.includes(field));

  if (missingFields.length > 0) {
    throw new Error(`Missing required columns: ${missingFields.join(', ')}`);
  }

  return data.map((record, index) => {
    const rowNumber = index + 1;
    const errors: string[] = [];

    // Validate year
    if (!record.year) {
      errors.push('Year is required');
    } else if (!/^\d{4}$/.test(String(record.year))) {
      errors.push('Year must be a 4-digit number');
    }

    // Validate month
    const validMonths = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    if (!record.month) {
      errors.push('Month is required');
    } else if (!validMonths.includes(String(record.month))) {
      errors.push(`Month must be one of: ${validMonths.join(', ')}`);
    }

    // Validate department
    if (!record.department) {
      errors.push('Department is required');
    }

    // Validate count
    const count = Number(record.count);
    if (record.count === undefined || record.count === '') {
      errors.push('Count is required');
    } else if (isNaN(count) || count < 0) {
      errors.push('Count must be a non-negative number');
    }

    if (errors.length > 0) {
      throw new Error(`Row ${rowNumber}: ${errors.join(', ')}`);
    }

    return {
      year: String(record.year),
      month: String(record.month),
      department: String(record.department),
      count,
    };
  });
}

export const CSV_TEMPLATE = `year,month,department,count
2021,January,Engineering,5
2021,February,Engineering,3
2021,March,Sales,4
2021,April,Marketing,2`;