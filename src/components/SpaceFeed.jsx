import React from "react";
import StoryFeed from "./StoryFeed";

const SpaceFeed = () => {
  return (
    <StoryFeed
      category="Space & Universe"
      bgImage="https://img.freepik.com/free-vector/outer-space-background-with-planets-stars_107791-17549.jpg"
      items={[
        "Mars Rover",
        "Saturn's Rings",
        "The Moon",
        "Supermassive Black Hole",
        "Comet",
        "Space Station",
      ]}
      itemLabel="Cosmic Wonders"
    />
  );
};

export default SpaceFeed;
