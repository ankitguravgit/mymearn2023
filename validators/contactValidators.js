const { z } = require("zod");

const contactSchema = z.object({

    name: z
        .string({ required_error: "First Name is required" })
        .trim()
        .min(3, { message: "First Name must be at least of 3 char. " })
        .max(30, { message: "First Name must not be more than 30 char. " }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid Email Address. " })
        .min(3, { message: "Email must be at least of 3 char. " })
        .max(30, { message: "Email must not be more than 30 char. " }),

    contactNo: z
        .string({ required_error: "Contact No is required" })
        .trim()
        .min(10, { message: "Contact No must be at least of 3 char. " })
        .max(20, { message: "Contact No must not be more than 30 char. " }),

    message: z
        .string({ required_error: "Message is required" })
        .trim()
        .min(3, { message: "Message must be at least of 3 char. " })
        .max(30, { message: "Message must not be more than 30 char. " }),
})

module.exports = { contactSchema };