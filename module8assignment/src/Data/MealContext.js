import { createContext } from 'react';

export const MealContext = createContext({
  myMeals: [],
  addMeal: (meal) => {},
  deleteMeal: (id) => {},
});
