import { z } from 'zod';

// ============================================================================
// Zod Schemas for Runtime Validation
// ============================================================================

/**
 * Schema for LiveAnthology status
 */
const AnthologyStatusSchema = z.enum(['open', 'editorial', 'closed']);

/**
 * Schema for hex color validation
 */
const HexColorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color');

/**
 * Schema for kebab-case ID validation
 */
const KebabCaseIdSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Must be in kebab-case format');

/**
 * Schema for ISO date string validation
 */
const ISODateSchema = z.string().refine((date) => {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
}, 'Must be a valid ISO date string');

/**
 * Schema for 4-digit year validation
 */
const YearSchema = z.string().regex(/^\d{4}$/, 'Must be a 4-digit year');

/**
 * Schema for URL validation
 */
const URLSchema = z.string().url('Must be a valid URL');

/**
 * Schema for LiveAnthology
 * Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5
 */
export const LiveAnthologySchema = z.object({
  id: KebabCaseIdSchema,
  title: z.string().min(1, 'Title is required'),
  genre: z.string().min(1, 'Genre is required'),
  status: AnthologyStatusSchema,
  deadline: ISODateSchema,
  reward: z.string().min(1, 'Reward is required'),
  description: z.string()
    .min(100, 'Description must be at least 100 characters')
    .max(200, 'Description must be at most 200 characters'),
  submissionCount: z.number().int().nonnegative('Submission count must be non-negative'),
  spotsRemaining: z.number().int().positive('Spots remaining must be positive').optional(),
  coverImage: z.string().url('Cover image must be a valid URL').optional(),
  accentColor: HexColorSchema,
  ctaText: z.string().optional(),
  ctaLink: z.string().min(1, 'CTA link is required'),
});

/**
 * Schema for ArchivedAnthology
 * Validates: Requirements 10.6, 10.7, 10.8
 */
export const ArchivedAnthologySchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(1, 'Title is required'),
  genre: z.string().min(1, 'Genre is required'),
  year: YearSchema,
  impact: z.string().min(1, 'Impact is required'),
  authorCount: z.number().int().positive('Author count must be a positive integer'),
  coverImage: z.string().url('Cover image must be a valid URL').optional(),
  amazonLink: URLSchema.optional(),
  description: z.string().optional(),
});

/**
 * Schema for Benefit
 */
export const BenefitSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon is required'),
});

/**
 * Schema for Stats
 */
export const StatsSchema = z.object({
  publishedAuthors: z.number().int().nonnegative('Published authors must be non-negative'),
  anthologiesLaunched: z.number().int().nonnegative('Anthologies launched must be non-negative'),
  communitySize: z.string().min(1, 'Community size is required'),
});

/**
 * Schema for Testimonial
 */
export const TestimonialSchema = z.object({
  author: z.string().min(1, 'Author is required'),
  content: z.string().min(1, 'Content is required'),
  role: z.string().optional(),
  avatar: z.string().url('Avatar must be a valid URL').optional(),
});

/**
 * Schema for Hero section
 */
export const HeroSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  subheadline: z.string().min(1, 'Subheadline is required'),
  ctaText: z.string().min(1, 'CTA text is required'),
  ctaLink: z.string().min(1, 'CTA link is required'),
});

/**
 * Schema for Final CTA section
 */
export const FinalCTASchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  subheadline: z.string().min(1, 'Subheadline is required'),
  ctaText: z.string().min(1, 'CTA text is required'),
  ctaLink: z.string().min(1, 'CTA link is required'),
});

/**
 * Schema for complete PageData
 */
export const PageDataSchema = z.object({
  hero: HeroSchema,
  liveAnthologies: z.array(LiveAnthologySchema),
  archivedAnthologies: z.array(ArchivedAnthologySchema),
  benefits: z.array(BenefitSchema),
  stats: StatsSchema,
  testimonials: z.array(TestimonialSchema),
  finalCTA: FinalCTASchema,
});

// ============================================================================
// TypeScript Interfaces
// ============================================================================

/**
 * Interface for LiveAnthology
 * Represents an anthology currently accepting submissions or in editorial review
 */
export interface LiveAnthology {
  id: string;                    // Unique identifier (kebab-case)
  title: string;                 // Display title
  genre: string;                 // Genre/category
  status: 'open' | 'editorial' | 'closed';  // Current status
  deadline: string;              // Submission deadline (ISO date)
  reward: string;                // Value proposition
  description: string;           // Compelling description (100-200 chars)
  submissionCount: number;       // Number of submissions received
  spotsRemaining?: number;       // Optional scarcity trigger
  coverImage?: string;           // Optional cover image URL
  accentColor: string;           // Brand color for card (#HEX)
  ctaText?: string;              // Optional custom CTA text
  ctaLink: string;               // Link to anthology detail page
}

/**
 * Interface for ArchivedAnthology
 * Represents a previously published anthology used for credibility building
 */
export interface ArchivedAnthology {
  id: string;                    // Unique identifier
  title: string;                 // Display title
  genre: string;                 // Genre/category
  year: string;                  // Publication year (4-digit)
  impact: string;                // Success metric (e.g., "Bestseller")
  authorCount: number;           // Number of co-authors
  coverImage?: string;           // Optional cover image URL
  amazonLink?: string;           // Optional purchase link
  description?: string;          // Optional short description
}

/**
 * Interface for Benefit
 * Represents a value proposition benefit
 */
export interface Benefit {
  title: string;                 // Benefit title
  description: string;           // Benefit description
  icon: string;                  // Icon identifier
}

/**
 * Interface for Stats
 * Represents platform statistics for social proof
 */
export interface Stats {
  publishedAuthors: number;      // Number of published authors
  anthologiesLaunched: number;   // Number of anthologies launched
  communitySize: string;         // Community size description
}

/**
 * Interface for Testimonial
 * Represents user testimonial for social proof
 */
export interface Testimonial {
  author: string;                // Testimonial author name
  content: string;               // Testimonial content
  role?: string;                 // Optional author role/title
  avatar?: string;               // Optional avatar URL
}

/**
 * Interface for Hero section data
 */
export interface Hero {
  headline: string;              // Main headline
  subheadline: string;           // Supporting subheadline
  ctaText: string;               // Call-to-action button text
  ctaLink: string;               // Call-to-action link
}

/**
 * Interface for Final CTA section data
 */
export interface FinalCTA {
  headline: string;              // Main headline
  subheadline: string;           // Supporting subheadline
  ctaText: string;               // Call-to-action button text
  ctaLink: string;               // Call-to-action link
}

/**
 * Interface for complete page data
 * Represents all data needed to render the Anthology Hub page
 */
export interface PageData {
  hero: Hero;
  liveAnthologies: LiveAnthology[];
  archivedAnthologies: ArchivedAnthology[];
  benefits: Benefit[];
  stats: Stats;
  testimonials: Testimonial[];
  finalCTA: FinalCTA;
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validates a LiveAnthology object
 * @param data - The data to validate
 * @returns Validated LiveAnthology object
 * @throws ZodError if validation fails
 */
export function validateLiveAnthology(data: unknown): LiveAnthology {
  return LiveAnthologySchema.parse(data);
}

/**
 * Safely validates a LiveAnthology object without throwing
 * @param data - The data to validate
 * @returns Success result with data or error result with issues
 */
export function safeParseLiveAnthology(data: unknown) {
  return LiveAnthologySchema.safeParse(data);
}

/**
 * Validates an ArchivedAnthology object
 * @param data - The data to validate
 * @returns Validated ArchivedAnthology object
 * @throws ZodError if validation fails
 */
export function validateArchivedAnthology(data: unknown): ArchivedAnthology {
  return ArchivedAnthologySchema.parse(data);
}

/**
 * Safely validates an ArchivedAnthology object without throwing
 * @param data - The data to validate
 * @returns Success result with data or error result with issues
 */
export function safeParseArchivedAnthology(data: unknown) {
  return ArchivedAnthologySchema.safeParse(data);
}

/**
 * Validates a Benefit object
 * @param data - The data to validate
 * @returns Validated Benefit object
 * @throws ZodError if validation fails
 */
export function validateBenefit(data: unknown): Benefit {
  return BenefitSchema.parse(data);
}

/**
 * Safely validates a Benefit object without throwing
 * @param data - The data to validate
 * @returns Success result with data or error result with issues
 */
export function safeParseBenefit(data: unknown) {
  return BenefitSchema.safeParse(data);
}

/**
 * Validates a Stats object
 * @param data - The data to validate
 * @returns Validated Stats object
 * @throws ZodError if validation fails
 */
export function validateStats(data: unknown): Stats {
  return StatsSchema.parse(data);
}

/**
 * Safely validates a Stats object without throwing
 * @param data - The data to validate
 * @returns Success result with data or error result with issues
 */
export function safeParseStats(data: unknown) {
  return StatsSchema.safeParse(data);
}

/**
 * Validates a Testimonial object
 * @param data - The data to validate
 * @returns Validated Testimonial object
 * @throws ZodError if validation fails
 */
export function validateTestimonial(data: unknown): Testimonial {
  return TestimonialSchema.parse(data);
}

/**
 * Safely validates a Testimonial object without throwing
 * @param data - The data to validate
 * @returns Success result with data or error result with issues
 */
export function safeParseTestimonial(data: unknown) {
  return TestimonialSchema.safeParse(data);
}

/**
 * Validates complete PageData object
 * @param data - The data to validate
 * @returns Validated PageData object
 * @throws ZodError if validation fails
 */
export function validatePageData(data: unknown): PageData {
  return PageDataSchema.parse(data);
}

/**
 * Safely validates complete PageData object without throwing
 * @param data - The data to validate
 * @returns Success result with data or error result with issues
 */
export function safeParsePageData(data: unknown) {
  return PageDataSchema.safeParse(data);
}

/**
 * Validates an array of LiveAnthology objects
 * @param data - The array to validate
 * @returns Validated array of LiveAnthology objects
 * @throws ZodError if validation fails
 */
export function validateLiveAnthologies(data: unknown): LiveAnthology[] {
  return z.array(LiveAnthologySchema).parse(data);
}

/**
 * Validates an array of ArchivedAnthology objects
 * @param data - The array to validate
 * @returns Validated array of ArchivedAnthology objects
 * @throws ZodError if validation fails
 */
export function validateArchivedAnthologies(data: unknown): ArchivedAnthology[] {
  return z.array(ArchivedAnthologySchema).parse(data);
}
