import { Box, Typography, Grid, Paper, useTheme } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import Layout from "../components/Layout";

const trendData = [
  { name: "Jan", admissions: 400, discharges: 240 },
  { name: "Feb", admissions: 300, discharges: 139 },
  { name: "Mar", admissions: 200, discharges: 980 },
  { name: "Apr", admissions: 278, discharges: 390 },
  { name: "May", admissions: 189, discharges: 480 },
];

const deptData = [
  { name: "Cardiology", value: 400 },
  { name: "Neurology", value: 300 },
  { name: "Pediatrics", value: 300 },
  { name: "General", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Analytics = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" color="text.primary" fontWeight="bold">
          Healthcare Analytics
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Real-time monitoring of hospital performance metrics.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2, height: 400 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Patient Admissions vs Discharges
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="admissions"
                  stroke={theme.palette.primary.main}
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="discharges"
                  stroke={theme.palette.secondary.main}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, height: 400 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Patient Distribution by Dept
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={deptData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {deptData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2, height: 400 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Weekly Patient Volume
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: "No. of Patients",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Legend verticalAlign="top" align="right" />
                <Bar
                  name="Total Admissions"
                  dataKey="admissions"
                  fill="#1976d2"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name="Scheduled Visits"
                  dataKey="discharges"
                  fill="#2e7d32"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Analytics;
