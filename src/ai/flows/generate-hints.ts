'use server';

/**
 * @fileOverview An AI agent that provides hints for coding problems.
 *
 * - generateHints - A function that generates hints for a coding problem.
 * - GenerateHintsInput - The input type for the generateHints function.
 * - GenerateHintsOutput - The return type for the generateHints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHintsInputSchema = z.object({
  problemDescription: z.string().describe('The description of the coding problem.'),
  userCode: z.string().optional().describe('The user code, if any.'),
  previousHints: z.array(z.string()).optional().describe('The hints that have already been provided to the user.'),
  request: z.string().describe('The specific request from the user, e.g. \'give me a hint\' or \'explain the previous hint\''),
});
export type GenerateHintsInput = z.infer<typeof GenerateHintsInputSchema>;

const GenerateHintsOutputSchema = z.object({
  hint: z.string().describe('A hint to help the user solve the coding problem.'),
});
export type GenerateHintsOutput = z.infer<typeof GenerateHintsOutputSchema>;

export async function generateHints(input: GenerateHintsInput): Promise<GenerateHintsOutput> {
  return generateHintsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHintsPrompt',
  input: {schema: GenerateHintsInputSchema},
  output: {schema: GenerateHintsOutputSchema},
  prompt: `You are an expert coding tutor, skilled at providing hints to students to help them solve coding problems.  You should provide one hint at a time, and the hints should be specific and actionable.  Do not provide the complete solution, but guide the student towards it.

Problem Description: {{{problemDescription}}}

{{#if userCode}}
User Code:
{{userCode}}
{{/if}}

{{#if previousHints}}
Previous Hints:
{{#each previousHints}}
- {{{this}}}
{{/each}}
{{/if}}

Request: {{{request}}}
`,
});

const generateHintsFlow = ai.defineFlow(
  {
    name: 'generateHintsFlow',
    inputSchema: GenerateHintsInputSchema,
    outputSchema: GenerateHintsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
