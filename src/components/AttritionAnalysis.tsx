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
      .split('\n')
      .map(line => {
        // Process bold text patterns
        const processedLine = line.replace(
          /\*\*([^*]+)\*\*/g, 
          '<span class="font-bold text-zinc-100">$1</span>'
        );
        
        if (line.trim() === '') return '<br/>';
        return `<div class="text-zinc-300">${processedLine}</div>`;
      })
      .join('');
  }
  // Component usage remains the same
  <div 
    className="prose prose-invert max-w-none"
    dangerouslySetInnerHTML={{
      __html: formatAnalysisText(aiAnalysis)
    }}
  />

return (
    <div className="space-y-6 p-6">
      {/* File Upload Section */}
      <div className="bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm rounded-lg shadow-md p-6 border border-white/10 dark:border-zinc-800/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-500" />
            Upload Attrition Data
          </h2>
          <div className="flex gap-4">
            <button
              onClick={downloadTemplate}  
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-zinc-500/50 to-zinc-600/50 dark:from-zinc-700/50 dark:to-zinc-800/50 backdrop-blur-sm border border-white/10 dark:border-zinc-800/50 rounded-md hover:from-zinc-600/50 hover:to-zinc-700/50 dark:hover:from-zinc-600/50 dark:hover:to-zinc-700/50 transition-all shadow-lg hover:shadow-xl"
            >
              <Download className="h-4 w-4 mr-2 text-blue-400" />
              Download Template
            </button>
            <label className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600/80 to-blue-700/80 backdrop-blur-sm border border-blue-500/20 rounded-md hover:from-blue-500/80 hover:to-blue-600/80 transition-all shadow-lg hover:shadow-xl">
              <Upload className="h-4 w-4 mr-2" />
              Upload CSV
              <input
                type="file"
                className="hidden"
                accept=".csv"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>

        {/* CSV Format Guide */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-md">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4" />
            Required CSV Format
          </h4>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
            Your CSV file must include the following columns:
          </p>
          <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
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
        <div className="bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm rounded-lg shadow-md p-6 border border-white/10 dark:border-zinc-800/50">
          <YearlyTrendChart data={attritionData} />
        </div>
        <div className="bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm rounded-lg shadow-md p-6 border border-white/10 dark:border-zinc-800/50">
          <DepartmentChart data={attritionData} />
        </div>
      </div>

    {/* AI Analysis Section */}
    <div className="bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm rounded-lg shadow-md p-6 border border-white/10 dark:border-zinc-800/50">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        AI Analysis Insights
      </h3>
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div 
          className="prose prose-zinc dark:prose-invert max-w-none"
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
