import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createTheme, type Theme } from "@mui/material/styles";

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
  userPreferences: {
    language: string;
    notificationsEnabled: boolean;
  };
  setUserPreferences: (
    prefs: Partial<AppContextType["userPreferences"]>,
  ) => void;
  showToast: (
    message: string,
    severity?: "success" | "error" | "warning" | "info",
  ) => void;
  toast: {
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  } | null;
  closeToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userPreferences, setUserPreferencesState] = useState({
    language: "en",
    notificationsEnabled: true,
  });
  const [toast, setToast] = useState<AppContextType["toast"]>(null);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
      background: {
        default: isDarkMode ? "#121212" : "#f5f7f9",
        paper: isDarkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#0f172a",
        secondary: isDarkMode ? "#d1d5db" : "#64748b",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDarkMode ? "#121212" : "#f5f7f9",
            color: isDarkMode ? "#ffffff" : "#0f172a",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "inherit",
          },
        },
      },
    },
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setUserPreferences = (
    prefs: Partial<AppContextType["userPreferences"]>,
  ) => {
    setUserPreferencesState((prev) => ({ ...prev, ...prefs }));
  };

  const showToast = (
    message: string,
    severity: "success" | "error" | "warning" | "info" = "info",
  ) => {
    setToast({ open: true, message, severity });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
    const savedPrefs = localStorage.getItem("userPreferences");
    if (savedPrefs) {
      setUserPreferencesState(JSON.parse(savedPrefs));
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
  }, [userPreferences]);

  const value: AppContextType = {
    theme,
    toggleTheme,
    isDarkMode,
    userPreferences,
    setUserPreferences,
    showToast,
    toast,
    closeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
