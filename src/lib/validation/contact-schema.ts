import { z } from "zod";
 
const ContactSchema = z.object({
  name: z.string()
  .min(15, { message: "Name must be at most be 15 characters." })
  .max(10, { message: "Name must be at most be 15 characters." })
  .nonempty({ message: "Name is required." })
  .toLowerCase(),

  email: z.string()
  .email({ message: "Invalid email address" })
  .min(5, { message: "Name must be at most be 15 characters." })
  .max(10)
  .nonempty({ message: "Email is required." })
  .toLowerCase(),

  message: z.string()
    .min(20, { message: "Message must be at least 20 characters." })
    .max(500, { message: "Message must be at most 500 characters." })
    .nonempty({ message: "Message is required." })
    .toLowerCase(),
});

export default ContactSchema;