'use server';
/**
 * @fileOverview AI tool to analyze user questions in the comments section of DIY projects and provide summaries and relevant resources.
 *
 * - analyzeComments - A function that handles the comment analysis process.
 * - AnalyzeCommentsInput - The input type for the analyzeComments function.
 * - AnalyzeCommentsOutput - The return type for the analyzeComments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCommentsInputSchema = z.object({
  comments: z.string().describe('The comments section of a DIY project.'),
});
export type AnalyzeCommentsInput = z.infer<typeof AnalyzeCommentsInputSchema>;

const AnalyzeCommentsOutputSchema = z.object({
  summary: z.string().describe('A summary of the common issues and questions raised in the comments section.'),
  relevantResources: z.string().describe('Relevant resources that address the issues and questions raised in the comments section.'),
});
export type AnalyzeCommentsOutput = z.infer<typeof AnalyzeCommentsOutputSchema>;

export async function analyzeComments(input: AnalyzeCommentsInput): Promise<AnalyzeCommentsOutput> {
  return analyzeCommentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCommentsPrompt',
  input: {schema: AnalyzeCommentsInputSchema},
  output: {schema: AnalyzeCommentsOutputSchema},
  prompt: `You are an AI tool that analyzes user questions in the comments section of DIY projects and provides summaries and relevant resources.

Comments section:
{{{comments}}}

Provide a summary of the common issues and questions raised in the comments section, and suggest relevant resources that address these issues and questions.

Summary:
Relevant resources: `,
});

const analyzeCommentsFlow = ai.defineFlow(
  {
    name: 'analyzeCommentsFlow',
    inputSchema: AnalyzeCommentsInputSchema,
    outputSchema: AnalyzeCommentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
