import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import Layout from "../components/Layout";

const mockPatientDetails = {
  1: {
    id: 1,
    name: "Lorem Ipsum",
    age: 45,
    condition: "Hypertension",
    lastVisit: "2026-03-20",
    bloodPressure: "140/90",
    heartRate: 78,
    medications: ["Lisinopril", "Amlodipine"],
    allergies: ["Penicillin"],
    notes: "Patient shows good response to medication. Follow-up in 3 months.",
  },
  2: {
    id: 2,
    name: "Ipsum Ipsum",
    age: 32,
    condition: "Diabetes",
    lastVisit: "2026-03-22",
    bloodPressure: "120/80",
    heartRate: 72,
    medications: ["Metformin", "Insulin"],
    allergies: ["None"],
    notes: "Blood sugar levels stable. Diet and exercise regimen recommended.",
  },
  3: {
    id: 3,
    name: "Lorem Lorem",
    age: 58,
    condition: "Recovery",
    lastVisit: "2026-03-25",
    bloodPressure: "130/85",
    heartRate: 75,
    medications: ["Pain relievers"],
    allergies: ["Aspirin"],
    notes: "Post-surgery recovery progressing well. Physical therapy ongoing.",
  },
};

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const patient = id
    ? mockPatientDetails[id as keyof typeof mockPatientDetails]
    : null;

  if (!patient) {
    return (
      <Layout>
        <Typography variant="h6">Patient not found</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              color="text.primary"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              Patient Details
            </Typography>
            <Typography color="textSecondary">
              A quick overview of the patient health summary and care plan.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={() => window.history.back()}
            sx={{ alignSelf: "flex-end" }}
          >
            Back to Patients
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    width: 96,
                    height: 96,
                    margin: "0 auto 16px",
                    bgcolor: "primary.light",
                    fontSize: "2rem",
                  }}
                >
                  {patient.name[0]}
                </Avatar>
                <Typography variant="h5" fontWeight="bold">
                  {patient.name}
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  Age {patient.age} · {patient.condition}
                </Typography>
                <Chip label={patient.condition} color="primary" />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  Summary
                </Typography>
                <List sx={{ p: 0 }}>
                  <ListItem disableGutters>
                    <ListItemText
                      primary="Last Visit"
                      secondary={patient.lastVisit}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText
                      primary="Blood Pressure"
                      secondary={patient.bloodPressure}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText
                      primary="Heart Rate"
                      secondary={`${patient.heartRate} bpm`}
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                minHeight: 420,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, color: "text.primary" }}
              >
                Care Plan
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, color: "text.secondary" }}
              >
                {patient.notes}
              </Typography>
              <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Medication
                    </Typography>
                    {patient.medications.map((med, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        • {med}
                      </Typography>
                    ))}
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Allergies
                    </Typography>
                    {patient.allergies.map((allergy, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        • {allergy}
                      </Typography>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default PatientDetail;
