import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import SurveyPage from './pages/SurveyPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/thanks" element={<ThankYouPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </Layout>
  );
}

export default App;