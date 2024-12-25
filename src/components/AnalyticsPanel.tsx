import React, { useState } from 'react';
import { Brain, Award, Shield } from 'lucide-react';
import { predictAttrition, recommendTraining, checkCompliance } from '../lib/ai/analysis';

type AnalyticsPanelProps = {
  employeeData: any;
};

// Update formatAnalysisText function
function formatAnalysisText(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-gray-900 dark:text-gray-100">$1</span>')
    .replace(
      /(RISK ASSESSMENT|KEY RISK FACTORS|RETENTION RECOMMENDATIONS|TIMELINE|STATUS OVERVIEW|GAPS IDENTIFIED|ACTION ITEMS|FOLLOW-UP|SKILLS TO DEVELOP|TRAINING PLAN|MILESTONES):/g,
      '<h4 class="font-bold text-gray-900 dark:text-gray-100 text-lg mt-4 mb-2">$1:</h4>'
    )
    .replace(
      /^([A-Za-z\s]+):\s/gm,
      '<span class="font-semibold text-gray-800 dark:text-gray-200">$1: </span>'
    );
}

export default function AnalyticsPanel({ employeeData }: AnalyticsPanelProps) {
  const [attritionAnalysis, setAttritionAnalysis] = useState('');
  const [trainingRecommendations, setTrainingRecommendations] = useState('');
  const [complianceReport, setComplianceReport] = useState('');
  const [loading, setLoading] = useState({
    attrition: false,
    training: false,
    compliance: false
  });
  const [error, setError] = useState({
    attrition: '',
    training: '',
    compliance: ''
  });

  const handleAttritionAnalysis = async () => {
    setLoading(prev => ({ ...prev, attrition: true }));
    setError(prev => ({ ...prev, attrition: '' }));
    try {
      const analysis = await predictAttrition(employeeData);
      setAttritionAnalysis(analysis);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze attrition risk';
      setError(prev => ({ ...prev, attrition: message }));
      setAttritionAnalysis('');
    }
    setLoading(prev => ({ ...prev, attrition: false }));
  };

  const handleTrainingRecommendations = async () => {
    setLoading(prev => ({ ...prev, training: true }));
    setError(prev => ({ ...prev, training: '' }));
    try {
      const recommendations = await recommendTraining(employeeData);
      setTrainingRecommendations(recommendations);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate recommendations';
      setError(prev => ({ ...prev, training: message }));
      setTrainingRecommendations('');
    }
    setLoading(prev => ({ ...prev, training: false }));
  };

  const handleComplianceCheck = async () => {
    setLoading(prev => ({ ...prev, compliance: true }));
    setError(prev => ({ ...prev, compliance: '' }));
    try {
      const report = await checkCompliance(employeeData);
      setComplianceReport(report);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to check compliance';
      setError(prev => ({ ...prev, compliance: message }));
      setComplianceReport('');
    }
    setLoading(prev => ({ ...prev, compliance: false }));
  };

  return (
<div className="mt-8 space-y-6">
      {/* Attrition Analysis */}
      <div className="bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-white/10 dark:border-zinc-800/50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Attrition Risk Analysis
              </h3>
            </div>
            <button
              onClick={handleAttritionAnalysis}
              disabled={loading.attrition}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {loading.attrition ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
          
          {error.attrition ? (
            <div className="p-4 bg-red-50 text-red-700 rounded-md">
              {error.attrition}
            </div>
          ) : attritionAnalysis && (
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: formatAnalysisText(attritionAnalysis)
                  .split('\n')
                  .map(line => `<p class=text-zinc-300 dark:text-zinc-100 leading-relaxed">${line}</p>`)
                  .join('')
              }}
            />
          )}
        </div>
      </div>

      {/* Training Recommendations */}
      <div className="bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-white/10 dark:border-zinc-800/50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Development Recommendations
              </h3>
            </div>
            <button
              onClick={handleTrainingRecommendations}
              disabled={loading.training}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading.training ? 'Generating...' : 'Get Recommendations'}
            </button>
          </div>
          
                  {error.training ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            {error.training}
          </div>
        ) : trainingRecommendations && (
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: formatAnalysisText(trainingRecommendations) // Changed from attritionAnalysis
                .split('\n')
                .filter(line => line.trim())
                .map(line => `<p class="text-zinc-300 dark:text-zinc-200 leading-relaxed">${line}</p>`)
                .join('')
            }}
          />
        )}
      </div>
    </div>

      {/* Compliance Check */}
      <div className="bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-white/10 dark:border-zinc-800/50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Compliance Report
              </h3>
            </div>
            <button
              onClick={handleComplianceCheck}
              disabled={loading.compliance}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading.compliance ? 'Checking...' : 'Check Compliance'}
            </button>
          </div>
          
          {error.compliance ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            {error.compliance}
          </div>
        ) : complianceReport && (
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: formatAnalysisText(complianceReport) // Changed from attritionAnalysis
                .split('\n')
                .filter(line => line.trim())
                .map(line => `<p class="text-zinc-300 dark:text-zinc-200 leading-relaxed">${line}</p>`)
                .join('')
            }}
          />
        )}
      </div>
    </div>
    </div>
  );
}