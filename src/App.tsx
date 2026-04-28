import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuth } from "./hooks/useAuth.ts";
import { CircularProgress, Box, CssBaseline } from "@mui/material";
import { AppProvider, useAppContext } from "./context/AppContext";
import { ThemeProvider } from "@mui/material/styles";
import ErrorBoundary from "./components/ErrorBoundary";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Patients = lazy(() => import("./pages/Patients"));
const PatientDetail = lazy(() => import("./pages/PatientDetail"));
const Analytics = lazy(() => import("./pages/Analytics"));

const AppContent = () => {
  const { currentUser, loading } = useAuth();
  const { theme } = useAppContext();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route
              path="/login"
              element={
                !currentUser ? <LoginPage /> : <Navigate to="/dashboard" />
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/patients"
              element={currentUser ? <Patients /> : <Navigate to="/login" />}
            />
            <Route
              path="/patients/:id"
              element={
                currentUser ? <PatientDetail /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/analytics"
              element={currentUser ? <Analytics /> : <Navigate to="/login" />}
            />

            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
