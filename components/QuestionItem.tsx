
import React from 'react';
import { AMSTARQuestion, RatingValue } from '../types';
import { AIAssistant } from './AIAssistant';
import { CheckCircle2, Circle, AlertTriangle, MessageSquareCode } from 'lucide-react';

interface QuestionItemProps {
  question: AMSTARQuestion;
  rating: RatingValue | null;
  notes: string;
  checkedCriteria: string[];
  onRate: (rating: RatingValue) => void;
  onNoteChange: (notes: string) => void;
  onCriteriaToggle: (criterionId: string) => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  rating,
  notes,
  checkedCriteria,
  onRate,
  onNoteChange,
  onCriteriaToggle,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      {/* Header */}
      <div className={`p-6 border-b border-slate-100 ${question.isCritical ? 'bg-rose-50/30' : 'bg-slate-50/30'}`}>
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            rating ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
          }`}>
            {question.id}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {question.isCritical && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3" /> Critical Domain
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-slate-800 leading-tight">
              {question.text}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Rating & Criteria */}
          <div>
            <div className="space-y-6">
              {/* Rating Buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Overall Rating</label>
                <div className="flex flex-wrap gap-2">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => onRate(option)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        rating === option
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Criteria Groups */}
              <div className="space-y-4">
                {question.criteriaGroups.map((group, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">{group.title}</h4>
                    <div className="space-y-2">
                      {group.items.map((item) => (
                        <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                            checked={checkedCriteria.includes(item.id)}
                            onChange={() => onCriteriaToggle(item.id)}
                          />
                          <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Notes & Observations</label>
                <textarea
                  className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                  placeholder="Additional context or justifications..."
                  value={notes}
                  onChange={(e) => onNoteChange(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Column: AI Assistant */}
          <div className="border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
            <AIAssistant 
              questionText={question.text} 
              onApplySuggestion={(s, n) => {
                onRate(s as RatingValue);
                onNoteChange(n);
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
