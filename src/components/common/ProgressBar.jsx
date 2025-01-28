import React from "react";
import { LinearProgress, Box, Fade } from "@mui/material";
import { useLocation } from "react-router-dom";

const ProgressBar = () => {
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Progress bar will disappear after 1 second

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <Fade in={loading}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
        }}
      >
        <LinearProgress
          sx={{
            height: 3,
            backgroundColor: "#e3f2fd",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1a237e",
            },
          }}
        />
      </Box>
    </Fade>
  );
};

export default ProgressBar;
