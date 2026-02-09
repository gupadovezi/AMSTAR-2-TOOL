
import React, { useState } from 'react';
import { analyzeTextForAMSTAR } from '../services/geminiService';
import { Sparkles, Loader2, MessageSquare, AlertCircle } from 'lucide-react';

interface AIAssistantProps {
  questionText: string;
  onApplySuggestion: (suggestion: string, notes: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ questionText, onApplySuggestion }) => {
  const [snippet, setSnippet] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!snippet.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeTextForAMSTAR(questionText, snippet);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mt-4">
      <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-3">
        <Sparkles className="w-5 h-5" />
        AI Methodology Assistant
      </div>
      
      <p className="text-sm text-indigo-600 mb-3">
        Paste relevant text (e.g., from Methodology, Results, or Discussion) to help evaluate this item.
      </p>

      <textarea
        className="w-full h-32 p-3 text-sm border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
        placeholder="Paste review snippet here..."
        value={snippet}
        onChange={(e) => setSnippet(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading || !snippet}
        className="w-full mt-3 bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
        Analyze with Gemini
      </button>

      {result && (
        <div className="mt-4 p-4 bg-white border border-indigo-100 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
              result.suggestion === 'Yes' ? 'bg-emerald-100 text-emerald-700' :
              result.suggestion === 'Partial Yes' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
            }`}>
              Suggested: {result.suggestion}
            </span>
          </div>
          <p className="text-sm text-slate-700 mb-3">{result.justification}</p>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase">Evidence:</span>
            {result.evidence.map((quote: string, i: number) => (
              <p key={i} className="text-xs italic text-slate-600 border-l-2 border-indigo-300 pl-2">
                "{quote}"
              </p>
            ))}
          </div>
          <button
            onClick={() => onApplySuggestion(result.suggestion, `AI Suggested ${result.suggestion}: ${result.justification}`)}
            className="w-full mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
          >
            Apply this rating & note
          </button>
        </div>
      )}
    </div>
  );
};
