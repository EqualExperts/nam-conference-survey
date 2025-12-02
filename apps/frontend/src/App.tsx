import { Routes, Route } from 'react-router-dom';
import SurveyPage from './pages/SurveyPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SurveyPage />} />
      <Route path="/survey" element={<SurveyPage />} />
      <Route path="/thanks" element={<ThankYouPage />} />
    </Routes>
  );
}

export default App;