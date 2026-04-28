import { Box, Grid, Paper, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        xs={12}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", sm: "block" },
        }}
      />

      {/* Right side login form */}
      <Grid
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Welcome Back
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Please enter your credentials to access the medical portal.
          </Typography>

          <LoginForm />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
