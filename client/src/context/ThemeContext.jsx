import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Default dark mode — always start dark
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('devshree-theme');
    return stored !== null ? stored === 'dark' : true; // default: dark
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('devshree-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
