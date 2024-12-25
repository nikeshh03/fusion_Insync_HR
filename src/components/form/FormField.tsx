import React from 'react';
import { forwardRef } from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  as?: 'input' | 'textarea';
  icon?: React.ReactNode;
}

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, error, helperText, as = 'input', icon, className = '', ...props }, ref) => {
    const Component = as;
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          {label}
        </label>
        <div className="relative rounded-md shadow-sm">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <Component
            ref={ref as any}
            {...props}
            className={`
              block w-full rounded-lg
              ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3
              bg-zinc-900 border border-zinc-700 
              text-white placeholder:text-zinc-500
              transition-all duration-200
              focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500
              hover:border-zinc-600
              ${as === 'textarea' ? 'min-h-[120px] resize-y' : 'h-11'}
              ${error ? 'border-red-800 focus:border-red-500 focus:ring-red-500/20' : ''}
              ${className}
            `}
          />
        </div>
        {helperText && (
          <p className="mt-1.5 text-sm text-zinc-400">{helperText}</p>
        )}
        {error && (
          <p className="mt-1.5 text-sm text-red-400 flex items-center">
            <span className="mr-1">⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';