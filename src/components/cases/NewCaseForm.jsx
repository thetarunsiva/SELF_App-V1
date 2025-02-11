import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Chip,
  Autocomplete,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  PhotoCamera as PhotoCameraIcon,
  MyLocation as MyLocationIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

const NewCaseForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    approximateAge: "",
    gender: "",
    location: "",
    landmark: "",
    coordinates: { lat: "", lng: "" },

    // Physical Details
    height: "",
    physicalDescription: "",
    identifyingMarks: "",
    apparentIllnesses: [],

    // Current Status
    mentalState: "",
    physicalState: "",
    immediateNeeds: [],
    currentSituation: "",

    // Additional Information
    languagesSpoken: [],
    belongings: "",
    documents: [],

    // Action Plan
    suggestedAction: "",
    shelterPreference: "",
    followUpDate: null,

    // Media
    photos: [],

    // Administrative
    reportedBy: "",
    reportDate: new Date(),
    status: "new",
  });

  const steps = [
    "Basic Info",
    "Physical Details",
    "Current Status",
    "Action Plan",
  ];
  const mentalStates = [
    "Coherent",
    "Confused",
    "Aggressive",
    "Withdrawn",
    "Cannot Assess",
  ];
  const physicalStates = [
    "Healthy",
    "Needs Medical Attention",
    "Critical",
    "Disabled",
    "Injured",
  ];
  const commonNeeds = [
    "Food",
    "Water",
    "Medical Care",
    "Clothing",
    "Shelter",
    "Mental Health Support",
    "Documentation",
  ];
  const commonLanguages = [
    "Tamil",
    "English",
    "Hindi",
    "Telugu",
    "Malayalam",
    "Kannada",
    "Urdu",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  const handleLocationCapture = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        });

        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                "Accept-Language": "en",
              },
            }
          );

          if (response.data) {
            const address = response.data.display_name;
            setFormData((prev) => ({
              ...prev,
              location: address,
              coordinates: { lat: latitude, lng: longitude },
              landmark:
                response.data.address.road ||
                response.data.address.suburb ||
                "",
            }));
            setSuccess("Location captured successfully!");
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          setFormData((prev) => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            coordinates: { lat: latitude, lng: longitude },
            landmark: "Location coordinates captured",
          }));
          setSuccess("Coordinates captured successfully!");
        }
      } catch (error) {
        if (error.code === 1) {
          setError("Location access denied. Please enable location services.");
        } else if (error.code === 2) {
          setError("Location information unavailable. Please try again.");
        } else if (error.code === 3) {
          setError("Location request timed out. Please try again.");
        } else {
          setError("Could not capture location. Please enter manually.");
        }
      }
    } else {
      setError("Geolocation is not supported by your browser");
    }
    setIsLoading(false);
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return formData.name && formData.location;
      case 1:
        return formData.physicalDescription;
      case 2:
        return formData.mentalState && formData.physicalState;
      case 3:
        return formData.suggestedAction;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
      setError("");
    } else {
      setError("Please fill in all required fields");
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // API call would go here
      console.log("Submitting form:", formData);
      setSuccess("Case submitted successfully!");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      setError("Failed to submit form. Please try again.");
    }
    setIsLoading(false);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              required
              fullWidth
              name="name"
              label="Name/Identifier"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="approximateAge"
                  label="Approximate Age"
                  type="number"
                  value={formData.approximateAge}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset" margin="normal">
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <TextField
              required
              fullWidth
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleChange}
              margin="normal"
            />

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <TextField
                fullWidth
                name="landmark"
                label="Nearest Landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
              <Button
                variant="outlined"
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <MyLocationIcon />
                  )
                }
                onClick={handleLocationCapture}
                disabled={isLoading}
                sx={{
                  minWidth: "180px",
                  color: "#1a237e",
                  borderColor: "#1a237e",
                  "&:hover": {
                    borderColor: "#000051",
                    bgcolor: "rgba(26, 35, 126, 0.04)",
                  },
                }}
              >
                {isLoading ? "Capturing..." : "Capture Location"}
              </Button>
            </Box>

            {formData.coordinates.lat && formData.coordinates.lng && (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ mt: 1, display: "block" }}
              >
                Coordinates: {formData.coordinates.lat.toFixed(6)},{" "}
                {formData.coordinates.lng.toFixed(6)}
              </Typography>
            )}
          </Box>
        );

      case 1:
        return (
          <Box>
            <TextField
              required
              fullWidth
              multiline
              rows={3}
              name="physicalDescription"
              label="Physical Description"
              value={formData.physicalDescription}
              onChange={handleChange}
              margin="normal"
              helperText="Include details about appearance, clothing, etc."
            />

            <TextField
              fullWidth
              name="identifyingMarks"
              label="Identifying Marks"
              value={formData.identifyingMarks}
              onChange={handleChange}
              margin="normal"
              helperText="Scars, tattoos, birthmarks, etc."
            />

            <Box sx={{ mt: 2 }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="photo-upload"
                multiple
                type="file"
                onChange={handlePhotoUpload}
              />
              <label htmlFor="photo-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCameraIcon />}
                  sx={{
                    color: "#1a237e",
                    borderColor: "#1a237e",
                    "&:hover": {
                      borderColor: "#000051",
                      bgcolor: "rgba(26, 35, 126, 0.04)",
                    },
                  }}
                >
                  Add Photos
                </Button>
              </label>
              {formData.photos.length > 0 && (
                <Typography variant="caption" sx={{ ml: 2 }}>
                  {formData.photos.length} photos selected
                </Typography>
              )}
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <TextField
              required
              select
              fullWidth
              name="mentalState"
              label="Mental State"
              value={formData.mentalState}
              onChange={handleChange}
              margin="normal"
            >
              {mentalStates.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              select
              fullWidth
              name="physicalState"
              label="Physical State"
              value={formData.physicalState}
              onChange={handleChange}
              margin="normal"
            >
              {physicalStates.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <Autocomplete
              multiple
              options={commonNeeds}
              value={formData.immediateNeeds}
              onChange={(event, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  immediateNeeds: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Immediate Needs"
                  margin="normal"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    sx={{ bgcolor: "#1a237e", color: "white" }}
                  />
                ))
              }
            />

            <Autocomplete
              multiple
              options={commonLanguages}
              value={formData.languagesSpoken}
              onChange={(event, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  languagesSpoken: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Languages Spoken"
                  margin="normal"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    sx={{ bgcolor: "#1a237e", color: "white" }}
                  />
                ))
              }
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              name="currentSituation"
              label="Current Situation"
              value={formData.currentSituation}
              onChange={handleChange}
              margin="normal"
              helperText="Any additional details about the current situation"
            />
          </Box>
        );

      case 3:
        return (
          <Box>
            <TextField
              required
              select
              fullWidth
              name="suggestedAction"
              label="Suggested Action"
              value={formData.suggestedAction}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="immediate">Immediate Intervention</MenuItem>
              <MenuItem value="scheduled">Scheduled Follow-up</MenuItem>
              <MenuItem value="monitor">Monitor Situation</MenuItem>
            </TextField>

            <TextField
              select
              fullWidth
              name="shelterPreference"
              label="Shelter Preference"
              value={formData.shelterPreference}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="emergency">Emergency Shelter</MenuItem>
              <MenuItem value="longTerm">Long-term Shelter</MenuItem>
              <MenuItem value="medical">Medical Facility</MenuItem>
            </TextField>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Follow-up Date"
                value={formData.followUpDate}
                onChange={(newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    followUpDate: newValue,
                  }));
                }}
                sx={{ width: "100%", mt: 2 }}
              />
            </LocalizationProvider>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <IconButton
              onClick={() => navigate("/home")}
              sx={{ mr: 2, color: "#1a237e" }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" sx={{ color: "#1a237e", fontWeight: 500 }}>
              New Case Report
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  color: "#1a237e",
                  "&:hover": {
                    bgcolor: "rgba(26, 35, 126, 0.04)",
                  },
                }}
              >
                Back
              </Button>
              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      bgcolor: "#1a237e",
                      "&:hover": { bgcolor: "#000051" },
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Submit Case"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      bgcolor: "#1a237e",
                      "&:hover": { bgcolor: "#000051" },
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default NewCaseForm;
