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
  cin: z.string().optional().or(z.literal('')),
  pan: z.string().min(1, 'PAN is required'),
  tan: z.string().optional().or(z.literal('')),
  gstin: z.string().min(1, 'GSTIN is required'),
  pfRegistration: z.string().optional().or(z.literal('')),
  esiRegistration: z.string().optional().or(z.literal('')),
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
