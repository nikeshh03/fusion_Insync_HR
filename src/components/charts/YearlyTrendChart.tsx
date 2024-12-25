import React, { useRef, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import type { ChartData } from 'chart.js';
import { defaultOptions } from '../../lib/chartConfig';
import type { AttritionData } from '../../types/attrition';

interface YearlyTrendChartProps {
  data: AttritionData[];
}

export default function YearlyTrendChart({ data }: YearlyTrendChartProps) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const prepareData = (): ChartData<'line'> => {
    const yearlyTotals: { [key: string]: number } = {};
    data.forEach(record => {
      yearlyTotals[record.year] = (yearlyTotals[record.year] || 0) + Number(record.count);
    });

    const years = Object.keys(yearlyTotals).sort();
    const values = years.map(year => yearlyTotals[year]);

    return {
      labels: years,
      datasets: [
        {
          label: 'Yearly Attrition',
          data: values,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          tension: 0.1,
          fill: true,
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
          text: 'Year',
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
        <TrendingUp className="h-5 w-5 text-green-600" />
        Yearly Attrition Trend
      </h3>
      <div className="h-[300px]">
        <Line ref={chartRef} data={prepareData()} options={options} />
      </div>
    </div>
  );
}