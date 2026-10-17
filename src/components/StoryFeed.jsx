import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  Menu,
  MenuItem,
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  Select,
  Slider,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import fetchFromApi from "../utils/fetchFromApi";
import {
  speakText,
  pauseSpeech,
  resumeSpeech,
  stopSpeech,
  getAvailableVoices,
} from "../utils/textToSpeech";

const StoryFeed = ({
  category = "Animal Kingdom",
  bgImage = "",
  items = [],
  itemLabel = "Topics",
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [ageGroup, setAgeGroup] = useState("6-8 years");
  const [tone, setTone] = useState("Fun & Adventurous");
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Audio & Speech States
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [pitch, setPitch] = useState(1.1);
  const [rate, setRate] = useState(1.0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    const loadVoices = () => {
      const v = getAvailableVoices();
      if (v.length > 0) setVoices(v);
    };
    loadVoices();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      stopSpeech();
    };
  }, []);

  const handleItemToggle = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else if (selectedItems.length < 3) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleGenerateStory = async () => {
    if (cooldown > 0) return;
    if (selectedItems.length === 0) {
      alert(`✨ Pick at least one ${itemLabel.toLowerCase()} on the left to start weaving your magical tale!`);
      return;
    }
    stopSpeech();
    setIsSpeaking(false);
    setIsLoading(true);

    try {
      const result = await fetchFromApi({
        category,
        items: selectedItems,
        ageGroup,
        tone,
      });
      setResponseText(result);
      setCooldown(5); // 5-second cooldown guardrail
    } catch (err) {
      setResponseText(`✨ ${err.message || "Oops! Our magic quill slipped. Let's try again!"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartSpeaking = () => {
    if (!responseText || responseText.startsWith("⚠️ Error")) return;
    const selectedVoice = voices[selectedVoiceIndex] || null;
    speakText(
      responseText,
      { voice: selectedVoice, pitch, rate },
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleStopSpeaking = () => {
    stopSpeech();
    setIsSpeaking(false);
  };

  return (
    <Stack
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("${bgImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "88vh",
        borderRadius: 3,
        p: { xs: 2, md: 3 },
        color: "#fff",
      }}
    >
      {/* Top Bar with Navigation */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ backgroundColor: "rgba(0,0,0,0.6)", "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" } }}
          onClick={handleStopSpeaking}
        >
          ← Back to Subjects
        </Button>
        <Typography variant="h5" fontWeight="bold" sx={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}>
          {category}
        </Typography>
      </Box>

      {/* Main Content Area */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ flexGrow: 1 }}>
        {/* Controls Column */}
        <Box
          sx={{
            width: { xs: "100%", md: "320px" },
            backgroundColor: "rgba(20, 20, 30, 0.85)",
            backdropFilter: "blur(8px)",
            borderRadius: 3,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" color="#ffca28">
            1. Pick up to 3 {itemLabel}:
          </Typography>

          <Button
            variant="outlined"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ color: "#fff", borderColor: "#ffca28" }}
          >
            {selectedItems.length > 0 ? `Selected (${selectedItems.length}/3)` : `Choose ${itemLabel}`}
          </Button>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            {items.map((item) => (
              <MenuItem key={item} onClick={() => handleItemToggle(item)}>
                <Checkbox checked={selectedItems.includes(item)} />
                {item}
              </MenuItem>
            ))}
          </Menu>

          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {selectedItems.map((item) => (
              <Chip
                key={item}
                label={item}
                onDelete={() => handleItemToggle(item)}
                size="small"
                sx={{ backgroundColor: "#ffca28", color: "#000", fontWeight: "bold" }}
              />
            ))}
          </Box>

          <Typography variant="subtitle1" fontWeight="bold" color="#ffca28" mt={1}>
            2. Customize Story:
          </Typography>

          <FormControl size="small" fullWidth>
            <InputLabel sx={{ color: "#ccc" }}>Age Group</InputLabel>
            <Select
              value={ageGroup}
              label="Age Group"
              onChange={(e) => setAgeGroup(e.target.value)}
              sx={{ color: "#fff", ".MuiOutlinedInput-notchedOutline": { borderColor: "#666" } }}
            >
              <MenuItem value="3-5 years">Preschool (Ages 3-5)</MenuItem>
              <MenuItem value="6-8 years">Early Reader (Ages 6-8)</MenuItem>
              <MenuItem value="9-12 years">Explorer (Ages 9-12)</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel sx={{ color: "#ccc" }}>Story Tone</InputLabel>
            <Select
              value={tone}
              label="Story Tone"
              onChange={(e) => setTone(e.target.value)}
              sx={{ color: "#fff", ".MuiOutlinedInput-notchedOutline": { borderColor: "#666" } }}
            >
              <MenuItem value="Fun & Adventurous">🏕️ Fun & Adventurous</MenuItem>
              <MenuItem value="Bedtime & Calm">🌙 Bedtime & Calm</MenuItem>
              <MenuItem value="Humorous & Silly">🤪 Humorous & Silly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={handleGenerateStory}
            disabled={isLoading || cooldown > 0}
            sx={{ mt: 1, fontWeight: "bold" }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : cooldown > 0 ? (
              `⏳ Wait (${cooldown}s)`
            ) : (
              "🪄 Weave Story"
            )}
          </Button>
        </Box>

        {/* Story Display & Audio Controls Column */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: 3,
          }}
        >
          {/* Story Content Area */}
          <Box sx={{ minHeight: "220px" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Typography variant="h6" fontWeight="bold" color="#90caf9">
                📖 Tale & Fun Facts:
              </Typography>
              {isSpeaking && (
                <Box display="flex" alignItems="center" bgcolor="rgba(255,235,59,0.2)" px={1.5} py={0.5} borderRadius={2}>
                  <Typography variant="caption" color="#ffeb3b" fontWeight="bold" mr={1}>
                    Narrating...
                  </Typography>
                  <span className="soundwave-bar" />
                  <span className="soundwave-bar" />
                  <span className="soundwave-bar" />
                  <span className="soundwave-bar" />
                </Box>
              )}
            </Box>

            <Box
              sx={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderRadius: 2,
                p: 2.5,
                minHeight: "160px",
                maxHeight: "300px",
                overflowY: "auto",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {isLoading ? (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="150px">
                  <CircularProgress color="warning" />
                  <Typography variant="body2" color="#ccc" mt={2}>
                    Weaving a magical educational story with fun facts...
                  </Typography>
                </Box>
              ) : responseText ? (
                <Typography variant="body1" sx={{ whiteSpace: "pre-line", lineHeight: 1.8, fontSize: "1.05rem" }}>
                  {responseText}
                </Typography>
              ) : (
                <Typography variant="body2" color="#aaa" fontStyle="italic">
                  Select your {itemLabel.toLowerCase()} on the left, customize your options, and click "Weave Story" to start your learning adventure!
                </Typography>
              )}
            </Box>
          </Box>

          {/* Audio Controls */}
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {/* Audio Settings Row */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
              {voices.length > 0 && (
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel sx={{ color: "#aaa" }}>Voice</InputLabel>
                  <Select
                    value={selectedVoiceIndex}
                    label="Voice"
                    onChange={(e) => setSelectedVoiceIndex(e.target.value)}
                    sx={{ color: "#fff", ".MuiOutlinedInput-notchedOutline": { borderColor: "#555" } }}
                  >
                    {voices.map((v, idx) => (
                      <MenuItem key={idx} value={idx}>
                        {v.name.slice(0, 22)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <Box sx={{ width: 120 }}>
                <Typography variant="caption" color="#aaa">Speed: {rate}x</Typography>
                <Slider
                  size="small"
                  value={rate}
                  min={0.7}
                  max={1.3}
                  step={0.1}
                  onChange={(e, val) => setRate(val)}
                  sx={{ color: "#ffca28" }}
                />
              </Box>

              <Box sx={{ width: 120 }}>
                <Typography variant="caption" color="#aaa">Pitch: {pitch}</Typography>
                <Slider
                  size="small"
                  value={pitch}
                  min={0.8}
                  max={1.4}
                  step={0.1}
                  onChange={(e, val) => setPitch(val)}
                  sx={{ color: "#ffca28" }}
                />
              </Box>
            </Stack>

            {/* Speech Action Buttons */}
            <Stack direction="row" spacing={1.5} flexWrap="wrap">
              <Button
                variant="contained"
                color="primary"
                onClick={handleStartSpeaking}
                disabled={!responseText || responseText.startsWith("⚠️ Error")}
              >
                🔊 Read Aloud
              </Button>
              <Button variant="outlined" sx={{ color: "#fff", borderColor: "#777" }} onClick={pauseSpeech}>
                ⏸️ Pause
              </Button>
              <Button variant="outlined" sx={{ color: "#fff", borderColor: "#777" }} onClick={resumeSpeech}>
                ▶️ Resume
              </Button>
              <Button variant="outlined" color="error" onClick={handleStopSpeaking}>
                ⏹️ Stop
              </Button>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default StoryFeed;
