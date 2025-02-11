import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const primaryColor = "#1a237e"; // Primary color for the theme

  const actionCards = [
    {
      title: "New Case",
      description: "Report a new homeless person case",
      icon: <AddIcon sx={{ fontSize: 40 }} />,
      action: () => navigate("/newcase"),
      color: primaryColor,
    },
    {
      title: "Search Cases",
      description: "Search and view existing cases",
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      action: () => navigate("/cases/search"),
      color: primaryColor,
    },
    {
      title: "Follow-ups",
      description: "View and manage case follow-ups",
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      action: () => navigate("/followups"),
      color: primaryColor,
    },
    {
      title: "Dashboard",
      description: "View statistics and reports",
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      action: () => navigate("/dashboard"),
      color: primaryColor,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4, display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Stack spacing={1} sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${primaryColor} 30%, #0d47a1 90%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SELF
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Serving Every Last Forsaken
            </Typography>
          </Stack>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {actionCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    },
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "rgba(26, 35, 126, 0.1)",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                    <Box
                      sx={{
                        bgcolor: `${card.color}15`,
                        borderRadius: "50%",
                        width: 80,
                        height: 80,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Box sx={{ color: card.color }}>{card.icon}</Box>
                    </Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: card.color,
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                    <Button
                      variant="contained"
                      onClick={card.action}
                      sx={{
                        bgcolor: card.color,
                        px: 4,
                        py: 1,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          bgcolor: card.color,
                          filter: "brightness(0.9)",
                          transform: "scale(1.02)",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      {card.title}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: primaryColor,
                fontWeight: 600,
                mb: 3,
              }}
            >
              Recent Activities
            </Typography>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                border: `1px solid rgba(26, 35, 126, 0.1)`,
                p: 3,
                minHeight: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">
                No recent activities to display
              </Typography>
            </Card>
          </Box>
        </Box>

        {/* Profile Icon */}
        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": {
              boxShadow: 3,
            },
          }}
          onClick={() => navigate("/profile")}
        >
          <PersonIcon sx={{ color: primaryColor }} />
        </IconButton>
      </Box>
    </Container>
  );
};

export default HomePage;
