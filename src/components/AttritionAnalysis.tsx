import React, { useState } from 'react';
import { Upload, FileText, Download, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import { analyzeAttritionData } from '../lib/ai/analysis';
import { validateAttritionData, CSV_TEMPLATE } from '../utils/dataValidation';
import YearlyTrendChart from './charts/YearlyTrendChart';
import DepartmentChart from './charts/DepartmentChart';
import type { AttritionData } from '../types/attrition';

export default function AttritionAnalysis() {
  const [attritionData, setAttritionData] = useState<AttritionData[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setAttritionData([]);
    setAiAnalysis('');

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const validatedData = validateAttritionData(results.data);
          setAttritionData(validatedData);
          
          setLoading(true);
          const analysis = await analyzeAttritionData(validatedData);
          setAiAnalysis(analysis);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Error processing data');
        } finally {
          setLoading(false);
        }
      },
      error: (error) => {
        setError(`Error parsing CSV: ${error.message}`);
      }
    });
  };

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attrition_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  function formatAnalysisText(text: string) {
    return text
      // First handle section headers
      .replace(
        /(TREND ANALYSIS|DEPARTMENTAL INSIGHTS|KEY FINDINGS|RECOMMENDATIONS|PRIORITY ACTIONS):/g,
        '<h3 class="text-xl font-bold text-gray-900 mb-4 mt-6">$1</h3>'
      )
      // Handle bold text with labels (e.g., "Overall Trend:")
      .replace(
        /\*\*([\w\s]+):\*\*/g,
        '<span class="font-bold">$1:</span>'
      )
      // Handle remaining bold text
      .replace(
        /\*\*(.*?)\*\*/g,
        '<span class="font-bold">$1</span>'
      )
      // Format bullet points with labels
      .replace(
        /^[•\-]\s*([\w\s]+):\s*(.*)/gm,
        '• <span class="font-bold">$1:</span> $2'
      )

      // Format remaining bullet points
      .replace(
        /^[•\-]\s*(.+)/gm,
        '• $1'
      )
      // Format remaining numbered items
      .replace(
        /^(\d+)\.\s*(.+)/gm,
        '$1. $2'
      )
      // Add consistent spacing and styling
      .split('\n')
      .filter(line => line.trim())
      .map(line => `<div class="mb-2 text-black-600">${line}</div>`)
      .join('');
  }

  return (
    <div className="space-y-6 p-6">
      {/* File Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Upload Attrition Data
          </h2>
          <div className="flex gap-4">
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </button>
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Upload className="h-4 w-4 mr-2" />
              Upload CSV
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* CSV Format Guide */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h4 className="text-sm font-medium text-blue-800 flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4" />
            Required CSV Format
          </h4>
          <p className="text-sm text-blue-700 mb-2">
            Your CSV file must include the following columns:
          </p>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>year (4-digit number, e.g., 2021)</li>
            <li>month (Full month name, e.g., January)</li>
            <li>department (Department name)</li>
            <li>count (Non-negative number)</li>
          </ul>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-md">
            {error}
          </div>
        )}
      </div>

      {attritionData.length > 0 && (
        <>
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <YearlyTrendChart data={attritionData} />
            <DepartmentChart data={attritionData} />
          </div>

          {/* AI Analysis Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">AI Analysis Insights</h3>
                    {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: formatAnalysisText(aiAnalysis)
            }}
          />
        )}
          </div>
        </>
      )}
    </div>
  );
}