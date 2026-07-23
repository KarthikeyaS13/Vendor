import { z } from 'zod';

export const step1Schema = z.object({
  vendorName: z.string().min(1, 'Vendor Name is required'),
  vendorLegalName: z.string().min(1, 'Vendor Legal Name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  pinCode: z.string().min(6, 'Valid PIN is required'),
  email1: z.string().email('Invalid email'),
  email2: z.string().email('Invalid email').optional().or(z.literal('')),
  contactPerson: z.string().min(1, 'Contact Person is required'),
  contactPhone: z.string().min(10, 'Valid mobile is required'),
});

export const step2Schema = z.object({
  vendorType: z.string().min(1, 'Vendor Type is required'),
  vendorCategory: z.string().min(1, 'Vendor Category is required'),
  entityType: z.string().min(1, 'Entity Type is required'),
  cin: z.string()
    .regex(/^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/, 'Invalid CIN (e.g., U12345DL2023PTC123456)')
    .or(z.literal(''))
    .optional(),
  pan: z.string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format (e.g., ABCDE1234F)'),
  tan: z.string()
    .regex(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/, 'Invalid TAN format (e.g., DELA12345B)')
    .or(z.literal(''))
    .optional(),
  gstin: z.string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Zz]{1}[0-9A-Z]{1}$/, 'Invalid GSTIN (e.g., 27AADCB2230M1Z9)'),
  pfRegistration: z.string()
    .regex(/^[A-Za-z0-9\s\/-]{10,25}$/, 'Invalid PF Registration Number')
    .or(z.literal(''))
    .or(z.literal('NA'))
    .or(z.literal('NA if not applicable'))
    .optional(),
  esiRegistration: z.string()
    .regex(/^\d{17}$/, 'ESI must be exactly 17 digits')
    .or(z.literal(''))
    .or(z.literal('NA'))
    .or(z.literal('NA if not applicable'))
    .optional(),
  labourRegistration: z.string().optional().or(z.literal('')),
  itFiling: z.string().optional().or(z.literal('')),
  gstFiling: z.string().optional().or(z.literal(''))
});

export const step3Schema = z.object({
  bankName: z.string().min(1, 'Bank Name is required'),
  bankBranch: z.string().min(1, 'Branch Name is required'),
  accountNumber: z.string().min(1, 'Account Number is required'),
  accountType: z.string().min(1, 'Account Type is required'),
  ifsc: z.string().min(1, 'IFSC Code is required')
});
