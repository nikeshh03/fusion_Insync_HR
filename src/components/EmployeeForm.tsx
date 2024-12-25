import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  User, UserPlus, Briefcase, Award, 
  MessageSquare, GraduationCap, Star,
  Calendar, DollarSign, Target
} from 'lucide-react';
import type { Employee } from '../types/employee';
import { createEmployee, updateEmployee } from '../services/employeeService';
import { FormField } from './form/FormField';
import { FormSelect } from './form/FormSelect';

type EmployeeFormProps = {
  employee?: Employee;
  onSuccess: () => void;
  onCancel?: () => void;
};

export default function EmployeeForm({ employee, onSuccess, onCancel }: EmployeeFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Employee>>({
    defaultValues: employee || {
      joining_date: new Date().toISOString().split('T')[0],
      performance_score: 3,
      salary: 50000,
      attendance_rate: 100,
      satisfaction_score: 5
    }
  });

  const onSubmit = async (data: Partial<Employee>) => {
    try {
      setLoading(true);
      if (employee?.id) {
        await updateEmployee(employee.id, data);
      } else {
        await createEmployee(data as Omit<Employee, 'id'>);
      }
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Error saving employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <div className="px-6 py-4 border-b border-zinc-800/50">
        <h2 className="flex items-center text-xl font-semibold text-white">
          <UserPlus className="w-6 h-6 mr-2 text-purple-400" />
          {employee ? 'Edit Employee' : 'Add New Employee'}
        </h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Basic Information */}
        <section className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800/50">
          <h3 className="flex items-center text-lg font-medium text-white mb-6">
            <User className="w-5 h-5 mr-2 text-purple-400" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Full Name"
              placeholder="John Doe"
              error={errors.full_name?.message}
              className="input-dark"
              {...register('full_name', { required: 'Full name is required' })}
            />
            <FormField
              label="Email"
              type="email"
              placeholder="john@example.com"
              error={errors.email?.message}
              className="input-dark"
              {...register('email', { required: 'Email is required' })}
            />
          </div>
        </section>

        {/* Employment Details */}
        <section className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800/50">
          <h3 className="flex items-center text-lg font-medium text-white mb-6">
            <Briefcase className="w-5 h-5 mr-2 text-green-400" />
            Employment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Department"
              error={errors.department?.message}
              className="input-dark"
              {...register('department', { required: 'Department is required' })}
              options={[
                { value: '', label: 'Select Department' },
                { value: 'Engineering', label: 'Engineering' },
                { value: 'Sales', label: 'Sales' },
                { value: 'Marketing', label: 'Marketing' },
                { value: 'HR', label: 'HR' },
                { value: 'Finance', label: 'Finance' }
              ]}
            />
            <FormField
              label="Position"
              placeholder="Senior Developer"
              error={errors.position?.message}
              className="input-dark"
              {...register('position', { required: 'Position is required' })}
            />
            <FormField
              label="Joining Date"
              type="date"
              error={errors.joining_date?.message}
              className="input-dark"
              {...register('joining_date', { required: 'Joining date is required' })}
            />
            <FormField
              label="Salary"
              type="number"
              error={errors.salary?.message}
              className="input-dark"
              {...register('salary', { required: 'Salary is required' })}
            />
          </div>
        </section>

        {/* Education & Experience */}
        <section className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800/50">
          <h3 className="flex items-center text-lg font-medium text-white mb-6">
            <GraduationCap className="w-5 h-5 mr-2 text-blue-400" />
            Education & Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Education Level"
              error={errors.education_level?.message}
              className="input-dark"
              {...register('education_level')}
              options={[
                { value: '', label: 'Select Education Level' },
                { value: 'High School', label: 'High School' },
                { value: "Bachelor's", label: "Bachelor's Degree" },
                { value: "Master's", label: "Master's Degree" },
                { value: 'PhD', label: 'PhD' }
              ]}
            />
            <FormField
              label="Years of Experience"
              type="number"
              error={errors.years_of_experience?.message}
              className="input-dark"
              {...register('years_of_experience')}
            />
            <FormField
              label="Skills (comma-separated)"
              placeholder="JavaScript, React, Node.js"
              error={errors.skills?.message}
              className="input-dark"
              {...register('skills')}
            />
            <FormField
              label="Previous Positions (comma-separated)"
              placeholder="Junior Developer, Developer"
              error={errors.previous_positions?.message}
              className="input-dark"
              {...register('previous_positions')}
            />
          </div>
            <FormField
              label="Certifications (comma-separated)"
              placeholder="AWS Cloud Practitioner, CISSP, PMP"
              error={errors.certifications?.message}
              className="input-dark"
              {...register('certifications')}
          />
        </section>

        {/* Performance & Development */}
        <section className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800/50">
          <h3 className="flex items-center text-lg font-medium text-white mb-6">
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            Performance & Development
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Performance Score (0-5)"
              type="number"
              step="0.1"
              min="0"
              max="5"
              error={errors.performance_score?.message}
              className="input-dark"
              {...register('performance_score')}
            />
            <FormField
              label="Attendance Rate (%)"
              type="number"
              min="0"
              max="100"
              error={errors.attendance_rate?.message}
              className="input-dark"
              {...register('attendance_rate')}
            />
            <FormField
              label="Projects Completed"
              type="number"
              error={errors.projects_completed?.message}
              className="input-dark"
              {...register('projects_completed')}
            />
            <FormField
              label="Overtime Hours"
              type="number"
              error={errors.overtime_hours?.message}
              className="input-dark"
              {...register('overtime_hours')}
            />
          </div>
        </section>

        {/* Career Development */}
        <section className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800/50">
          <h3 className="flex items-center text-lg font-medium text-white mb-6">
            <Target className="w-5 h-5 mr-2 text-red-400" />
            Career Development
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <FormField
              label="Career Goals"
              as="textarea"
              placeholder="Career objectives and aspirations..."
              error={errors.career_goals?.message}
              className="input-dark"
              {...register('career_goals')}
            />
            <FormField
              label="Manager Feedback"
              as="textarea"
              placeholder="Recent feedback from manager..."
              error={errors.manager_feedback?.message}
              className="input-dark"
              {...register('manager_feedback')}
            />
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 border border-zinc-800 text-zinc-300 font-medium rounded-lg 
              hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Saving...' : employee ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </div>
    </form>
  );
}