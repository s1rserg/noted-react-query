import { z } from 'zod';

export const SignInLocalSchema = z.strictObject({
  email: z.email('validation.email'),
  password: z.string().min(6, 'validation.passwordMin'),
});

export const SignUpLocalSchema = z.strictObject({}).extend(SignInLocalSchema.shape);
