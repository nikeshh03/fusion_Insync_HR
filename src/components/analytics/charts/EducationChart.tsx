import React, { useRef, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { pieChartOptions } from '../../../lib/chartConfig';
import { ChartCard } from '../ui/ChartCard';

interface EducationChartProps {
  educationCounts: Record<string, number>;
}

export function EducationChart({ educationCounts }: EducationChartProps) {
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
    labels: Object.keys(educationCounts),
    datasets: [{
      data: Object.values(educationCounts),
      backgroundColor: [
        'rgba(147, 51, 234, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
      ],
      borderWidth: 0,
    }],
  };

  return (
    <ChartCard
      title="Education Distribution"
      icon={GraduationCap}
      iconColor="text-blue-400"
    >
      <Doughnut ref={chartRef} data={chartData} options={pieChartOptions} />
    </ChartCard>
  );
}