import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(25, { message: "Email should be at most 25 characters." })
    .email(),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: 'Password should be at least 8 characters.'})
    .max(10, { message: "Password should be at most 10 characters." })
    
});

export type LoginSchemaType = z.infer< typeof LoginSchema>


export const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(25, { message: "Email should be at most 25 characters." })
    .email(),
    
  pharmacyName: z
    .string()
    .min(1, { message: "Pharmacy name is required." })
    .min(8, { message: "Pharmacy name should be at least 8 letters." })
    .max(25, { message: "Pharmacy name should be at most 25 letters." })
    ,
  pharmacistName: z
    .string()
    .min(1, { message: "Pharmacist name is required." })
    .min(8, { message: "Pharmacist name should be at least 8 letters." })
    .max(25, { message: "Pharmacist should name be at most 25 letters." })
    ,
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required." })
    .min(9, { message: "Phone number should be at least 9 numbers." })
    .max(15, { message: "Phone number should be at most 15 numbers." })
    ,
  region: z
    .string()
    .min(1, { message: "Region is required." })
    .min(3, { message: "Region should be at least 3 letters." })
    .max(15, { message: "Region should be at most 15 letters." })
    ,
  town: z
    .string()
    .min(1, { message: "Town is required." })
    .min(3, { message: "Town should be at least 3 letters." })
    .max(15, { message: "Town should be at most 15 letters." })
    ,

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: 'Password should be at least 8 characters.'})
    .max(10, { message: "Password should be at most 10 characters." })
    
});

export type SignUpSchemaType = z.infer< typeof SignUpSchema>