import { z } from "zod";

const schema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/
    ),
  confirmPassword: z
    .string()
    .min(5, "Password must be at least 5 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/
    ),
});
