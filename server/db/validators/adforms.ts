import { z } from 'zod';

const ipSchema = z
  .string()
  .regex(
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    'Invalid IP address',
  );

export const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  phone: z.string().optional(),
  currency: z.enum(['USD', 'EUR', 'GBP']).default('USD'),
  ip: ipSchema.optional(),
  dropdown: z.enum(['Business development', 'Marketing', 'Sales', 'Support']),
  customDropdown: z.string().min(1),
  date: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date must be in mm/dd/yyyy format')
    .optional(),
  textarea: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(255, 'Max 255 characters'),
  checkbox: z.array(z.string()).min(1, 'Select at least one option'),
  radio: z.enum(['One', 'Two']),
  radioWarning: z.enum(['One', 'Two']),
  switchOne: z.boolean(),
  switchTwo: z.boolean(),
  switchDangerOne: z.boolean(),
  switchDangerTwo: z.boolean(),
  file: z.instanceof(File).optional(), // File validation
  emailState: z.enum(['normal', 'success', 'error']).default('normal'),
  textareaState: z.enum(['normal', 'error']).default('normal'),
});
