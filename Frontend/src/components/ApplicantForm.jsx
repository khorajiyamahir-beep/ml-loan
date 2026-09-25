import React from 'react';
import { User, Briefcase, DollarSign, Calendar, Percent, CreditCard, HelpCircle, Shield, Play, RotateCcw } from 'lucide-react';

export default function ApplicantForm({ formData, onChange, onSubmit, onReset, isAnalyzing }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? (checked ? 'Yes' : 'No') : value;
    onChange(name, val);
  };

  return (
    <form onSubmit={onSubmit} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Form Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} color="#818cf8" /> Borrower & Loan Profile
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Fill in applicant details to evaluate loan default risk</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-dim)',
            fontSize: '0.78rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
          title="Reset to default fields"
        >
          <RotateCcw size={14} /> Clear Form
        </button>
      </div>

      {/* Section 1: Demographics & Personal */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <User size={14} /> 1. Personal & Demographics
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem' }}>
          
          {/* Age */}
          <div className="form-group">
            <label className="form-label">Age (Years)</label>
            <input
              type="number"
              name="age"
              min="18"
              max="100"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Education */}
          <div className="form-group">
            <label className="form-label">Education Level</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="form-select"
            >
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          {/* Marital Status */}
          <div className="form-group">
            <label className="form-label">Marital Status</label>
            <select
              name="maritalstatus"
              value={formData.maritalstatus}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>

          {/* Has Dependents */}
          <div className="form-group">
            <label className="form-label">Has Dependents?</label>
            <select
              name="hasdependents"
              value={formData.hasdependents}
              onChange={handleChange}
              className="form-select"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

        </div>
      </div>

      {/* Section 2: Financial & Employment */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Briefcase size={14} /> 2. Employment & Income
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem' }}>
          
          {/* Annual Income */}
          <div className="form-group">
            <label className="form-label">Annual Income ($)</label>
            <input
              type="number"
              name="income"
              min="0"
              step="1000"
              value={formData.income}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Employment Type */}
          <div className="form-group">
            <label className="form-label">Employment Type</label>
            <select
              name="employmenttype"
              value={formData.employmenttype}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </div>

          {/* Months Employed */}
          <div className="form-group">
            <label className="form-label">Months Employed</label>
            <input
              type="number"
              name="monthsemployed"
              min="0"
              max="600"
              value={formData.monthsemployed}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Debt to Income Ratio */}
          <div className="form-group">
            <label className="form-label">DTI Ratio (0.0 - 1.0)</label>
            <input
              type="number"
              name="dtiratio"
              min="0"
              max="1"
              step="0.01"
              value={formData.dtiratio}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

        </div>
      </div>

      {/* Section 3: Credit & Loan Request */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <DollarSign size={14} /> 3. Loan & Credit Profile
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem' }}>
          
          {/* Loan Amount */}
          <div className="form-group">
            <label className="form-label">Loan Amount ($)</label>
            <input
              type="number"
              name="loanamount"
              min="1000"
              step="500"
              value={formData.loanamount}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Credit Score */}
          <div className="form-group">
            <label className="form-label">Credit Score (300-850)</label>
            <input
              type="number"
              name="creditscore"
              min="300"
              max="850"
              value={formData.creditscore}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Loan Term */}
          <div className="form-group">
            <label className="form-label">Loan Term (Months)</label>
            <input
              type="number"
              name="loanterm"
              min="6"
              max="360"
              step="6"
              value={formData.loanterm}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Interest Rate */}
          <div className="form-group">
            <label className="form-label">Interest Rate (%)</label>
            <input
              type="number"
              name="interestrate"
              min="1"
              max="40"
              step="0.1"
              value={formData.interestrate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Loan Purpose */}
          <div className="form-group">
            <label className="form-label">Loan Purpose</label>
            <select
              name="loanpurpose"
              value={formData.loanpurpose}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Auto">Auto</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Home">Home</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Num Credit Lines */}
          <div className="form-group">
            <label className="form-label">Active Credit Lines</label>
            <input
              type="number"
              name="numcreditlines"
              min="1"
              max="30"
              value={formData.numcreditlines}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Has Mortgage */}
          <div className="form-group">
            <label className="form-label">Existing Mortgage?</label>
            <select
              name="hasmortgage"
              value={formData.hasmortgage}
              onChange={handleChange}
              className="form-select"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* Has Cosigner */}
          <div className="form-group">
            <label className="form-label">Has Cosigner?</label>
            <select
              name="hascosigner"
              value={formData.hascosigner}
              onChange={handleChange}
              className="form-select"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

        </div>
      </div>

      {/* Action Submit Button */}
      <div style={{ marginTop: '0.5rem' }}>
        <button
          type="submit"
          disabled={isAnalyzing}
          style={{
            width: '100%',
            padding: '0.9rem',
            borderRadius: 'var(--radius-md)',
            background: isAnalyzing 
              ? 'rgba(99, 102, 241, 0.4)' 
              : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            color: '#ffffff',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: isAnalyzing ? 'wait' : 'pointer',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            transition: 'var(--transition)'
          }}
        >
          {isAnalyzing ? (
            <>
              <div className="spinner" /> Running Multi-Model AI Evaluation...
            </>
          ) : (
            <>
              <Play size={18} fill="#ffffff" /> Evaluate Default Risk Now
            </>
          )}
        </button>
      </div>

    </form>
  );
}
