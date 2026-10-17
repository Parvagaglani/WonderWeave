import React from "react";
import {
  AnimalFeed,
  Feed,
  Navbar,
  ScienceFeed,
  SpaceFeed,
  WorldFeed,
  HealthFeed,
  TechnologyFeed,
} from "./components";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Stack px={{ xs: 2, md: 4 }} mt={2} pb={4}>
        <Box>
          <Routes>
            <Route path="/" element={<Feed />} />

            {/* Standard Clean Routes */}
            <Route path="/animals" element={<AnimalFeed />} />
            <Route path="/science" element={<ScienceFeed />} />
            <Route path="/space" element={<SpaceFeed />} />
            <Route path="/world" element={<WorldFeed />} />
            <Route path="/health" element={<HealthFeed />} />
            <Route path="/technology" element={<TechnologyFeed />} />

            {/* Backward-Compatible Hackathon Routes */}
            <Route path="/Animal Kingdom" element={<Navigate to="/animals" replace />} />
            <Route path="/Science" element={<Navigate to="/science" replace />} />
            <Route path="/Space & Universe" element={<Navigate to="/space" replace />} />
            <Route path="/Our World" element={<Navigate to="/world" replace />} />
            <Route path="/Health & Hygiene" element={<Navigate to="/health" replace />} />
            <Route path="/Technology & Innovation" element={<Navigate to="/technology" replace />} />
            <Route path="/tech" element={<Navigate to="/technology" replace />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Stack>
    </BrowserRouter>
  );
}

export default App;
