import React from 'react';
import { ShieldAlert, ShieldCheck, Activity, Cpu, Sparkles, RefreshCw, Settings, PlayCircle } from 'lucide-react';

export default function Header({ 
  backendStatus, 
  onPingBackend, 
  onLoadPreset, 
  onOpenSettings,
  isAnalyzing 
}) {
  return (
    <header className="glass-panel" style={{ margin: '1rem 1.5rem 0.5rem 1.5rem', padding: '1rem 1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
          }}>
            <Cpu size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                LoanPulse <span style={{ color: '#6366f1', WebkitTextFillColor: '#6366f1' }}>AI</span>
              </h1>
              <span style={{ 
                fontSize: '0.7rem', 
                fontWeight: 700, 
                padding: '2px 8px', 
                borderRadius: '12px', 
                background: 'rgba(99, 102, 241, 0.15)', 
                color: '#818cf8',
                border: '1px solid rgba(99, 102, 241, 0.3)'
              }}>
                v2.5 ML
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Multi-Model Loan Default Prediction & Risk Analytics
            </p>
          </div>
        </div>

        {/* Center: Presets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Quick Presets:
          </span>
          <button 
            onClick={() => onLoadPreset('safe')}
            disabled={isAnalyzing}
            className="btn-preset btn-safe"
            title="Load sample low-risk applicant profile"
          >
            <ShieldCheck size={14} /> Safe Applicant
          </button>
          <button 
            onClick={() => onLoadPreset('moderate')}
            disabled={isAnalyzing}
            className="btn-preset btn-mod"
            title="Load sample moderate-risk applicant profile"
          >
            <Sparkles size={14} /> Moderate Profile
          </button>
          <button 
            onClick={() => onLoadPreset('risky')}
            disabled={isAnalyzing}
            className="btn-preset btn-risk"
            title="Load sample high-risk applicant profile"
          >
            <ShieldAlert size={14} /> High Risk Profile
          </button>
        </div>

        {/* Right: Server Status & Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div 
            onClick={onPingBackend}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.4rem 0.85rem', 
              borderRadius: 'var(--radius-full)', 
              background: backendStatus.online ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${backendStatus.online ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: backendStatus.online ? '#34d399' : '#f87171'
            }}
            title="Click to test backend connection"
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: backendStatus.online ? '#10b981' : '#ef4444',
              boxShadow: backendStatus.online ? '0 0 8px #10b981' : '0 0 8px #ef4444'
            }}></span>
            {backendStatus.loading ? (
              <span>Checking...</span>
            ) : backendStatus.online ? (
              <span>Backend Connected</span>
            ) : (
              <span>Backend Disconnected</span>
            )}
            <RefreshCw size={12} style={{ opacity: 0.7 }} />
          </div>

          <button 
            onClick={onOpenSettings}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Configure Backend URL"
          >
            <Settings size={18} />
          </button>
        </div>

      </div>
    </header>
  );
}
