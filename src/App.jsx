import { lazy, useMemo, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from "./style/theme/Theme";
import GlobalStyle from "./style/theme/GlobalStyle";
import { UserProvider } from "./post/context/UserContext";
import Navbar from "./Navbar";
import Home from "./Home/Home";

import LoadingPage from "./style/LoadingPage";
const TaskDashboard = lazy(() => import("./TaskManagement/component/Board"));

function App() {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    const dark = storedTheme
      ? storedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark", dark); // ← tambah ini
    return dark;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.body.classList.toggle("dark", isDark); // ← tambah ini
  }, [isDark]);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <UserProvider>
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<TaskDashboard />} />
        </Routes>
      </Suspense>
    </UserProvider>
  </ThemeProvider>
);
}

export default App;
