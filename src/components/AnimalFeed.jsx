import React from "react";
import StoryFeed from "./StoryFeed";

const AnimalFeed = () => {
  return (
    <StoryFeed
      category="Animal Kingdom"
      bgImage="https://www.shutterstock.com/image-vector/sun-rays-falling-deep-into-600nw-1721181988.jpg"
      items={[
        "Lion",
        "Tiger",
        "Elephant",
        "Giraffe",
        "Zebra",
        "Dolphin",
        "Kangaroo",
        "Giant Panda",
      ]}
      itemLabel="Animals"
    />
  );
};

export default AnimalFeed;
