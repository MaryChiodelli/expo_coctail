import { themes } from '@/styles/themes';
import { createContext, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  colors: themes.light,
  toggleTheme: () => { },
});


export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('light');
  const colors = themes[theme as 'light' | 'dark'];

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext>
  );
}