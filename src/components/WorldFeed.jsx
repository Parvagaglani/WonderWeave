import React from "react";
import StoryFeed from "./StoryFeed";

const WorldFeed = () => {
  return (
    <StoryFeed
      category="Our World"
      bgImage="https://img.pikbest.com/origin/09/11/25/78HpIkbEsTJ7C.png!w700wp"
      items={[
        "Amazon Rainforest",
        "Great Pyramids",
        "Coral Reef",
        "Mount Everest",
        "Polar Auroras",
        "Grand Canyon",
      ]}
      itemLabel="World Wonders"
    />
  );
};

export default WorldFeed;
