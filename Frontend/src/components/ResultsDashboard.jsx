import React from 'react';
import { ShieldAlert, ShieldCheck, TrendingUp, AlertTriangle, Award, CheckCircle, HelpCircle, BarChart3, ChevronRight } from 'lucide-react';

export default function ResultsDashboard({ result, isAnalyzing, error, formData }) {
  if (isAnalyzing) {
    return (
      <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '380px' }}>
        <div className="pulse-loader" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)' }}>
          <TrendingUp size={32} color="#ffffff" className="animate-spin" />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Fetching Machine Learning Models...</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '400px' }}>
          Sending request to Flask Backend... Computing features across Logistic Regression, Random Forest, Decision Tree, AdaBoost, and Bagging models.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ padding: '0.6rem', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '10px', color: '#ef4444' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 style={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: 700 }}>Backend API Error</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.35rem' }}>
              {error}
            </p>
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)', background: 'rgba(0,0,0,0.3)', padding: '0.6rem 0.85rem', borderRadius: '6px', fontFamily: 'JetBrains Mono, monospace' }}>
              Make sure the Python Flask backend is running (`python app.py`) on port 5000.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '380px', color: 'var(--text-muted)' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <BarChart3 size={28} color="var(--text-dim)" />
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>Ready for Risk Evaluation</h3>
        <p style={{ fontSize: '0.85rem', maxWidth: '360px', color: 'var(--text-muted)' }}>
          Click <strong>"Evaluate Default Risk Now"</strong> or choose a sample preset above to run machine learning predictions.
        </p>
      </div>
    );
  }

  // Extract model results present in payload
  const modelKeys = [
    { key: 'logistic_regression', name: 'Logistic Regression' },
    { key: 'random_forest', name: 'Random Forest' },
    { key: 'decision_tree', name: 'Decision Tree' },
    { key: 'adaboost', name: 'AdaBoost' },
    { key: 'bagging', name: 'Bagging Classifier' }
  ];

  const activeModelResults = modelKeys
    .filter(m => result[m.key])
    .map(m => ({ ...m, ...result[m.key] }));

  // Consensus count
  const totalModels = activeModelResults.length;
  const highRiskCount = activeModelResults.filter(m => m.prediction === 1).length;
  const lowRiskCount = totalModels - highRiskCount;
  
  const isOverallHighRisk = result.prediction === 1;

  // Calculate quick heuristic risk highlights
  const riskFactors = [];
  const positiveFactors = [];
  if (formData) {
    if (Number(formData.creditscore) >= 720) positiveFactors.push(`Excellent Credit Score (${formData.creditscore})`);
    else if (Number(formData.creditscore) < 600) riskFactors.push(`Low Credit Score (${formData.creditscore})`);

    if (Number(formData.income) >= 75000) positiveFactors.push(`Strong Annual Income ($${Number(formData.income).toLocaleString()})`);
    else if (Number(formData.income) < 30000) riskFactors.push(`Limited Income ($${Number(formData.income).toLocaleString()})`);

    if (Number(formData.dtiratio) > 0.45) riskFactors.push(`High Debt-to-Income Ratio (${formData.dtiratio})`);
    else if (Number(formData.dtiratio) <= 0.25) positiveFactors.push(`Healthy DTI Ratio (${formData.dtiratio})`);

    if (formData.hascosigner === 'Yes') positiveFactors.push('Has Cosigner Backing');
    if (formData.employmenttype === 'Unemployed') riskFactors.push('Currently Unemployed');
    if (formData.employmenttype === 'Full-time') positiveFactors.push('Full-time Employment');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="animate-fade-in">
      
      {/* Overview Primary Verdict Card */}
      <div 
        className="glass-panel" 
        style={{
          padding: '1.5rem',
          border: isOverallHighRisk 
            ? '1.5px solid rgba(239, 68, 68, 0.5)' 
            : '1.5px solid rgba(16, 185, 129, 0.5)',
          background: isOverallHighRisk 
            ? 'radial-gradient(circle at top right, rgba(239, 68, 68, 0.12), rgba(15, 23, 42, 0.7))' 
            : 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.12), rgba(15, 23, 42, 0.7))'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: isOverallHighRisk ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
              border: isOverallHighRisk ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isOverallHighRisk ? '#ef4444' : '#10b981'
            }}>
              {isOverallHighRisk ? <ShieldAlert size={30} /> : <ShieldCheck size={30} />}
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 600 }}>
                Primary Evaluation Verdict
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: isOverallHighRisk ? '#f87171' : '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {result.risk_status}
              </h2>
            </div>
          </div>

          {/* Model Consensus Tag */}
          {totalModels > 1 && (
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.3)', 
              padding: '0.75rem 1rem', 
              borderRadius: 'var(--radius-sm)', 
              border: '1px solid var(--border-color)',
              textAlign: 'right'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
                Model Consensus
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px', color: '#ffffff' }}>
                {lowRiskCount} / {totalModels} Models Predict <span style={{ color: '#34d399' }}>Low Risk</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Model Probability Matrix & Cards */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart3 size={16} color="#38bdf8" /> Algorithm Risk Breakdown
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
          {activeModelResults.map((m) => {
            const probPercent = m.probability !== null && m.probability !== undefined 
              ? Math.round(m.probability * 100) 
              : null;
            const isHigh = m.prediction === 1;

            return (
              <div 
                key={m.key} 
                className="glass-card"
                style={{
                  border: isHigh ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    {m.name}
                  </span>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: isHigh ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                    color: isHigh ? '#f87171' : '#34d399',
                    border: isHigh ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    {isHigh ? 'High Risk' : 'Low Risk'}
                  </span>
                </div>

                {/* Probability Bar */}
                {probPercent !== null ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      <span>Default Probability:</span>
                      <strong style={{ color: probPercent > 40 ? '#f87171' : '#34d399' }}>{probPercent}%</strong>
                    </div>
                    <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${Math.min(probPercent, 100)}%`,
                        background: probPercent > 50 
                          ? 'linear-gradient(90deg, #f59e0b, #ef4444)' 
                          : probPercent > 25 
                            ? 'linear-gradient(90deg, #10b981, #f59e0b)' 
                            : 'linear-gradient(90deg, #06b6d4, #10b981)',
                        borderRadius: '4px',
                        transition: 'width 0.6s ease-out'
                      }} />
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                    Probability score not supported by model
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Factors Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
        
        {/* Positive Factors */}
        <div className="glass-card" style={{ background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
          <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34d399', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle size={14} /> Favorable Risk Signals
          </h4>
          {positiveFactors.length > 0 ? (
            <ul style={{ listStyle: 'none', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {positiveFactors.map((fact, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ChevronRight size={12} color="#10b981" /> {fact}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Standard baseline metrics</p>
          )}
        </div>

        {/* Risk Indicators */}
        <div className="glass-card" style={{ background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
          <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f87171', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <AlertTriangle size={14} /> Caution / Risk Highlights
          </h4>
          {riskFactors.length > 0 ? (
            <ul style={{ listStyle: 'none', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {riskFactors.map((fact, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ChevronRight size={12} color="#ef4444" /> {fact}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>No elevated risk indicators detected</p>
          )}
        </div>

      </div>

    </div>
  );
}
