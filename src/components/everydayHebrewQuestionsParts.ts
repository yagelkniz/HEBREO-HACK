
type EverydayHebrewQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  translation: string;
};

import questionsRaw from "./everydayHebrewQuestions.json";

// ודא התאמה: כל שאלה כוללת id, correctAnswer ולא answer
const questions: EverydayHebrewQuestion[] = questionsRaw as EverydayHebrewQuestion[];

// מחלקים לארבעה חלקים של 25 בכל אחד (אם יהיו מאות שאלות)
export const everydayHebrewQuestionsPart1: EverydayHebrewQuestion[] = questions.slice(0, 25);
export const everydayHebrewQuestionsPart2: EverydayHebrewQuestion[] = questions.slice(25, 50);
export const everydayHebrewQuestionsPart3: EverydayHebrewQuestion[] = questions.slice(50, 75);
export const everydayHebrewQuestionsPart4: EverydayHebrewQuestion[] = questions.slice(75, 100);
