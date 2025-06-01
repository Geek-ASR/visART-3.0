// src/ai/flows/generate-solution.ts
'use server';
/**
 * @fileOverview A flow to generate a solution for a given coding problem.
 *
 * - generateSolution - A function that generates a code solution for a given problem.
 * - GenerateSolutionInput - The input type for the generateSolution function.
 * - GenerateSolutionOutput - The return type for the generateSolution function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSolutionInputSchema = z.object({
  problemDescription: z.string().describe('The description of the coding problem.'),
  studentCode: z.string().optional().describe('The student\u2019s attempt at the problem, if any.'),
  programmingLanguage: z.string().describe('The programming language for the solution.'),
});
export type GenerateSolutionInput = z.infer<typeof GenerateSolutionInputSchema>;

const GenerateSolutionOutputSchema = z.object({
  solutionCode: z.string().describe('The code solution to the problem.'),
  explanation: z.string().describe('An explanation of the solution and approach.'),
});
export type GenerateSolutionOutput = z.infer<typeof GenerateSolutionOutputSchema>;

export async function generateSolution(input: GenerateSolutionInput): Promise<GenerateSolutionOutput> {
  return generateSolutionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSolutionPrompt',
  input: {schema: GenerateSolutionInputSchema},
  output: {schema: GenerateSolutionOutputSchema},
  prompt: `You are an expert coding tutor. A student is stuck on a coding problem and has requested a solution. Your task is to provide a correct and well-explained solution in the specified language.

Problem Description: {{{problemDescription}}}

Programming Language: {{{programmingLanguage}}}

{{#if studentCode}}
Student's Attempt:
{{studentCode}}
{{/if}}

Solution (provide well-commented code):
`, // The LLM will complete this with the solution
});

const generateSolutionFlow = ai.defineFlow(
  {
    name: 'generateSolutionFlow',
    inputSchema: GenerateSolutionInputSchema,
    outputSchema: GenerateSolutionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
