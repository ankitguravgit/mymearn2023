const { z } = require("zod");

const addStudentSchema = z.object({

    firstName: z
        .string({ required_error: "First Name is required." })
        .trim()
        .min(1, { message: "First Name is is required." }),

    lastName: z
        .string({ required_error: "Last Name is required." })
        .trim()
        .min(1, { message: "Last Name is required." }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .min(1, { message: "Email is required" }),

    contactNo: z
        .string({ required_error: "Contact No is required" })
        .min(1, { message: "Contact No is required" }),

    state: z
        .string({ required_error: "State is required" })
        .min(1, { message: "State is required" }),

    city: z
        .string({ required_error: "City is required" })
        .min(1, { message: "City is required" }),

    dateOfBirth: z
        .string({ required_error: "Date Of Birth is required" })
        .min(1, { message: "Date Of Birth is required" }),

})

const addStudentDocSchema = z.object({

    studentId: z
        .string({ required_error: "studentId is required." })
        .trim()
        .min(1, { message: "studentId is is required." }),

    // file: z
    //     .string({ required_error: "file is required." }),

    filename: z
        .string({ required_error: "filename is required." })
        .trim()
        .min(1, { message: "filename is is required." }),

    isVerify: z
        .string({ required_error: "isVerify is required." })
        .trim()
        .min(1, { message: "isVerify is is required." }),

    isRadio: z
        .string({ required_error: "isRadio is required." })
        .trim()
        .min(1, { message: "isRadio is is required." }),

    docName: z
        .string({ required_error: "docName is required." })
        .trim()
        .min(1, { message: "docName is is required." }),

})


module.exports = { addStudentSchema, addStudentDocSchema };