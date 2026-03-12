import type { Topic } from '../types/content';

export const TOPICS = [
  {
    id: 'top-001',
    name: 'Greetings',
    description: 'Common greetings and farewells used in everyday Korean.',
    icon: 'Hand',
  },
  {
    id: 'top-002',
    name: 'Numbers',
    description: 'Korean native and Sino-Korean number systems.',
    icon: 'Hash',
  },
  {
    id: 'top-003',
    name: 'Food & Drink',
    description: 'Vocabulary and phrases related to food, drinks, and dining.',
    icon: 'Utensils',
  },
  {
    id: 'top-004',
    name: 'Daily Life',
    description: 'Everyday activities, objects, and routines.',
    icon: 'Sun',
  },
  {
    id: 'top-005',
    name: 'Travel',
    description: 'Vocabulary for getting around, directions, and transportation.',
    icon: 'Map',
  },
  {
    id: 'top-006',
    name: 'Family',
    description: 'Family members and relationship terms.',
    icon: 'Users',
  },
] satisfies Topic[];
