import React from 'react';
import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: Option[];
  icon?: React.ReactNode;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, icon, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-300 mb-1">
          {label}
        </label>
        <div className="relative rounded-md shadow-sm">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <select
            ref={ref}
            {...props}
            className={`
              block w-full h-11 rounded-lg 
              ${icon ? 'pl-10' : 'pl-4'} pr-10
              bg-white dark:bg-zinc-900 
              border-zinc-200 dark:border-zinc-800 
              text-zinc-900 dark:text-white
              transition-all duration-200
              focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500
              hover:border-zinc-300 dark:hover:border-zinc-700
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}
              ${className}
              appearance-none
            `}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-zinc-500" />
          </div>
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center">
            <span className="mr-1">⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';