import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ModelSelector from './components/ModelSelector';
import ApplicantForm from './components/ApplicantForm';
import ResultsDashboard from './components/ResultsDashboard';
import SettingsModal from './components/SettingsModal';
import './App.css';

const DEFAULT_FORM_DATA = {
  age: 35,
  income: 65000,
  loanamount: 20000,
  creditscore: 710,
  monthsemployed: 48,
  numcreditlines: 4,
  interestrate: 8.5,
  loanterm: 36,
  dtiratio: 0.28,
  education: "Bachelor's",
  employmenttype: "Full-time",
  maritalstatus: "Married",
  hasmortgage: "Yes",
  hasdependents: "No",
  loanpurpose: "Auto",
  hascosigner: "No"
};

const PRESETS = {
  safe: {
    age: 42,
    income: 125000,
    loanamount: 15000,
    creditscore: 790,
    monthsemployed: 96,
    numcreditlines: 3,
    interestrate: 5.5,
    loanterm: 36,
    dtiratio: 0.15,
    education: "Master's",
    employmenttype: "Full-time",
    maritalstatus: "Married",
    hasmortgage: "Yes",
    hasdependents: "Yes",
    loanpurpose: "Home",
    hascosigner: "Yes"
  },
  moderate: {
    age: 32,
    income: 55000,
    loanamount: 25000,
    creditscore: 660,
    monthsemployed: 36,
    numcreditlines: 5,
    interestrate: 11.5,
    loanterm: 48,
    dtiratio: 0.38,
    education: "Bachelor's",
    employmenttype: "Full-time",
    maritalstatus: "Single",
    hasmortgage: "No",
    hasdependents: "Yes",
    loanpurpose: "Auto",
    hascosigner: "No"
  },
  risky: {
    age: 21,
    income: 18000,
    loanamount: 50000,
    creditscore: 520,
    monthsemployed: 3,
    numcreditlines: 8,
    interestrate: 22.0,
    loanterm: 60,
    dtiratio: 0.72,
    education: "High School",
    employmenttype: "Unemployed",
    maritalstatus: "Single",
    hasmortgage: "No",
    hasdependents: "No",
    loanpurpose: "Other",
    hascosigner: "No"
  }
};

export default function App() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [selectedModel, setSelectedModel] = useState('all');
  const [apiBaseUrl, setApiBaseUrl] = useState('http://127.0.0.1:5000');
  
  const [backendStatus, setBackendStatus] = useState({ online: false, loading: true });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Ping backend on startup or URL change
  const pingBackend = async (urlToTest = apiBaseUrl) => {
    setBackendStatus(prev => ({ ...prev, loading: true }));
    try {
      const response = await fetch(`${urlToTest}/`, { method: 'GET' });
      if (response.ok) {
        setBackendStatus({ online: true, loading: false });
      } else {
        setBackendStatus({ online: false, loading: false });
      }
    } catch (err) {
      setBackendStatus({ online: false, loading: false });
    }
  };

  useEffect(() => {
    pingBackend();
  }, [apiBaseUrl]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLoadPreset = (presetKey) => {
    if (PRESETS[presetKey]) {
      setFormData(PRESETS[presetKey]);
    }
  };

  const handleResetForm = () => {
    setFormData(DEFAULT_FORM_DATA);
    setResult(null);
    setError(null);
  };

  // Execute Fetch request to Backend /predict
  const handleSubmitPrediction = async (e) => {
    if (e) e.preventDefault();
    setIsAnalyzing(true);
    setError(null);

    const payload = {
      ...formData,
      model: selectedModel
    };

    try {
      const response = await fetch(`${apiBaseUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data);
        setBackendStatus({ online: true, loading: false });
      } else {
        setError(data.error || 'Prediction request failed.');
      }
    } catch (err) {
      console.error('API Error:', err);
      setError(`Failed to connect to backend server at ${apiBaseUrl}. Ensure Flask is running on port 5000.`);
      setBackendStatus({ online: false, loading: false });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navigation */}
      <Header
        backendStatus={backendStatus}
        onPingBackend={() => pingBackend(apiBaseUrl)}
        onLoadPreset={handleLoadPreset}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isAnalyzing={isAnalyzing}
      />

      {/* Model Tab Selector */}
      <ModelSelector
        selectedModel={selectedModel}
        onSelectModel={(modelId) => {
          setSelectedModel(modelId);
        }}
      />

      {/* Main Grid: Left = Applicant Form, Right = Evaluation Dashboard */}
      <main style={{
        flex: 1,
        margin: '0 1.5rem 1.5rem 1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.25rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Form */}
        <div>
          <ApplicantForm
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmitPrediction}
            onReset={handleResetForm}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {/* Right Column: Dashboard Results */}
        <div>
          <ResultsDashboard
            result={result}
            isAnalyzing={isAnalyzing}
            error={error}
            formData={formData}
          />
        </div>

      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiBaseUrl={apiBaseUrl}
        onSaveApiUrl={(newUrl) => {
          setApiBaseUrl(newUrl);
          setIsSettingsOpen(false);
        }}
        backendStatus={backendStatus}
        onTestConnection={pingBackend}
      />

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1rem',
        fontSize: '0.78rem',
        color: 'var(--text-dim)',
        borderTop: '1px solid var(--border-color)',
        background: 'rgba(9, 13, 22, 0.9)'
      }}>
        LoanPulse AI Suite • Connected to Flask Python Engine • Multi-Model Evaluation Architecture
      </footer>

    </div>
  );
}
