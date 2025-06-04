
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle, HelpCircle, RotateCcw, XCircle, Brain } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  questionText: string | React.ReactNode; // Allow ReactNode for formatted code
  type: 'mcq'; // For this quiz, we'll primarily use MCQs
  options: QuizOption[];
  correctAnswerId: string;
}

const arrayScenarioQuestions: QuizQuestion[] = [
  {
    id: 'q1_scenario',
    questionText: (
      <>
        An array <code className="font-mono bg-muted px-1 rounded">[10, 20, 30, 40, 50]</code> is used to implement a conceptual queue.
        After enqueuing 60 and then dequeuing twice, what is the front element?
        (Assume array indices 0, 1, 2... represent front to rear, and deletions shift elements to the left).
      </>
    ),
    type: 'mcq',
    options: [
      { id: 'q1opt1', text: '10' },
      { id: 'q1opt2', text: '20' },
      { id: 'q1opt3', text: '30' },
      { id: 'q1opt4', text: '60' },
    ],
    correctAnswerId: 'q1opt3',
  },
  {
    id: 'q2_scenario',
    questionText: (
      <>
        Consider the following pseudo-code:
        <pre className="bg-muted p-2 rounded-md text-sm mt-2 overflow-x-auto">
          <code className="language-clike font-code block whitespace-pre-wrap">
            {`FUNCTION mystery(arr, n)
  IF n <= 0 THEN
    RETURN 0
  END IF
  RETURN arr[n-1] + mystery(arr, n-1)
END FUNCTION`}
          </code>
        </pre>
        What is the result of <code className="font-mono bg-muted px-1 rounded">mystery([1, 2, 3, 4], 3)</code>?
      </>
    ),
    type: 'mcq',
    options: [
      { id: 'q2opt1', text: '6' },
      { id: 'q2opt2', text: '7' },
      { id: 'q2opt3', text: '10' },
      { id: 'q2opt4', text: '3' },
    ],
    correctAnswerId: 'q2opt1',
  },
  {
    id: 'q3_scenario',
    questionText: (
      <>
        What is the time complexity of the following code snippet operating on an array of size <code className="font-mono bg-muted px-1 rounded">n</code>?
        <pre className="bg-muted p-2 rounded-md text-sm mt-2 overflow-x-auto">
          <code className="language-clike font-code block whitespace-pre-wrap">
            {`FOR i FROM 0 TO n-1
  FOR j FROM 0 TO i-1
    print arr[i] + arr[j]
  END FOR
END FOR`}
          </code>
        </pre>
      </>
    ),
    type: 'mcq',
    options: [
      { id: 'q3opt1', text: 'O(n)' },
      { id: 'q3opt2', text: 'O(n log n)' },
      { id: 'q3opt3', text: 'O(n^2)' },
      { id: 'q3opt4', text: 'O(1)' },
    ],
    correctAnswerId: 'q3opt3',
  },
  {
    id: 'q4_scenario',
    questionText: 'If an array is already sorted, what is the most efficient average time complexity to search for an element?',
    type: 'mcq',
    options: [
        { id: 'q4opt1', text: 'O(1)' },
        { id: 'q4opt2', text: 'O(log n)' },
        { id: 'q4opt3', text: 'O(n)' },
        { id: 'q4opt4', text: 'O(n^2)' },
    ],
    correctAnswerId: 'q4opt2',
  },
  {
    id: 'q5_scenario',
    questionText: 'When dynamically resizing an array (like an ArrayList or Python list), if the capacity is doubled each time it\'s full, what is the amortized time complexity of adding N elements sequentially?',
    type: 'mcq',
    options: [
        { id: 'q5opt1', text: 'O(N)' },
        { id: 'q5opt2', text: 'O(N log N)' },
        { id: 'q5opt3', text: 'O(N^2)' },
        { id: 'q5opt4', text: 'O(log N)' },
    ],
    correctAnswerId: 'q5opt1',
  },
];

export default function ArrayScenarioAnalysisQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = arrayScenarioQuestions[currentQuestionIndex];
  const totalQuestions = arrayScenarioQuestions.length;
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
    arrayScenarioQuestions.forEach((q) => {
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
          <Brain className="h-8 w-8 text-primary" /> {/* Using Brain icon for advanced quiz */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Quiz 2: Arrays - Scenario-Based & Algorithm Analysis</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Apply your knowledge to solve scenarios and analyze algorithmic behavior.
        </p>
      </header>

      <Separator />

      <Card className="bg-card shadow-md">
        {!quizSubmitted ? (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Question {currentQuestionIndex + 1} of {totalQuestions}</CardTitle>
              <Progress value={progressValue} aria-label={`Quiz progress ${progressValue.toFixed(0)}%`} className="mt-2" />
              <CardDescription className="pt-4 text-base text-foreground leading-relaxed">
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
              {score / totalQuestions >= 0.6 ? ( // Adjusted threshold for harder quiz
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
                {score / totalQuestions >= 0.6 
                  ? "Excellent work! You have a strong analytical understanding." 
                  : "Good effort! These questions are challenging. Review the concepts and try again."}
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
