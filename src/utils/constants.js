import animals from './images/Animals.jpeg';
import scienceImage from './images/Science.jpeg';
import earth from './images/earth.jpeg';
import space from './images/space.jpeg';
import health from './images/health.jpg';
import technology from './images/technology.png';

export const subjects = [
  {
    id: "animals",
    name: "Animal Kingdom",
    path: "/animals",
    image: animals,
    description: "Create wildlife adventures & learn real animal facts!",
  },
  {
    id: "science",
    name: "Science",
    path: "/science",
    image: scienceImage,
    description: "Hands-on gamified trivia & interactive discoveries!",
  },
  {
    id: "space",
    name: "Space & Universe",
    path: "/space",
    image: space,
    description: "Journey through planets, galaxies & cosmic wonders!",
  },
  {
    id: "world",
    name: "Our World",
    path: "/world",
    image: earth,
    description: "Explore world wonders, nature & global cultures!",
  },
  {
    id: "health",
    name: "Health & Hygiene",
    path: "/health",
    image: health,
    description: "Learn healthy superhero habits & body superpowers!",
  },
  {
    id: "technology",
    name: "Technology & Innovation",
    path: "/technology",
    image: technology,
    description: "Invent friendly robots, gadgets & future coding!",
  },
];

