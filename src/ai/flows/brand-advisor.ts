'use server';

/**
 * @fileOverview An AI-powered brand advisor that provides suggestions based on a multifaceted individual's skills and interests.
 *
 * - brandAdvisor - A function that generates branding advice.
 * - BrandAdvisorInput - The input type for the brandAdvisor function.
 * - BrandAdvisorOutput - The return type for the brandAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BrandAdvisorInputSchema = z.object({
  description: z
    .string()
    .describe('A description of a person or brand\'s skills, interests, and activities.'),
});
export type BrandAdvisorInput = z.infer<typeof BrandAdvisorInputSchema>;

const BrandAdvisorOutputSchema = z.object({
  suggestion: z.string().describe('A creative suggestion for branding, collaboration, or a new project that unifies the described skills and interests.'),
  headline: z.string().describe('A catchy headline or tagline for the brand.'),
});
export type BrandAdvisorOutput = z.infer<typeof BrandAdvisorOutputSchema>;

export async function brandAdvisor(input: BrandAdvisorInput): Promise<BrandAdvisorOutput> {
  return brandAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'brandAdvisorPrompt',
  input: {schema: BrandAdvisorInputSchema},
  output: {schema: BrandAdvisorOutputSchema},
  prompt: `You are an expert brand strategist. Analyze the following description of a multifaceted individual or brand.

Description:
{{{description}}}

Based on this, provide a creative suggestion to unify their brand and a catchy headline.`,
});

const brandAdvisorFlow = ai.defineFlow(
  {
    name: 'brandAdvisorFlow',
    inputSchema: BrandAdvisorInputSchema,
    outputSchema: BrandAdvisorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
