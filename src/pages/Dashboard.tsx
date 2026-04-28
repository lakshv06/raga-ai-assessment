import React, { useState, useCallback, useMemo } from "react";
import { Grid, Paper, Typography, Box, Alert } from "@mui/material";
import Layout from "../components/Layout";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button, AlertTitle } from "@mui/material";
import { NotificationsActive } from "@mui/icons-material";
import { requestNotificationPermission } from "../utils/registerSW";
import { useAppContext } from "../context/AppContext";

const StatCard = React.memo(({ title, value, color }: any) => (
  <Paper sx={{ p: 3, borderRadius: 2, borderLeft: `6px solid ${color}` }}>
    <Typography variant="subtitle2" color="textSecondary">
      {title}
    </Typography>
    <Typography variant="h4" fontWeight="bold">
      {value}
    </Typography>
  </Paper>
));

const Dashboard = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { showToast } = useAppContext();

  const handleSnackbarClose = (_event?: Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const revenueData = useMemo(
    () => [
      { month: "Jan", revenue: 45000, cost: 32000, patients: 120 },
      { month: "Feb", revenue: 52000, cost: 34000, patients: 150 },
      { month: "Mar", revenue: 48000, cost: 33000, patients: 140 },
      { month: "Apr", revenue: 61000, cost: 40000, patients: 180 },
      { month: "May", revenue: 55000, cost: 38000, patients: 165 },
    ],
    [],
  );

  const handleTriggerNotification = useCallback(async () => {
    const permission = await requestNotificationPermission();

    if (permission === "granted") {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification("Emergency Alert: Room 402", {
        body: "Patient John Doe's heart rate is elevated. Immediate assistance required.",
        icon: "https://cdn-icons-png.flaticon.com/512/822/822118.png",
        tag: "emergency-alert",
      });
      showToast(
        "Notification request granted. Check your browser/OS notification tray.",
        "success",
      );
    } else if (permission === "denied") {
      showToast(
        "Notification permission denied. Please enable notifications in your browser settings.",
        "error",
      );
    } else {
      showToast("Notification permission request dismissed.", "warning");
    }

    setSnackbarOpen(true);
  }, [showToast]);

  return (
    <Layout>
      <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
        <AlertTitle>System Notification</AlertTitle>
        Enable notifications to receive real-time emergency updates.
        <Button
          startIcon={<NotificationsActive />}
          size="small"
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={handleTriggerNotification}
        >
          Enable & Test
        </Button>
      </Alert>
      <Typography
        variant="h4"
        color="text.primary"
        fontWeight="bold"
        sx={{ mb: 4 }}
      >
        Hospital Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard title="Total Patients" value="1,284" color="#1976d2" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Active Consultations" value="42" color="#2e7d32" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Pending Reports" value="12" color="#ed6c02" />
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4, p: 3, borderRadius: 2, height: 400 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Revenue vs. Patient Volume
        </Typography>
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis
              label={{ value: "USD ($)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend verticalAlign="top" align="right" />

            <Bar
              name="Gross Revenue"
              dataKey="revenue"
              fill="#1976d2"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />

            <Line
              name="Patient Count"
              type="monotone"
              dataKey="patients"
              stroke="#ed6c02"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Paper>
    </Layout>
  );
};

export default Dashboard;
