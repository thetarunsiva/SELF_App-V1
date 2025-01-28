import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
        }}
      >
        {/* Title Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
          <VolunteerActivismIcon
            sx={{
              color: "#1a237e",
              fontSize: 40,
              animation: "pulse 1.5s infinite",
              "@keyframes pulse": {
                "0%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
                "50%": {
                  transform: "scale(1.1)",
                  opacity: 0.7,
                },
                "100%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
              },
            }}
          />
          <Typography
            component="h1"
            variant="h4"
            sx={{
              color: "#1a237e",
              fontWeight: "bold",
            }}
          >
            SELF
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#1a237e",
            mb: 4,
            fontStyle: "italic",
          }}
        >
          Serving Every Last Forsaken
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: 2,
          }}
        >
          <Typography
            component="h2"
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              color: "#1a237e",
              mb: 3,
              fontWeight: 500,
            }}
          >
            Welcome Back
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1a237e",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1a237e",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1a237e",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1a237e",
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#1a237e",
                height: "48px",
                fontSize: "1.1rem",
                "&:hover": {
                  bgcolor: "#000051",
                },
              }}
            >
              Sign In
            </Button>
            <Box textAlign="center">
              <Link
                onClick={handleRegisterClick}
                variant="body2"
                sx={{
                  color: "#1a237e",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
