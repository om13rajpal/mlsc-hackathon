import zod from "zod";

const userSchema = zod.object({
  username: zod
    .string({
      message: "Username is required",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(30, {
      message: "Username must be at most 30 characters long",
    }),

  password: zod
    .string({
      message: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    }),

  email: zod
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    })
    .optional(),
  team: zod
    .string({
      message: "Team is required",
    })
    .optional(),
});

export function validateUser(payload: unknown) {
  const result = userSchema.safeParse(payload);
  return result;
}
