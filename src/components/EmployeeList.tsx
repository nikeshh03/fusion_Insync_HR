import React from 'react';
import { Pencil, Trash2, Eye, ChevronRight } from 'lucide-react';
import type { Employee } from '../types/employee';
import { IconButton } from './ui/IconButton';

type EmployeeListProps = {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onSelect: (employee: Employee) => void;
};

export default function EmployeeList({ employees, onEdit, onDelete, onSelect }: EmployeeListProps) {
  return (
    <div className="card">
      <div className="px-6 py-4 border-b border-zinc-800">
        <h2 className="text-xl font-semibold text-white">Employee List</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Employee Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-white">{employee.full_name}</div>
                    <div className="text-sm text-zinc-400">{employee.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 border border-purple-800">
                    {employee.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-300">
                  {employee.position}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 inline-flex text-xs font-medium rounded-full ${
                    employee.performance_score >= 4 ? 'bg-green-900/50 text-green-300 border border-green-800' :
                    employee.performance_score >= 3 ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-800' :
                    'bg-red-900/50 text-red-300 border border-red-800'
                  }`}>
                    {employee.performance_score.toFixed(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <IconButton
                      icon={Eye}
                      onClick={() => onSelect(employee)}
                      label="View Analytics"
                    />
                    <IconButton
                      icon={Pencil}
                      onClick={() => onEdit(employee)}
                      label="Edit"
                    />
                    <IconButton
                      icon={Trash2}
                      onClick={() => onDelete(employee.id)}
                      label="Delete"
                      className="text-red-400 hover:text-red-300"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}