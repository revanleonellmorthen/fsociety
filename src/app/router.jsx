import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Cakrawala Application Router
 * Provides unified, seamless routing across Home (/), RISE (/rise), and TRACK (/track).
 * Extensible for nested module sub-routes.
 */

const RouterContext = createContext(null);

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

export const RouterProvider = ({ children }) => {
  const getInitialPath = () => {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname || '/';
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);
  const [currentHash, setCurrentHash] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setCurrentHash(window.location.hash || '');
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (to) => {
    if (typeof window === 'undefined') return;
    
    // Parse target path and hash
    const [path, hash] = to.split('#');
    const targetPath = path || window.location.pathname;
    const targetHash = hash ? `#${hash}` : '';
    const fullUrl = targetPath + targetHash;

    window.history.pushState({}, '', fullUrl);
    setCurrentPath(targetPath);
    setCurrentHash(targetHash);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrent = (path) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, currentHash, navigate, isCurrent }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Link = ({ to, children, className = '', activeClassName = '', onClick, ...rest }) => {
  const { navigate, isCurrent } = useRouter();
  const isActive = isCurrent(to.split('#')[0]);

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  const combinedClasses = [
    className,
    isActive ? activeClassName : ''
  ].filter(Boolean).join(' ');

  return (
    <a href={to} onClick={handleClick} className={combinedClasses} {...rest}>
      {children}
    </a>
  );
};

export default RouterProvider;
