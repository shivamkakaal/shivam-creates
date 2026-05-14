import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message is too short'),
});

export const bookingSchema = z.object({
  service: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  fullName: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
});

export const projectBriefSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  businessName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Please provide a valid phone number'),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
  deadline: z.string().optional(),
  howFound: z.string().optional(),
  referenceUrls: z.string().optional(),
  message: z.string().min(50, 'Please provide more details (min 50 characters)'),
});
