import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1565c0" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo & Title */}
          <Box display="flex" alignItems="center">
            <AutoStoriesIcon sx={{ mr: 1.5, color: "#ffca28" }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontFamily: "Roboto",
                fontWeight: 800,
                color: "#fff",
                textDecoration: "none",
                letterSpacing: "0.5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              WonderWeave
            </Typography>
          </Box>

          {/* Navigation & Mode */}
          <Box display="flex" alignItems="center" gap={1.5}>
            {location.pathname !== "/" && (
              <Button
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                All Subjects
              </Button>
            )}
            <Chip
              label="🌟 Kid Explorer"
              size="small"
              sx={{
                backgroundColor: "#ffca28",
                color: "#1e1e1e",
                fontWeight: "bold",
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
