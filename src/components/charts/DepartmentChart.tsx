import React, { useRef, useEffect } from 'react';
import { BarChart2 } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import type { ChartData } from 'chart.js';
import { defaultOptions } from '../../lib/chartConfig';
import type { AttritionData } from '../../types/attrition';

interface DepartmentChartProps {
  data: AttritionData[];
}

export default function DepartmentChart({ data }: DepartmentChartProps) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const prepareData = (): ChartData<'bar'> => {
    const departmentTotals: { [key: string]: number } = {};
    data.forEach(record => {
      departmentTotals[record.department] = 
        (departmentTotals[record.department] || 0) + Number(record.count);
    });

    const departments = Object.keys(departmentTotals);
    const values = departments.map(dept => departmentTotals[dept]);

    return {
      labels: departments,
      datasets: [
        {
          label: 'Attrition by Department',
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    ...defaultOptions,
    scales: {
      ...defaultOptions.scales,
      x: {
        ...defaultOptions.scales?.x,
        title: {
          display: true,
          text: 'Department',
        },
      },
      y: {
        ...defaultOptions.scales?.y,
        title: {
          display: true,
          text: 'Number of Employees',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BarChart2 className="h-5 w-5 text-purple-600" />
        Attrition by Department
      </h3>
      <div className="h-[300px]">
        <Bar ref={chartRef} data={prepareData()} options={options} />
      </div>
    </div>
  );
}