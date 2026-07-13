import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import ResearchAreas from './components/ResearchAreas';
import Advisor from './components/Advisor';
import Papers from './components/Papers';
import CurrentMembers from './components/CurrentMembers';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
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
  'masters-students',
  'master’s-students',
  'undergraduate-research-assistants',
  'masters-alumni',
  'undergraduate-alumni',
  'ph-d-course',
  'master-course',
]);

function getRouteFromHash() {
  const rawHash = window.location.hash.replace('#', '');
  const hash = rawHash ? decodeURIComponent(rawHash) : '';

  if (!hash) {
    return { page: 'home' };
  }

  if (hash.startsWith('projects/')) {
    return { page: 'project-detail', projectSlug: hash.replace('projects/', '') };
  }

  if (pageRoutes.has(hash)) {
    return { page: hash };
  }

  if (hash === 'papers') {
    return { page: 'publications' };
  }

  if (memberSectionRoutes.has(hash)) {
    return { page: 'current-members' };
  }

  return { page: 'home' };
}

export default function App() {
  const [route, setRoute] = useState(() => getRouteFromHash());
  const currentPage = route.page;

  useEffect(() => {
    function handleHashChange() {
      setRoute(getRouteFromHash());
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function handleNavigate(page: string) {
    setRoute({ page });
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleProjectSelect(slug: string) {
    setRoute({ page: 'project-detail', projectSlug: slug });
    window.location.hash = `projects/${slug}`;
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
        return <Projects onProjectSelect={handleProjectSelect} />;
      case 'project-detail':
        return <ProjectDetail slug={route.projectSlug ?? ''} onBack={() => handleNavigate('projects')} />;
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
