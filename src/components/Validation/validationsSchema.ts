import {z} from "zod"
const accountType = [
    "homeSeeker", "agent"
  ] as [string, ...string[]];
const emailSchema = z.string().email({ message: "Invalid email address" });
const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters" });
const stringSchema = z.string().nonempty({ message: "Thie Field cannot be empty." });
const numberSchema = z.string().regex(/^\d+$/, { message: "Only numbers are allowed" });
const accountSchema = z.enum(accountType).refine(value => value !== "", {
    message: "Please select a house type.",
  });


export{emailSchema, passwordSchema, stringSchema, numberSchema, accountSchema}