import React, { useRef, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { pieChartOptions } from '../../../lib/chartConfig';
import { ChartCard } from '../ui/ChartCard';

interface DepartmentChartProps {
  departmentCounts: Record<string, number>;
}

export function DepartmentChart({ departmentCounts }: DepartmentChartProps) {
  const chartRef = useRef<any>(null);

  // Cleanup chart instance on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const chartData = {
    labels: Object.keys(departmentCounts),
    datasets: [{
      data: Object.values(departmentCounts),
      backgroundColor: [
        'rgba(147, 51, 234, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)',
      ],
      borderWidth: 0,
    }],
  };

  return (
    <ChartCard
      title="Department Distribution"
      icon={Building2}
      iconColor="text-purple-400"
    >
      <Doughnut ref={chartRef} data={chartData} options={pieChartOptions} />
    </ChartCard>
  );
}