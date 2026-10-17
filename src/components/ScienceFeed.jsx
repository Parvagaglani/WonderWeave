import React, { useState } from "react";
import { Typography, Button, Stack, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const questions = [
  {
    number: 1,
    text: "Science uses observation! Which sense do we use to smell fresh flowers?",
    options: ["Eyes", "Nose", "Ears", "Hands"],
    correct: "Nose",
    explanation: "Our nose has millions of tiny scent receptors that send smell signals to our brain!",
  },
  {
    number: 2,
    text: "Water can change states! What happens to ice when it gets warm outside?",
    options: [
      "It turns red.",
      "It melts into water.",
      "It grows bigger.",
      "It disappears instantly.",
    ],
    correct: "It melts into water.",
    explanation: "Heat gives energy to the solid ice molecules, allowing them to flow freely as liquid water!",
  },
  {
    number: 3,
    text: "Plants need energy to grow! What helps a flower grow tall and healthy?",
    options: ["Loud music", "Sunshine & Water", "Candy", "Plastic toys"],
    correct: "Sunshine & Water",
    explanation: "Plants use sunlight and water in a process called photosynthesis to make their own food!",
  },
  {
    number: 4,
    text: "What invisible force pulls things down toward Earth so we don't float into space?",
    options: ["Gravity", "Wind Power", "Heavy Shoes", "Magnetic Clouds"],
    correct: "Gravity",
    explanation: "Gravity is the natural attraction between masses that keeps Earth orbiting the Sun and our feet on the ground!",
  },
];

const ScienceFeed = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (opt) => {
    if (selectedOption !== null) return; // Prevent multiple clicks on same question
    setSelectedOption(opt);
    if (opt === currentQ.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <Stack
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://i.pinimg.com/736x/6a/92/c9/6a92c9ed666d4df954c16e7d47eadc78.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "88vh",
        borderRadius: 3,
        p: { xs: 2, md: 4 },
        color: "#fff",
      }}
    >
      {/* Header Navigation */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ backgroundColor: "rgba(0,0,0,0.6)", "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" } }}
        >
          ← Back to Subjects
        </Button>
        <Typography variant="h5" fontWeight="bold">
          🔬 Science Discovery Quiz
        </Typography>
      </Box>

      {/* Main Quiz Box */}
      <Box
        sx={{
          maxWidth: "800px",
          width: "100%",
          mx: "auto",
          backgroundColor: "rgba(18, 24, 38, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: 3,
          p: { xs: 2.5, md: 4 },
          boxShadow: 4,
        }}
      >
        {!isFinished ? (
          <>
            {/* Question Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="overline" color="#ffca28" fontSize="1rem" fontWeight="bold">
                Question {currentQ.number} of {questions.length}
              </Typography>
              <Typography variant="subtitle2" color="#90caf9">
                Score: {score} ⭐
              </Typography>
            </Box>

            <Typography variant="h5" fontWeight="bold" mb={3} lineHeight={1.4}>
              {currentQ.text}
            </Typography>

            {/* Answer Options Grid */}
            <Grid container spacing={2}>
              {currentQ.options.map((opt, i) => {
                let btnColor = "primary";
                let variant = "outlined";
                let bgColor = "rgba(255,255,255,0.05)";

                if (selectedOption) {
                  if (opt === currentQ.correct) {
                    btnColor = "success";
                    variant = "contained";
                    bgColor = "#2e7d32";
                  } else if (opt === selectedOption) {
                    btnColor = "error";
                    variant = "contained";
                    bgColor = "#d32f2f";
                  }
                }

                return (
                  <Grid item xs={12} sm={6} key={i}>
                    <Button
                      fullWidth
                      variant={variant}
                      color={btnColor}
                      onClick={() => handleSelectOption(opt)}
                      sx={{
                        py: 2,
                        px: 2,
                        fontSize: "1rem",
                        textTransform: "none",
                        backgroundColor: bgColor,
                        borderColor: selectedOption ? undefined : "rgba(255,255,255,0.3)",
                        color: "#fff",
                        fontWeight: "medium",
                        justifyContent: "flex-start",
                        borderRadius: 2,
                      }}
                    >
                      {opt}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>

            {/* Explanation & Feedback */}
            {selectedOption && (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor:
                    selectedOption === currentQ.correct
                      ? "rgba(46, 125, 50, 0.25)"
                      : "rgba(211, 47, 47, 0.25)",
                  border: `1px solid ${
                    selectedOption === currentQ.correct ? "#4caf50" : "#ef5350"
                  }`,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" color={selectedOption === currentQ.correct ? "#81c784" : "#ff8a80"}>
                  {selectedOption === currentQ.correct ? "🎉 Awesome! That's correct!" : "💡 Good try! Here's the science fact:"}
                </Typography>
                <Typography variant="body2" mt={0.5} color="#e0e0e0">
                  {currentQ.explanation}
                </Typography>
              </Box>
            )}

            {/* Next / Finish Button */}
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                variant="contained"
                color="warning"
                size="large"
                disabled={!selectedOption}
                onClick={handleNext}
                sx={{ fontWeight: "bold", px: 4 }}
              >
                {currentIdx < questions.length - 1 ? "Next Question →" : "See Results 🏆"}
              </Button>
            </Box>
          </>
        ) : (
          /* Quiz Results Screen */
          <Box textAlign="center" py={4}>
            <Typography variant="h3" mb={2}>
              {score >= 3 ? "🏆 🌟 🚀" : "🌱 🔬 ✨"}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="#ffca28" mb={1}>
              Quiz Completed!
            </Typography>
            <Typography variant="h5" color="#fff" mb={2}>
              You scored {score} out of {questions.length}
            </Typography>
            <Typography variant="body1" color="#ccc" maxWidth="500px" mx="auto" mb={4}>
              {score === 4
                ? "Incredible job! You're a Master Science Superstar!"
                : score >= 2
                ? "Great effort! You've got sharp scientific curiosity!"
                : "Good curiosity! Every scientist learns by trying again!"}
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="contained" color="warning" size="large" onClick={handleRestart} sx={{ fontWeight: "bold" }}>
                🔄 Play Again
              </Button>
              <Button component={Link} to="/" variant="outlined" size="large" sx={{ color: "#fff", borderColor: "#fff" }}>
                Explore Other Subjects
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default ScienceFeed;
