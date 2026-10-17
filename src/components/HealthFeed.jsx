import React from "react";
import StoryFeed from "./StoryFeed";

const HealthFeed = () => {
  return (
    <StoryFeed
      category="Health & Hygiene"
      bgImage="https://img.freepik.com/free-vector/national-doctor-s-day-hand-drawn-background_23-2149438164.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712016000&semt=ais"
      items={[
        "Superhero Veggies",
        "Germ Busters",
        "Sparkling Teeth",
        "Sleep Power",
        "Hydration Magic",
        "Strong Bones",
      ]}
      itemLabel="Healthy Habits"
    />
  );
};

export default HealthFeed;
