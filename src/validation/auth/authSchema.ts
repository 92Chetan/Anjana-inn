import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const RegisterSchema = z
  .object({
    name: z
      .string({ required_error: 'Please Enter your name' })
      .min(3, 'Please Enter minimum 3 character')
      .max(25, 'Your name is to long'),
    avatar: z
      .any()
      .refine((files) => {
        const fileSize = files && files[0] && files[0].size;
        return fileSize && fileSize <= MAX_FILE_SIZE;
      }, 'Max image size is 5MB.')
      .refine(
        (files) => files && files[0] && ACCEPTED_IMAGE_MIME_TYPES.includes(files[0].type),
        'Only .jpg, .jpeg, .png, and .webp formats are supported.'
      ),
    email: z
      .string({ required_error: 'Please Enter your email' })
      .email('please enter your valid email'),
    password: z
      .string({ required_error: 'Please Enter your password' })
      .min(8, 'Your password minimum 8 character')
      .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
      .regex(new RegExp('.*\\d.*'), 'One number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'One special character'
      ),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords dont match',
    path: ['confirmPassword']
  });

export const verifyOtp = z.object({
  authCode: z.string({ required_error: 'Please Enter otp' }).min(6, { message: 'Otp not valid' })
});

export const verifyOtpParams = z.object({
  email: z
    .string({ required_error: 'Please Enter your email' })
    .email('please enter your valid email')
});

export const ResetPassword = z
  .object({
    password: z
      .string({ required_error: 'Please Enter your password' })
      .min(8, 'Your password minimum 8 character')
      .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
      .regex(new RegExp('.*\\d.*'), 'One number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'One special character'
      ),
    confirmPassword: z.string()
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match'
      });
    }
  });

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Please Enter your email' })
    .email('please enter your valid email'),
  password: z.string({ required_error: 'Please Enter your password' })
});
