import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import OverviewPage from './pages/OverviewPage'
import ResourcesPage from './pages/ResourcesPage'
import GuidesPage from './pages/GuidesPage'
import TutorialsPage from './pages/TutorialsPage'
import DocumentationPage from './pages/DocumentationPage'
import FAQPage from './pages/FAQPage'
import SchemesPage from './pages/SchemesPage'
import SupportPage from './pages/SupportPage'
import TeamsPage from './pages/TeamsPage'
import BlogPage from './pages/BlogPage'
import SurveyPage from './pages/SurveyPage'
import FeedbackPage from './pages/FeedbackPage'
import ArticlePage from './pages/ArticlePage'
import UserDashboard from './pages/UserDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="relative min-h-screen overflow-hidden">
        {/* Content */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <HomePage />
              </>
            } />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/schemes" element={<SchemesPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/article/voice-ai-rural-india" element={<ArticlePage />} />
            <Route path="/survey" element={<SurveyPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/user-dashboard" element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route - redirect any unknown path to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
    </AuthProvider>
  )
}

export default App
