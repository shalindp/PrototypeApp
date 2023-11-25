import { z } from 'zod';

export const AuthSchema = z.object({
   email: z.string({required_error: 'Sorry, email cannot be empty.'}).email({message: 'Sorry, that is not a valid email.'}),
   password: z.string().min(8, 'Sorry, password must be least 8 characters.')
});