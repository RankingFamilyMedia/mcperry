'use server';

/**
 * @fileOverview Generates DIY project ideas based on user skills and interests.
 *
 * - generateProjectIdea - A function that generates project ideas.
 * - GenerateProjectIdeaInput - The input type for the generateProjectIdea function.
 * - GenerateProjectIdeaOutput - The return type for the generateProjectIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectIdeaInputSchema = z.object({
  skills: z
    .string()
    .describe('The user skills, e.g., soldering, PCB design, coding.'),
  interests: z
    .string()
    .describe('The user interests, e.g., robotics, audio, home automation.'),
});
export type GenerateProjectIdeaInput = z.infer<typeof GenerateProjectIdeaInputSchema>;

const GenerateProjectIdeaOutputSchema = z.object({
  projectIdea: z.string().describe('A creative DIY project idea.'),
  requiredComponents: z
    .string()
    .describe('A comma separated list of components that the project requires.'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).describe('The difficulty of the project.'),
});
export type GenerateProjectIdeaOutput = z.infer<typeof GenerateProjectIdeaOutputSchema>;

export async function generateProjectIdea(input: GenerateProjectIdeaInput): Promise<GenerateProjectIdeaOutput> {
  return generateProjectIdeaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectIdeaPrompt',
  input: {schema: GenerateProjectIdeaInputSchema},
  output: {schema: GenerateProjectIdeaOutputSchema},
  prompt: `You are an AI assistant designed to generate innovative DIY project ideas based on user-provided skills and interests.

  Skills: {{{skills}}}
  Interests: {{{interests}}}

  Based on these skills and interests, suggest a project idea, list of components, and difficulty:

  Project Idea:
  Required components:
  Difficulty:`, // difficulty should be 'beginner', 'intermediate', or 'advanced'
});

const generateProjectIdeaFlow = ai.defineFlow(
  {
    name: 'generateProjectIdeaFlow',
    inputSchema: GenerateProjectIdeaInputSchema,
    outputSchema: GenerateProjectIdeaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
