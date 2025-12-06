import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import SurveyPage from './pages/SurveyPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/thanks" element={<ThankYouPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;