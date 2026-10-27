import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StatusBar } from './components/StatusBar';
import { Home } from './pages/Home';
import { BlogPostDetail } from './pages/BlogPostDetail';
import { Admin } from './pages/Admin';

// Scrolls to the section named in the URL hash, or to the top on a new page.
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.getElementById(hash.slice(1));
    el?.scrollIntoView();
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/projects" element={<Navigate to={{ pathname: '/', hash: '#projects' }} replace />} />
        <Route path="/blog" element={<Navigate to={{ pathname: '/', hash: '#journal' }} replace />} />
        <Route path="/blog/:slug" element={<BlogPostDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
      <StatusBar />
    </BrowserRouter>
  );
}

export default App;
