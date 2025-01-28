import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  IconButton,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  FormControl,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: "",
    dob: "",
    email: "",
    phone: "",

    // Additional Information
    preferredLanguage: "",
    areaOfOperation: "",
    availability: {
      startTime: null,
      endTime: null,
      days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
    },
    reference: "",
  });

  const languageOptions = [
    "English",
    "Tamil",
    "Hindi",
    "Telugu",
    "Malayalam",
    "Kannada",
  ];

  const areaOptions = [
    "Anna Nagar",
    "T Nagar",
    "Adyar",
    "Velachery",
    "Tambaram",
    "Porur",
    "Mylapore",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [type]: value,
      },
    }));
  };

  const handleDayChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: {
          ...prev.availability.days,
          [day]: !prev.availability.days[day],
        },
      },
    }));
  };

  const validateStep = () => {
    if (activeStep === 0) {
      return (
        formData.fullName && formData.dob && formData.email && formData.phone
      );
    }
    if (activeStep === 1) {
      const isTimeValid =
        formData.availability.startTime &&
        formData.availability.endTime &&
        formData.availability.startTime < formData.availability.endTime;

      const hasSelectedDays = Object.values(formData.availability.days).some(
        (day) => day
      );

      return (
        formData.preferredLanguage &&
        formData.areaOfOperation &&
        isTimeValid &&
        hasSelectedDays
      );
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === 1) {
        console.log("Preparing to send OTP to:", formData.phone);
      }
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: "#1a237e", mb: 3, fontWeight: 500 }}
            >
              Basic Information
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#1a237e" },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="dob"
              label="Date of Birth"
              type="date"
              InputLabelProps={{
                shrink: true,
                sx: { color: "#1a237e" },
              }}
              inputProps={{
                placeholder: "MM-DD-YYYY",
                sx: { textTransform: "uppercase" },
              }}
              value={formData.dob}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#1a237e" },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#1a237e" },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#1a237e" },
                },
              }}
            />
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: "#1a237e", mb: 3, fontWeight: 500 }}
            >
              Additional Details
            </Typography>
            <TextField
              select
              margin="normal"
              required
              fullWidth
              name="preferredLanguage"
              label="Preferred Language"
              value={formData.preferredLanguage}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#1a237e" },
                },
              }}
            >
              {languageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              margin="normal"
              required
              fullWidth
              name="areaOfOperation"
              label="Area of Operation"
              value={formData.areaOfOperation}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#1a237e" },
                },
              }}
            >
              {areaOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
              <FormLabel component="legend" sx={{ color: "#1a237e", mb: 1 }}>
                Availability
              </FormLabel>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TimePicker
                    label="Start Time"
                    value={formData.availability.startTime}
                    onChange={(newValue) =>
                      handleAvailabilityChange("startTime", newValue)
                    }
                    format="hh:mm A"
                    ampm={true}
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#1a237e" },
                      },
                      "& .MuiInputBase-input": {
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontWeight: "500",
                      },
                    }}
                    slotProps={{
                      textField: {
                        inputProps: {
                          style: { textTransform: "uppercase" },
                        },
                        placeholder: "HH:MM AM",
                      },
                    }}
                  />
                  <TimePicker
                    label="End Time"
                    value={formData.availability.endTime}
                    onChange={(newValue) =>
                      handleAvailabilityChange("endTime", newValue)
                    }
                    format="hh:mm A"
                    ampm={true}
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#1a237e" },
                      },
                      "& .MuiInputBase-input": {
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontWeight: "500",
                      },
                    }}
                    slotProps={{
                      textField: {
                        inputProps: {
                          style: { textTransform: "uppercase" },
                        },
                        placeholder: "HH:MM AM",
                      },
                    }}
                  />
                </Box>
              </LocalizationProvider>

              <Typography
                variant="caption"
                sx={{
                  color: "#666",
                  mb: 2,
                  display: "block",
                  textAlign: "center",
                }}
              >
                12-HOUR FORMAT (HH:MM AM/PM)
              </Typography>

              <FormLabel
                component="legend"
                sx={{ color: "#1a237e", mt: 2, mb: 1 }}
              >
                Available Days
              </FormLabel>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 1,
                }}
              >
                {[
                  { key: "monday", label: "Monday" },
                  { key: "tuesday", label: "Tuesday" },
                  { key: "wednesday", label: "Wednesday" },
                  { key: "thursday", label: "Thursday" },
                  { key: "friday", label: "Friday" },
                  { key: "saturday", label: "Saturday" },
                  { key: "sunday", label: "Sunday" },
                ].map(({ key, label }) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={formData.availability.days[key]}
                        onChange={() => handleDayChange(key)}
                        sx={{
                          color: "#1a237e",
                          "&.Mui-checked": {
                            color: "#1a237e",
                          },
                        }}
                      />
                    }
                    label={label}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                ))}
              </Box>

              {/* Quick select buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 2,
                  justifyContent: "center",
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    const weekdays = [
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                    ];
                    const newDays = { ...formData.availability.days };
                    weekdays.forEach((day) => (newDays[day] = true));
                    ["saturday", "sunday"].forEach(
                      (day) => (newDays[day] = false)
                    );
                    handleAvailabilityChange("days", newDays);
                  }}
                  sx={{
                    borderColor: "#1a237e",
                    color: "#1a237e",
                    "&:hover": {
                      borderColor: "#000051",
                      backgroundColor: "rgba(26, 35, 126, 0.04)",
                    },
                  }}
                >
                  Select Weekdays
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    const newDays = { ...formData.availability.days };
                    [
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                    ].forEach((day) => (newDays[day] = false));
                    ["saturday", "sunday"].forEach(
                      (day) => (newDays[day] = true)
                    );
                    handleAvailabilityChange("days", newDays);
                  }}
                  sx={{
                    borderColor: "#1a237e",
                    color: "#1a237e",
                    "&:hover": {
                      borderColor: "#000051",
                      backgroundColor: "rgba(26, 35, 126, 0.04)",
                    },
                  }}
                >
                  Select Weekend
                </Button>
              </Box>
            </FormControl>

            <TextField
              margin="normal"
              fullWidth
              name="reference"
              label="Reference (Optional)"
              placeholder="How did you hear about us?"
              value={formData.reference}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#1a237e" },
                },
              }}
            />
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" align="center" gutterBottom>
              Verify Your Phone Number
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 2 }}>
              We've sent a verification code to {formData.phone}
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="otp"
              label="Enter OTP"
              type="text"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#1a237e" },
                },
              }}
            />
          </Box>
        );

      case 3:
        return (
          <Box sx={{ textAlign: "center" }}>
            <VolunteerActivismIcon
              sx={{
                color: "#1a237e",
                fontSize: 60,
                mb: 2,
                animation: "bounce 1s infinite",
                "@keyframes bounce": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" },
                },
              }}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "#1a237e", fontWeight: 500 }}
            >
              Welcome to SELF! 🎉
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your account has been created successfully.
            </Typography>
            <Button
              onClick={() => navigate("/login")}
              variant="contained"
              sx={{
                bgcolor: "#1a237e",
                height: "48px",
                "&:hover": { bgcolor: "#000051" },
              }}
            >
              Proceed to Login
            </Button>
          </Box>
        );

      default:
        return null;
    }
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
                "0%": { transform: "scale(1)", opacity: 1 },
                "50%": { transform: "scale(1.1)", opacity: 0.7 },
                "100%": { transform: "scale(1)", opacity: 1 },
              },
            }}
          />
          <Typography
            component="h1"
            variant="h4"
            sx={{ color: "#1a237e", fontWeight: "bold" }}
          >
            SELF
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ color: "#1a237e", mb: 4, fontStyle: "italic" }}
        >
          Serving Every Last Forsaken
        </Typography>

        {/* Modern Stepper */}
        <Box sx={{ width: "100%", mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
          >
            {["Info", "Details", "Verify", "Done"].map((label, index) => (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor:
                      index <= activeStep ? "#1a237e" : "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    mb: 1,
                  }}
                >
                  {index + 1}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: index <= activeStep ? "#1a237e" : "#757575",
                    fontWeight: index === activeStep ? "bold" : "normal",
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
            {/* Progress line */}
            <Box
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                right: 16,
                height: 2,
                backgroundColor: "#e0e0e0",
                zIndex: 0,
              }}
            >
              <Box
                sx={{
                  width: `${(activeStep / 3) * 100}%`,
                  height: "100%",
                  backgroundColor: "#1a237e",
                  transition: "width 0.3s ease",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: 2,
            position: "relative",
          }}
        >
          {activeStep > 0 && activeStep < 3 && (
            <IconButton
              onClick={handleBack}
              sx={{
                position: "absolute",
                left: 16,
                top: 16,
                color: "#1a237e",
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          {renderStepContent(activeStep)}

          {activeStep < 3 && (
            <Button
              fullWidth
              variant="contained"
              onClick={handleNext}
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#1a237e",
                height: "48px",
                fontSize: "1.1rem",
                "&:hover": { bgcolor: "#000051" },
              }}
            >
              {activeStep === 2 ? "Verify" : "Continue"}
            </Button>
          )}

          {activeStep !== 3 && (
            <Box textAlign="center">
              <Link
                onClick={() => navigate("/login")}
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
                Already have an account? Sign In
              </Link>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
