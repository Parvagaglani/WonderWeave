import React from "react";
import { subjects } from "../utils/constants";
import { Box, Typography, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const Feed = () => {
  return (
    <Box sx={{ width: "100%", pb: 4 }}>
      {/* Friendly Edutainment Header Banner */}
      <Box textAlign="center" mb={3} color="#fff">
        <Typography variant="h4" fontWeight="800" sx={{ textShadow: "1px 2px 4px rgba(0,0,0,0.3)" }}>
          WonderWeave 🪄
        </Typography>
        <Typography variant="subtitle1" fontWeight="500" sx={{ opacity: 0.95, mt: 0.5 }}>
          Pick an edutainment adventure below to weave fun stories, explore facts & play quizzes!
        </Typography>
      </Box>

      {/* Grid of Subject Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          width: "100%",
          borderRadius: 3,
          backgroundColor: "rgb(28, 74, 227)",
          p: { xs: 2, md: 3 },
          boxShadow: 3,
        }}
      >
        {subjects.map((subject, idx) => (
          <Box
            key={idx}
            sx={{
              width: { xs: "100%", sm: "280px", md: "300px" },
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: 3,
              backgroundColor: "#1e1e1e",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px) scale(1.03)",
                boxShadow: 6,
              },
            }}
          >
            <Link to={subject.path || `/${subject.name}`} style={{ display: "block" }}>
              <CardMedia
                component="img"
                height="190px"
                image={subject.image}
                alt={subject.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  backgroundColor: "#1e1e1e",
                  p: 2,
                  textAlign: "center",
                  minHeight: "80px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="#fff">
                  {subject.name}
                </Typography>
                {subject.description && (
                  <Typography variant="caption" color="#bbb" mt={0.5}>
                    {subject.description}
                  </Typography>
                )}
              </CardContent>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Feed;
