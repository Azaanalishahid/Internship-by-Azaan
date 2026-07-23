import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './pages/Dashboard';
import SamplePage from './pages/SamplePage';
import DocumentationPage from './pages/DocumentationPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import IconsPage from './pages/IconsPage';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'sample-page':
        return <SamplePage />;
      case 'documentation':
        return <DocumentationPage />;
      case 'login':
        return <LoginPage onNavigate={setActivePage} />;
      case 'register':
        return <RegisterPage onNavigate={setActivePage} />;
      case 'icons':
        return <IconsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-wrapper">
      <Sidebar
        collapsed={sidebarCollapsed}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        <TopNav onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className="page-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
