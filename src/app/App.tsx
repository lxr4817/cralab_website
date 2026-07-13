import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import ResearchAreas from './components/ResearchAreas';
import Advisor from './components/Advisor';
import Papers from './components/Papers';
import CurrentMembers from './components/CurrentMembers';
import Projects from './components/Projects';
import Home from './components/Home';

const pageRoutes = new Set([
  'home',
  'research-areas',
  'advisor',
  'current-members',
  'publications',
  'projects',
]);

const memberSectionRoutes = new Set([
  'phd-students',
  'master’s-students',
  'undergraduate-research-assistants',
  'ph-d-course',
  'master-course',
]);

function getPageFromHash() {
  const rawHash = window.location.hash.replace('#', '');
  const hash = rawHash ? decodeURIComponent(rawHash) : '';

  if (!hash) {
    return 'home';
  }

  if (pageRoutes.has(hash)) {
    return hash;
  }

  if (hash === 'papers') {
    return 'publications';
  }

  if (memberSectionRoutes.has(hash)) {
    return 'current-members';
  }

  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(() => getPageFromHash());

  useEffect(() => {
    function handleHashChange() {
      setCurrentPage(getPageFromHash());
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function handleNavigate(page: string) {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'research-areas':
        return <ResearchAreas />;
      case 'advisor':
        return <Advisor />;
      case 'current-members':
        return <CurrentMembers />;
      case 'publications':
        return <Papers />;
      case 'projects':
        return <Projects />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavigate={handleNavigate} />
      <main
        className={
          currentPage === 'home'
            ? ''
            : 'mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'
        }
      >
        {renderContent()}
      </main>
    </div>
  );
}
