
import React, { useState, useMemo } from 'react';
import { AMSTAR_QUESTIONS } from './constants';
import { AssessmentState, RatingValue } from './types';
import { QuestionItem } from './components/QuestionItem';
import { ClipboardCheck, FileText, Download, BarChart3, AlertCircle, Info, RefreshCw } from 'lucide-react';

export default function App() {
  const [assessment, setAssessment] = useState<AssessmentState>({});
  const [paperInfo, setPaperInfo] = useState({ title: '', authors: '', journal: '' });

  const progress = useMemo(() => {
    const answeredCount = Object.keys(assessment).filter(id => assessment[Number(id)].rating).length;
    return Math.round((answeredCount / AMSTAR_QUESTIONS.length) * 100);
  }, [assessment]);

  const summary = useMemo(() => {
    let criticalFlaws = 0;
    let nonCriticalFlaws = 0;

    AMSTAR_QUESTIONS.forEach((q) => {
      const rating = assessment[q.id]?.rating;
      if (rating === 'No' || rating === 'Partial Yes') {
        if (q.isCritical) criticalFlaws++;
        else nonCriticalFlaws++;
      }
    });

    let confidence = "High";
    if (criticalFlaws === 1) confidence = "Low";
    else if (criticalFlaws > 1) confidence = "Critically Low";
    else if (nonCriticalFlaws > 1) confidence = "Moderate";

    return { confidence, criticalFlaws, nonCriticalFlaws };
  }, [assessment]);

  const handleRate = (qId: number, rating: RatingValue) => {
    setAssessment(prev => ({
      ...prev,
      [qId]: { ...(prev[qId] || { notes: '', checkedCriteria: [] }), rating }
    }));
  };

  const handleNoteChange = (qId: number, notes: string) => {
    setAssessment(prev => ({
      ...prev,
      [qId]: { ...(prev[qId] || { rating: null, checkedCriteria: [] }), notes }
    }));
  };

  const handleCriteriaToggle = (qId: number, criterionId: string) => {
    setAssessment(prev => {
      const current = prev[qId] || { rating: null, notes: '', checkedCriteria: [] };
      const checked = current.checkedCriteria.includes(criterionId)
        ? current.checkedCriteria.filter(id => id !== criterionId)
        : [...current.checkedCriteria, criterionId];
      return { ...prev, [qId]: { ...current, checkedCriteria: checked } };
    });
  };

  const exportReport = () => {
    const report = {
      paper: paperInfo,
      assessment,
      summary
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amstar-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <ClipboardCheck className="w-10 h-10 text-indigo-600" />
            AMSTAR-2 Quality Tool
          </h1>
          <p className="text-slate-500 mt-1 max-w-2xl">
            A critical appraisal tool for systematic reviews that include randomised or non-randomised studies of healthcare interventions.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => { if(confirm('Clear all data?')) setAssessment({}); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
          <button 
            onClick={exportReport}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
          >
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Paper Identification Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold">
              <FileText className="w-5 h-5 text-indigo-500" /> Paper Identification
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input 
                  type="text" 
                  placeholder="Systematic Review Title"
                  className="w-full p-2 border-b border-slate-200 focus:border-indigo-500 outline-none text-lg font-medium"
                  value={paperInfo.title}
                  onChange={(e) => setPaperInfo({...paperInfo, title: e.target.value})}
                />
              </div>
              <input 
                type="text" 
                placeholder="Authors"
                className="p-2 border-b border-slate-200 focus:border-indigo-500 outline-none"
                value={paperInfo.authors}
                onChange={(e) => setPaperInfo({...paperInfo, authors: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Journal / Year"
                className="p-2 border-b border-slate-200 focus:border-indigo-500 outline-none"
                value={paperInfo.journal}
                onChange={(e) => setPaperInfo({...paperInfo, journal: e.target.value})}
              />
            </div>
          </div>

          {/* Checklist Area */}
          <div className="space-y-4">
            {AMSTAR_QUESTIONS.map((q) => (
              <QuestionItem
                key={q.id}
                question={q}
                rating={assessment[q.id]?.rating || null}
                notes={assessment[q.id]?.notes || ''}
                checkedCriteria={assessment[q.id]?.checkedCriteria || []}
                onRate={(r) => handleRate(q.id, r)}
                onNoteChange={(n) => handleNoteChange(q.id, n)}
                onCriteriaToggle={(cId) => handleCriteriaToggle(q.id, cId)}
              />
            ))}
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-4 sticky top-8 space-y-6">
          {/* Progress Widget */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800">Overall Progress</h3>
              <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Overall Confidence</div>
                    <div className={`text-lg font-bold ${
                      summary.confidence === 'High' ? 'text-emerald-600' :
                      summary.confidence === 'Moderate' ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {summary.confidence}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-100">
                  <div className="text-xs text-rose-400 font-bold uppercase tracking-wider">Critical Flaws</div>
                  <div className="text-2xl font-bold text-rose-600">{summary.criticalFlaws}</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Non-Critical</div>
                  <div className="text-2xl font-bold text-amber-600">{summary.nonCriticalFlaws}</div>
                </div>
              </div>
            </div>

            {/* Evaluation Guide */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <Info className="w-4 h-4 text-slate-400" /> Rating Guide
              </div>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-slate-500"><strong>High:</strong> Zero or one non-critical flaw.</p>
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-slate-500"><strong>Moderate:</strong> More than one non-critical flaw.</p>
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-slate-500"><strong>Low:</strong> One critical flaw with or without non-critical flaws.</p>
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-slate-500"><strong>Critically Low:</strong> More than one critical flaw.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-indigo-200 mt-0.5" />
              <p className="text-sm text-white/90 leading-relaxed">
                Use the <span className="font-bold">Gemini-powered Assistant</span> on the left to analyze complex text snippets from your paper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
