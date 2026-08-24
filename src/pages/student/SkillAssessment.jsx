import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import { assessmentQuestions } from '../../data/assessment';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, Flag, Clock, CheckCircle, XCircle, BarChart2, AlertTriangle } from 'lucide-react';

const TOTAL = assessmentQuestions.length;
const TOTAL_TIME = 30 * 60; // 30 minutes

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

export default function SkillAssessment() {
  const navigate = useNavigate();
  const { saveAssessmentResults, assessmentResults } = useApp();
  const [phase, setPhase] = useState(assessmentResults ? 'results' : 'intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (phase !== 'test') return;
    if (timeLeft <= 0) { handleSubmit(); return; }
    const t = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [phase, timeLeft]);

  const handleAnswer = (qi, ai) => {
    setAnswers(prev => ({ ...prev, [qi]: ai }));
  };

  const toggleFlag = () => {
    setFlagged(prev => {
      const n = new Set(prev);
      n.has(current) ? n.delete(current) : n.add(current);
      return n;
    });
  };

  const handleSubmit = () => {
    const results = {
      answers,
      score: assessmentQuestions.filter((q, i) => answers[i] === q.correct).length,
      total: TOTAL,
      timeTaken: TOTAL_TIME - timeLeft,
      byCategory: {},
      submittedAt: new Date().toISOString(),
    };
    assessmentQuestions.forEach((q, i) => {
      if (!results.byCategory[q.category]) results.byCategory[q.category] = { correct: 0, total: 0 };
      results.byCategory[q.category].total++;
      if (answers[i] === q.correct) results.byCategory[q.category].correct++;
    });
    saveAssessmentResults(results);
    setPhase('results');
  };

  const q = assessmentQuestions[current];
  const answered = Object.keys(answers).length;
  const progress = (answered / TOTAL) * 100;

  if (phase === 'intro') {
    return (
      <DashboardLayout>
        <Topbar title="Skill Assessment" />
        <div className="p-6 max-w-2xl mx-auto">
          <div className="card p-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <BarChart2 size={32} className="text-primary-600" />
            </div>
            <h1 className="text-2xl font-display font-bold text-surface-900 mb-3">Skill Assessment</h1>
            <p className="text-surface-600 mb-6 max-w-md mx-auto">
              This assessment evaluates your technical and soft skills against industry benchmarks. Your results will generate a personalized skill profile and recommendations.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Questions', value: TOTAL, icon: Flag },
                { label: 'Duration', value: '30 min', icon: Clock },
                { label: 'Categories', value: '7', icon: BarChart2 },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-surface-50 rounded-xl p-4">
                  <Icon size={20} className="text-primary-500 mx-auto mb-2" />
                  <div className="text-xl font-display font-bold text-surface-900">{value}</div>
                  <div className="text-xs text-surface-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700">
                  <p className="font-semibold mb-1">Before you start:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>You have 30 minutes to complete all questions</li>
                    <li>You can flag questions to review later</li>
                    <li>Each question has only one correct answer</li>
                    <li>Results generate your skill profile instantly</li>
                  </ul>
                </div>
              </div>
            </div>
            <button onClick={() => setPhase('test')} className="btn-primary px-8 py-3 text-base justify-center">
              Start Assessment
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (phase === 'results') {
    const results = assessmentResults;
    const score = results?.score || 0;
    const pct = Math.round((score / TOTAL) * 100);
    return (
      <DashboardLayout>
        <Topbar title="Assessment Results" />
        <div className="p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
          <div className="card p-8 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${pct >= 70 ? 'bg-emerald-100' : pct >= 50 ? 'bg-amber-100' : 'bg-red-100'}`}>
              {pct >= 70 ? (
                <CheckCircle size={40} className="text-emerald-600" />
              ) : (
                <XCircle size={40} className={pct >= 50 ? 'text-amber-600' : 'text-red-600'} />
              )}
            </div>
            <h2 className="text-3xl font-display font-bold text-surface-900 mb-1">{pct}%</h2>
            <p className="text-surface-500 mb-2">{score} / {TOTAL} correct answers</p>
            <p className={`text-sm font-semibold ${pct >= 70 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
              {pct >= 80 ? 'Excellent! Industry-ready in these skills.' : pct >= 60 ? 'Good. You have a solid foundation with room to grow.' : 'Needs improvement. Focus on the recommended courses.'}
            </p>
          </div>

          {/* Category breakdown */}
          {results?.byCategory && (
            <div className="card p-5">
              <h3 className="section-title mb-4">Performance by Category</h3>
              <div className="space-y-3">
                {Object.entries(results.byCategory).map(([cat, data]) => {
                  const pct = Math.round((data.correct / data.total) * 100);
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-surface-700">{cat}</span>
                        <span className="text-xs font-semibold text-surface-600">{data.correct}/{data.total} · {pct}%</span>
                      </div>
                      <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${pct >= 70 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Question review */}
          <div className="card p-5">
            <h3 className="section-title mb-4">Question Review</h3>
            <div className="space-y-4">
              {assessmentQuestions.map((q, i) => {
                const userAns = results?.answers?.[i];
                const correct = userAns === q.correct;
                const answered2 = userAns !== undefined;
                return (
                  <div key={i} className={`p-4 rounded-xl border ${correct ? 'border-emerald-200 bg-emerald-50' : answered2 ? 'border-red-200 bg-red-50' : 'border-surface-200'}`}>
                    <div className="flex items-start gap-2 mb-2">
                      {correct ? <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" /> : <XCircle size={16} className={answered2 ? 'text-red-600' : 'text-surface-400'} />}
                      <div>
                        <span className="text-xs font-semibold text-surface-500 mb-1 block">{q.category} · {q.difficulty}</span>
                        <p className="text-sm font-medium text-surface-800">{q.question}</p>
                      </div>
                    </div>
                    {!correct && answered2 && (
                      <div className="mt-2 ml-6">
                        <p className="text-xs text-red-600 mb-1">Your answer: <strong>{q.options[userAns]}</strong></p>
                        <p className="text-xs text-emerald-700">Correct: <strong>{q.options[q.correct]}</strong></p>
                        <p className="text-xs text-surface-500 mt-1.5 italic">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setPhase('intro'); setAnswers({}); setTimeLeft(TOTAL_TIME); setCurrent(0); setFlagged(new Set()); }} className="btn-secondary flex-1">
              Retake Assessment
            </button>
            <button onClick={() => navigate('/student/skills')} className="btn-primary flex-1">
              View Skill Profile →
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1">
        {/* Assessment header */}
        <div className="sticky top-0 bg-white border-b border-surface-200 z-30">
          <div className="px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-surface-700">
                Question {current + 1} of {TOTAL}
              </span>
              <span className="badge-neutral">{q.category}</span>
              <span className={`badge ${q.difficulty === 'Easy' ? 'badge-success' : q.difficulty === 'Medium' ? 'badge-warning' : 'badge-danger'}`}>
                {q.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-surface-500">{answered}/{TOTAL} answered</span>
              <div className={`flex items-center gap-1.5 text-sm font-mono font-semibold ${timeLeft < 300 ? 'text-red-600' : 'text-surface-700'}`}>
                <Clock size={14} />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          {/* Progress */}
          <div className="h-1 bg-surface-100">
            <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="p-6 max-w-3xl mx-auto space-y-6">
          {/* Question */}
          <div className="card p-6 animate-fade-in">
            <h2 className="text-lg font-display font-semibold text-surface-900 mb-6 leading-relaxed">{q.question}</h2>
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const selected = answers[current] === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(current, i)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      selected
                        ? 'border-primary-500 bg-primary-50 text-primary-800'
                        : 'border-surface-200 bg-white text-surface-700 hover:border-surface-300 hover:bg-surface-50'
                    }`}
                  >
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 text-xs font-bold border ${
                      selected ? 'bg-primary-500 border-primary-500 text-white' : 'border-surface-300 text-surface-500'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question grid */}
          <div className="card p-4">
            <p className="text-xs text-surface-500 font-semibold mb-3 uppercase tracking-wide">Question Navigator</p>
            <div className="flex flex-wrap gap-1.5">
              {assessmentQuestions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                    i === current ? 'bg-primary-600 text-white' :
                    flagged.has(i) ? 'bg-amber-100 text-amber-700 border border-amber-300' :
                    answers[i] !== undefined ? 'bg-emerald-100 text-emerald-700' :
                    'bg-surface-100 text-surface-500 hover:bg-surface-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-surface-500">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary-500" /> Current</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-400" /> Answered</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-300" /> Flagged</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-surface-200" /> Not answered</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrent(Math.max(0, current - 1))}
                disabled={current === 0}
                className="btn-secondary"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <button
                onClick={toggleFlag}
                className={`btn-ghost ${flagged.has(current) ? 'text-amber-600 bg-amber-50' : ''}`}
              >
                <Flag size={15} />
                {flagged.has(current) ? 'Unflag' : 'Flag for Review'}
              </button>
            </div>
            <div className="flex gap-2">
              {current < TOTAL - 1 ? (
                <button
                  onClick={() => setCurrent(Math.min(TOTAL - 1, current + 1))}
                  className="btn-primary"
                >
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn-primary bg-emerald-600 hover:bg-emerald-700"
                >
                  <CheckCircle size={16} />
                  Submit Assessment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
