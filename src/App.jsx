import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import PageLayout from '@/components/layout/PageLayout';

// Pages
import Home from '@/pages/Home';
import UsCrypto from '@/pages/UsCrypto';
import Atlas from '@/pages/Atlas';
import Learn from '@/pages/Learn';
import Playbook from '@/pages/Playbook';
import OldWorld from '@/pages/OldWorld';
import Terminal from '@/pages/Terminal';
import Community from '@/pages/Community';
import Resources from '@/pages/Resources';
import Moderation from '@/pages/Moderation';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/us-crypto" element={<UsCrypto />} />
        <Route path="/atlas" element={<Atlas />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/playbook" element={<Playbook />} />
        <Route path="/old-world" element={<OldWorld />} />
        <Route path="/terminal" element={<Terminal />} />
        <Route path="/community" element={<Community />} />
        <Route path="/resources" element={<Resources />} />
      </Route>
      <Route path="/moderation" element={<Moderation />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;