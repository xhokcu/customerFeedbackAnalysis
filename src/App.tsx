import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import AnalyticsResult from './components/AnalyticsResult';
import { FeedbackItem } from './types';
import './App.css';
import uploadIcon from './assets/upload-icon.svg';
import processIcon from './assets/process-icon.svg';
import resultsIcon from './assets/results-icon.svg';
import feedbackImage from './assets/feedback.svg';

function App() {
  const [analyticsData, setAnalyticsData] = useState<FeedbackItem[] | null>(
    null,
  );

  const handleDataReceived = (data: FeedbackItem[]) => {
    setAnalyticsData(data);
  };

  const scrollToUpload = () => {
    const uploadSection = document.querySelector('.upload-section');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (sectionClass: string) => {
    const section = document.querySelector(`.${sectionClass}`);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="header-title">AI Feedback</h1>
          <nav className="nav-links">
            <button onClick={() => scrollToSection('hero-section')}>
              Home
            </button>
            <button onClick={() => scrollToSection('upload-section')}>
              Upload File
            </button>
            <button onClick={() => scrollToSection('how-it-works')}>
              How It Works
            </button>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <section className="hero-section">
          <h1 className="hero-title">Welcome to AI Feedback Analysis</h1>
          <div className="hero-image">
            <img src={feedbackImage} alt="AI Analysis Illustration" />
          </div>
          <p className="hero-description">
            Harness the power of AI to gain insights from customer feedback.
            Easily upload your data and let our AI do the rest.
          </p>
          <button className="get-started-btn" onClick={scrollToUpload}>
            Get Started
          </button>
        </section>

        <section className="upload-section">
          <h2>Upload Your Feedback Data</h2>
          <FileUpload onDataReceived={handleDataReceived} />
          {analyticsData && <AnalyticsResult data={analyticsData} />}
        </section>

        <section className="how-it-works">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">
                <img src={uploadIcon} alt="Upload Data" />
              </div>
              <h3>Upload Data</h3>
            </div>

            <div className="step">
              <div className="step-icon">
                <img src={processIcon} alt="AI Processing" />
              </div>
              <h3>AI Processing</h3>
            </div>

            <div className="step">
              <div className="step-icon">
                <img src={resultsIcon} alt="View Results" />
              </div>
              <h3>View Results</h3>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
