import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        opacity: 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <VolunteerActivismIcon
        sx={{
          color: "#1a237e",
          fontSize: 60,
          mb: 2,
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
        variant="h5"
        sx={{
          color: "#1a237e",
          mb: 3,
          fontWeight: "bold",
        }}
      >
        SELF
      </Typography>
      <CircularProgress
        variant="determinate"
        value={progress}
        size={50}
        thickness={4}
        sx={{
          color: "#1a237e",
          mb: 2,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: "#1a237e",
          opacity: 0.8,
        }}
      >
        {progress === 100 ? "Ready!" : "Loading..."}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
