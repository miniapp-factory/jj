"use client";

import { useState } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

const questions = [
  {
    question: "What’s your favorite way to spend a weekend?",
    answers: [
      { text: "Reading a book in a cozy corner", animal: "cat" },
      { text: "Going for a long hike", animal: "horse" },
      { text: "Playing with friends at the park", animal: "dog" },
      { text: "Exploring a new city", animal: "fox" },
      { text: "Staying home and watching a movie", animal: "hamster" },
    ],
  },
  {
    question: "Which of these traits describes you best?",
    answers: [
      { text: "Independent", animal: "cat" },
      { text: "Loyal", animal: "dog" },
      { text: "Curious", animal: "fox" },
      { text: "Playful", animal: "hamster" },
      { text: "Strong and energetic", animal: "horse" },
    ],
  },
  {
    question: "What’s your ideal pet?",
    answers: [
      { text: "A quiet cat", animal: "cat" },
      { text: "A friendly dog", animal: "dog" },
      { text: "A clever fox", animal: "fox" },
      { text: "A small hamster", animal: "hamster" },
      { text: "A majestic horse", animal: "horse" },
    ],
  },
  {
    question: "How do you handle stress?",
    answers: [
      { text: "I retreat to a quiet space", animal: "cat" },
      { text: "I go for a run", animal: "horse" },
      { text: "I talk it out with friends", animal: "dog" },
      { text: "I find a clever solution", animal: "fox" },
      { text: "I keep busy with small tasks", animal: "hamster" },
    ],
  },
  {
    question: "What’s your favorite food?",
    answers: [
      { text: "Fish and fresh greens", animal: "cat" },
      { text: "Meat and treats", animal: "dog" },
      { text: "Berries and nuts", animal: "fox" },
      { text: "Seeds and grains", animal: "hamster" },
      { text: "Grass and hay", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Animal[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (animal: Animal) => {
    setAnswers((prev) => [...prev, animal]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
  };

  const animalScores = answers.reduce<Record<Animal, number>>(
    (acc, a) => ({ ...acc, [a]: (acc[a] ?? 0) + 1 }),
    {} as Record<Animal, number>
  );

  const resultAnimal = Object.entries(animalScores).reduce<Animal | null>(
    (max, [animal, score]) => {
      if (!max || score > (animalScores[max] ?? 0)) {
        return animal as Animal;
      }
      return max;
    },
    null
  ) as Animal;

  if (showResult) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">You are a {resultAnimal}!</h2>
        <img
          src={`/${resultAnimal}.png`}
          alt={resultAnimal}
          width={512}
          height={512}
          className="rounded-md"
        />
        <Share text={`I am a ${resultAnimal}! ${url}`} />
        <button
          onClick={resetQuiz}
          className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[current];
  const shuffledAnswers = shuffleArray(currentQuestion.answers);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
      <div className="flex flex-col gap-2">
        {shuffledAnswers.map((ans, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(ans.animal as Animal)}
            className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground"
          >
            {ans.text}
          </button>
        ))}
      </div>
    </div>
  );
}
