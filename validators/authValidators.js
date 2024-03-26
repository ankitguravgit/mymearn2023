const { z } = require("zod");

const signupSchema = z.object({
    role: z
        .string({ required_error: "Role is required." })
        .trim()
        .min(1, { message: "Role is required. " }),
    firstName: z
        .string({ required_error: "First Name is required" })
        .trim()
        .min(3, { message: "First Name must be at least of 3 char. " })
        .max(30, { message: "First Name must not be more than 30 char. " }),

    lastName: z
        .string({ required_error: "Last Name is required" })
        .trim()
        .min(3, { message: "Last Name must be at least of 3 char. " })
        .max(30, { message: "Last Name must not be more than 30 char. " }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid Email Address. " })
        .min(3, { message: "Email must be at least of 3 char. " })
        .max(30, { message: "Email must not be more than 30 char. " }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(3, { message: "Password must be at least of 3 char. " })
        .max(30, { message: "Password must not be more than 30 char. " }),

    contactNo: z
        .string({ required_error: "Contact No is required" })
        .trim()
        .min(10, { message: "Contact No must be at least of 3 char. " })
        .max(20, { message: "Contact No must not be more than 30 char. " }),

    city: z
        .string({ required_error: "City is required" })
        .trim()
        .min(3, { message: "City must be at least of 3 char. " })
        .max(30, { message: "City must not be more than 30 char. " }),

    state: z
        .string({ required_error: "State is required" })
        .trim()
        .min(3, { message: "State must be at least of 3 char. " })
        .max(30, { message: "State must not be more than 30 char. " }),

    country: z
        .string({ required_error: "Country is required" })
        .trim()
        .min(3, { message: "Country must be at least of 3 char. " })
        .max(30, { message: "Country must not be more than 30 char. " }),

    pinCode: z
        .number({ required_error: "Pin Code is required" }),

    dateOfBirth: z
        .string({ required_error: "Date Of Birth is required" })
        .trim()
        .min(3, { message: "Date Of Birth must be at least of 3 char. " })
        .max(30, { message: "Date Of Birth must not be more than 30 char. " }),

})

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid Email Address. " })
        .min(3, { message: "Email must be at least of 3 char. " })
        .max(30, { message: "Email must not be more than 30 char. " }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(3, { message: "Password must be at least of 3 char. " })
        .max(30, { message: "Password must not be more than 30 char. " }),

})

const forgotPasswordSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid Email Address. " })
        .min(3, { message: "Email must be at least of 3 char. " })
        .max(30, { message: "Email must not be more than 30 char. " }),
})

const resetPasswordSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid Email Address. " })
        .min(3, { message: "Email must be at least of 3 char. " })
        .max(30, { message: "Email must not be more than 30 char. " }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(3, { message: "Password must be at least of 3 char. " })
        .max(30, { message: "Password must not be more than 30 char. " }),

    otp: z
        .number({ required_error: "otp is required" }),
})

module.exports = { signupSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema };