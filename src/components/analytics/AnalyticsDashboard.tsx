import React, { useMemo } from 'react';
import { Users, TrendingUp, Award } from 'lucide-react';
import { DepartmentChart } from './charts/DepartmentChart';
import { EducationChart } from './charts/EducationChart';
import type { Employee } from '../../types/employee';

interface AnalyticsDashboardProps {
  employees: Employee[];
}

export default function AnalyticsDashboard({ employees }: AnalyticsDashboardProps) {
  const stats = useMemo(() => {
    const departmentCounts: Record<string, number> = {};
    const educationCounts: Record<string, number> = {};
    const experienceData: number[] = [];
    const performanceData: number[] = [];
    
    employees.forEach(emp => {
      departmentCounts[emp.department] = (departmentCounts[emp.department] || 0) + 1;
      
      if (emp.education_level) {
        educationCounts[emp.education_level] = (educationCounts[emp.education_level] || 0) + 1;
      }
      
      experienceData.push(emp.years_of_experience || 0);
      performanceData.push(emp.performance_score);
    });

    return {
      departmentCounts,
      educationCounts,
      experienceData,
      performanceData,
      averagePerformance: performanceData.length 
        ? (performanceData.reduce((a, b) => a + b, 0) / performanceData.length).toFixed(2)
        : '0.00',
      averageExperience: experienceData.length
        ? (experienceData.reduce((a, b) => a + b, 0) / experienceData.length).toFixed(1)
        : '0.0'
    };
  }, [employees]);

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Total Employees</p>
              <p className="text-2xl font-semibold text-white">{employees.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Average Performance</p>
              <p className="text-2xl font-semibold text-white">{stats.averagePerformance}</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Award className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Average Experience</p>
              <p className="text-2xl font-semibold text-white">
                {stats.averageExperience} years
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentChart departmentCounts={stats.departmentCounts} />
        <EducationChart educationCounts={stats.educationCounts} />
      </div>
    </div>
  );
}