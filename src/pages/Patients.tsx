import React, { useState } from "react";
import {
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { ViewModule, ViewList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const mockPatients = [
  {
    id: 1,
    name: "Lorem Ipsum",
    age: 45,
    condition: "Hypertension",
    lastVisit: "2026-03-20",
  },
  {
    id: 2,
    name: "Ipsum Ipsum",
    age: 32,
    condition: "Diabetes",
    lastVisit: "2026-03-22",
  },
  {
    id: 3,
    name: "Lorem Lorem",
    age: 58,
    condition: "Recovery",
    lastVisit: "2026-03-25",
  },
];

const Patients = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  return (
    <Layout>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="text.primary" fontWeight="bold">
          Patient Details
        </Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, v) => v && setView(v)}
          aria-label="view toggle"
        >
          <ToggleButton value="grid">
            <ViewModule />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewList />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {view === "grid" ? (
        <Grid container spacing={3}>
          {mockPatients.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <Card elevation={2} sx={{ borderRadius: 2 }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      margin: "0 auto 16px",
                      bgcolor: "primary.light",
                    }}
                  >
                    {p.name[0]}
                  </Avatar>
                  <Typography variant="h6">{p.name}</Typography>
                  <Typography color="textSecondary">{p.condition}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Age: {p.age}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/patients/${p.id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{ borderRadius: 2 }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#fafafa" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Condition</TableCell>
                <TableCell>Last Visit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPatients.map((p) => (
                <TableRow
                  key={p.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/patients/${p.id}`)}
                >
                  <TableCell sx={{ fontWeight: "medium" }}>{p.name}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.condition}</TableCell>
                  <TableCell>{p.lastVisit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Layout>
  );
};

export default Patients;
