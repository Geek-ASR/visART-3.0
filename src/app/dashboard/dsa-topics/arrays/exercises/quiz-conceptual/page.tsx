
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle, HelpCircle, RotateCcw, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  questionText: string;
  type: 'mcq' | 'true-false';
  options: QuizOption[];
  correctAnswerId: string;
}

const arrayConceptualQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    questionText: 'Which of the following best describes an array?',
    type: 'mcq',
    options: [
      { id: 'q1opt1', text: 'A collection of elements of different data types.' },
      { id: 'q1opt2', text: 'A collection of elements of the same data type stored in contiguous memory locations.' },
      { id: 'q1opt3', text: 'A data structure that follows the Last-In, First-Out (LIFO) principle.' },
      { id: 'q1opt4', text: 'A dynamic data structure that can grow or shrink automatically.' },
    ],
    correctAnswerId: 'q1opt2',
  },
  {
    id: 'q2',
    questionText: 'Arrays in most statically-typed languages (like Java or C++) have a fixed size declared at compile-time.',
    type: 'true-false',
    options: [
      { id: 'true', text: 'True' },
      { id: 'false', text: 'False' },
    ],
    correctAnswerId: 'true',
  },
  {
    id: 'q3',
    questionText: 'What is the typical time complexity to access an element in an array using its index?',
    type: 'mcq',
    options: [
      { id: 'q3opt1', text: 'O(n) - Linear time' },
      { id: 'q3opt2', text: 'O(log n) - Logarithmic time' },
      { id: 'q3opt3', text: 'O(1) - Constant time' },
      { id: 'q3opt4', text: 'O(n^2) - Quadratic time' },
    ],
    correctAnswerId: 'q3opt3',
  },
  {
    id: 'q4',
    questionText: 'Insertion or deletion of an element in the middle of an array is generally an O(1) operation.',
    type: 'true-false',
    options: [
      { id: 'true', text: 'True' },
      { id: 'false', text: 'False' },
    ],
    correctAnswerId: 'false',
  },
    {
    id: 'q5',
    questionText: 'Which of these is NOT a typical advantage of using arrays?',
    type: 'mcq',
    options: [
      { id: 'q5opt1', text: 'Fast random access to elements by index.' },
      { id: 'q5opt2', text: 'Cache friendliness due to contiguous memory.' },
      { id: 'q5opt3', text: 'Automatic resizing to accommodate new elements without overhead.' },
      { id: 'q5opt4', text: 'Simplicity in storing ordered collections of similar items.' },
    ],
    correctAnswerId: 'q5opt3',
  },
];

export default function ArrayConceptualQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = arrayConceptualQuestions[currentQuestionIndex];
  const totalQuestions = arrayConceptualQuestions.length;
  const progressValue = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerChange = (questionId: string, answerId: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    arrayConceptualQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerId) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setQuizSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };
  
  if (!currentQuestion) {
    // Should ideally not happen if navigation is correct
    return <div>Loading quiz...</div>;
  }

  return (
    <div className="space-y-8">
      <Button asChild variant="outline" size="sm" className="mb-4 w-auto">
        <Link href="/dashboard/dsa-topics/arrays/exercises">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Array Exercises
        </Link>
      </Button>

      <header className="pb-2 space-y-2">
        <div className="flex items-center space-x-3">
          <HelpCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Quiz 1: Arrays - Conceptual Understanding</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Test your grasp of basic array concepts, theory, and core definitions.
        </p>
      </header>

      <Separator />

      <Card className="bg-card shadow-md">
        {!quizSubmitted ? (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Question {currentQuestionIndex + 1} of {totalQuestions}</CardTitle>
              <Progress value={progressValue} aria-label={`Quiz progress ${progressValue.toFixed(0)}%`} className="mt-2" />
              <CardDescription className="pt-4 text-base text-foreground">
                {currentQuestion.questionText}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={userAnswers[currentQuestion.id] || ''}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option.id} id={`${currentQuestion.id}-${option.id}`} />
                    <Label htmlFor={`${currentQuestion.id}-${option.id}`} className="flex-1 cursor-pointer text-sm">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              {currentQuestionIndex < totalQuestions - 1 ? (
                <Button onClick={handleNextQuestion} disabled={!userAnswers[currentQuestion.id]}>Next</Button>
              ) : (
                <Button onClick={handleSubmitQuiz} className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={!userAnswers[currentQuestion.id] || Object.keys(userAnswers).length < totalQuestions}>
                  Submit Quiz
                </Button>
              )}
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">Quiz Completed!</CardTitle>
              {score / totalQuestions >= 0.7 ? (
                 <CheckCircle className="h-16 w-16 text-green-500 mx-auto my-4" />
              ) : (
                 <XCircle className="h-16 w-16 text-destructive mx-auto my-4" />
              )}
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-xl">
                You scored: <span className="font-bold text-primary">{score}</span> out of <span className="font-bold">{totalQuestions}</span>
              </p>
              <p className="text-muted-foreground">
                {score / totalQuestions >= 0.7 
                  ? "Great job! You have a good understanding of array concepts." 
                  : "Keep practicing! Review the array theory to improve your score."}
              </p>
              <div className="flex justify-center space-x-4 pt-4">
                <Button onClick={handleRetakeQuiz} variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" /> Retake Quiz
                </Button>
                <Button asChild>
                  <Link href="/dashboard/dsa-topics/arrays/exercises">
                    Back to Exercises
                  </Link>
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
