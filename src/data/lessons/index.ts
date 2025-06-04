import greetings from './greetings';
import numbers from './numbers';
import food from './food';
import family from './family';
import time from './time';
import colors from './colors';
import weather from './weather';
import transportation from './transportation';
import occupations from './occupations';
import places from './places';
import emotions from './emotions';

import { Lesson } from './types';

export const lessons: Lesson[] = [
  greetings,
  numbers,
  food,
  family,
  time,
  colors,
  weather,
  transportation,
  occupations,
  places,
  emotions
];
export type { Lesson }; 