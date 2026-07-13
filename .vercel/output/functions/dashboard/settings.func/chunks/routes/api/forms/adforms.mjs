import { desc } from 'drizzle-orm';
import { d as defineEventHandler, o as getMethod, r as readBody, b as db, q as formSubmissions, c as createError } from '../../../_/nitro.mjs';
import { z } from 'zod';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'drizzle-orm/pg-core';
import 'crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';

const ipSchema = z.string().regex(
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  "Invalid IP address"
);
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  phone: z.string().optional(),
  currency: z.enum(["USD", "EUR", "GBP"]).default("USD"),
  ip: ipSchema.optional(),
  dropdown: z.enum(["Business development", "Marketing", "Sales", "Support"]),
  customDropdown: z.string().min(1),
  date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in mm/dd/yyyy format").optional(),
  textarea: z.string().min(10, "Message must be at least 10 characters").max(255, "Max 255 characters"),
  checkbox: z.array(z.string()).min(1, "Select at least one option"),
  radio: z.enum(["One", "Two"]),
  radioWarning: z.enum(["One", "Two"]),
  switchOne: z.boolean(),
  switchTwo: z.boolean(),
  switchDangerOne: z.boolean(),
  switchDangerTwo: z.boolean(),
  file: z.instanceof(File).optional(),
  // File validation
  emailState: z.enum(["normal", "success", "error"]).default("normal"),
  textareaState: z.enum(["normal", "error"]).default("normal")
});

const adforms = defineEventHandler(async (event) => {
  var _a, _b;
  const method = getMethod(event);
  try {
    if (method === "POST") {
      const body = await readBody(event);
      const validatedData = formSchema.parse(body);
      const dataToInsert = {
        ...validatedData,
        file: ((_a = validatedData.file) == null ? void 0 : _a.name) || null
      };
      const [result] = await db.insert(formSubmissions).values(dataToInsert).returning({ id: formSubmissions.id });
      return {
        success: true,
        message: "Form submitted successfully!",
        id: (_b = result == null ? void 0 : result.id) != null ? _b : null
      };
    }
    if (method === "GET") {
      const submissions = await db.select({
        id: formSubmissions.id,
        name: formSubmissions.name,
        email: formSubmissions.email,
        createdAt: formSubmissions.createdAt
      }).from(formSubmissions).orderBy(desc(formSubmissions.createdAt));
      return {
        success: true,
        count: submissions.length,
        submissions
      };
    }
    throw createError({ statusCode: 405, message: "Method Not Allowed" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: err.issues
      };
    }
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message || "Something went wrong"
      };
    }
    return {
      success: false,
      message: "Unknown error occurred"
    };
  }
});

export { adforms as default };
//# sourceMappingURL=adforms.mjs.map
