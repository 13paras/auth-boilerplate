import { z } from "zod";

const signupBody = z.object({
  fullName: z.string().min(6),
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignupBody = z.infer<typeof signupBody>;

const signinBody = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SigninBody = z.infer<typeof signinBody>;

const updateBody = z.object({
  fullName: z.string().optional(),
  username: z.string().optional(),
});

type UpdateBody = z.infer<typeof updateBody>;

const updatePasswordBody = z.object({
  password: z.string().min(6, "Password must be at least 6 character long!"),
});

type UpdatePasswordBody = z.infer<typeof updatePasswordBody>;

export {
  signupBody,
  SignupBody,
  signinBody,
  SigninBody,
  updateBody,
  UpdateBody,
  updatePasswordBody,
  UpdatePasswordBody,
};
