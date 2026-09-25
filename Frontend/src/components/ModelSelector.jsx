import React from 'react';
import { Layers, Activity, GitBranch, Cpu, Zap, Box } from 'lucide-react';

const MODELS = [
  { id: 'all', label: 'Compare All 5 Models', icon: Layers, desc: 'Multi-algorithm consensus & comparison matrix' },
  { id: 'logistic', label: 'Logistic Regression', icon: Activity, desc: 'Linear baseline with probability estimates' },
  { id: 'random_forest', label: 'Random Forest', icon: GitBranch, desc: 'Ensemble of decision trees for robust results' },
  { id: 'decision_tree', label: 'Decision Tree', icon: Cpu, desc: 'Hierarchical rule-based classifier' },
  { id: 'adaboost', label: 'AdaBoost', icon: Zap, desc: 'Adaptive boosting on weak learners' },
  { id: 'bagging', label: 'Bagging Classifier', icon: Box, desc: 'Bootstrap aggregating ensemble model' }
];

export default function ModelSelector({ selectedModel, onSelectModel }) {
  return (
    <div style={{ margin: '1rem 1.5rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '0.75rem'
      }}>
        {MODELS.map((model) => {
          const Icon = model.icon;
          const isSelected = selectedModel === model.id;
          const isAll = model.id === 'all';
          
          return (
            <button
              key={model.id}
              onClick={() => onSelectModel(model.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: isSelected 
                  ? isAll 
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.2) 100%)' 
                    : 'rgba(99, 102, 241, 0.18)'
                  : 'rgba(15, 23, 42, 0.5)',
                border: isSelected 
                  ? '1.5px solid #6366f1' 
                  : '1px solid var(--border-color)',
                boxShadow: isSelected ? '0 0 16px rgba(99, 102, 241, 0.25)' : 'none',
                color: isSelected ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'var(--transition)',
                textAlign: 'left'
              }}
            >
              <div style={{
                padding: '0.4rem',
                borderRadius: '8px',
                background: isSelected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
                  {model.label}
                </div>
                <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '2px', textTransform: 'capitalize' }}>
                  {isAll ? 'Full Comparison' : 'Individual Test'}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
