import { supabase } from '../lib/supabase';
import type { Employee } from '../types/employee';

// Helper function to format array fields
function formatArrayFields(data: any) {
  const arrayFields = ['skills', 'previous_positions', 'training_completed', 'certifications'];
  const formatted = { ...data };
  
  arrayFields.forEach(field => {
    if (typeof formatted[field] === 'string') {
      formatted[field] = formatted[field]
        ? formatted[field].split(',').map((item: string) => item.trim())
        : [];
    }
  });
  
  return formatted;
}

export async function fetchEmployees() {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
  return data;
}

export async function createEmployee(employee: Omit<Employee, 'id'>) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const formattedEmployee = {
    ...formatArrayFields(employee),
    user_id: userData.user.id
  };
  
  const { data, error } = await supabase
    .from('employees')
    .insert([formattedEmployee])
    .select()
    .single();

  if (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
  return data;
}

export async function updateEmployee(id: string, updates: Partial<Employee>) {
  const formattedUpdates = formatArrayFields(updates);
  
  const { data, error } = await supabase
    .from('employees')
    .update(formattedUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
  return data;
}

export async function deleteEmployee(id: string) {
  const { error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
}