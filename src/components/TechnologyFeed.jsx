import React from "react";
import StoryFeed from "./StoryFeed";

const TechnologyFeed = () => {
  return (
    <StoryFeed
      category="Technology & Innovation"
      bgImage="https://media.istockphoto.com/id/1383447162/vector/90s-retro-vaporwave-aesthetics-digital-screen-user-interface-cute-old-computer-ui-elements.jpg?s=612x612&w=0&k=20&c=NRDpByU-7UXfW-RgxyPDjukoPiPb-P7-5-_MnBc7pyo="
      items={[
        "Friendly Robots",
        "Rocket Navigation",
        "Video Game Coding",
        "Solar Energy Panels",
        "Smart Drones",
        "Electric Vehicles",
      ]}
      itemLabel="Inventions"
    />
  );
};

export default TechnologyFeed;
