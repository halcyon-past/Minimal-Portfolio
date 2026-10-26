import React from 'react';
import { Keyboard, BrainCircuit, Gamepad2, Grid3X3, Rocket, Bird, Swords } from 'lucide-react';
import {
  projects as _projects,
  experience as _experience,
  education as _education,
  socialMedia as _socialMedia,
  galleryImages as _galleryImages,
  rawGames
} from './portfolioData.js';

export const projects = _projects;
export const experience = _experience;
export const education = _education;
export const socialMedia = _socialMedia;
export const galleryImages = _galleryImages;

const iconMap = {
  Keyboard: <Keyboard className="w-8 h-8 md:w-10 md:h-10 text-(--chrysler-blue)" />,
  BrainCircuit: <BrainCircuit className="w-8 h-8 md:w-10 md:h-10 text-(--celadon)" />,
  Gamepad2: <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-[#ffbd2e]" />,
  Grid3X3: <Grid3X3 className="w-8 h-8 md:w-10 md:h-10 text-(--amethyst)" />,
  Rocket: <Rocket className="w-8 h-8 md:w-10 md:h-10 text-rose-500" />,
  Bird: <Bird className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />,
  Swords: <Swords className="w-8 h-8 md:w-10 md:h-10 text-purple-500" />
};

export const GAMES = rawGames.map((game) => ({
  ...game,
  icon: iconMap[game.iconName] || null
}));
