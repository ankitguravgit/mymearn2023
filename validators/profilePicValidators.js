const { z } = require("zod");

const profilePicSchema = z.object({
    // profilePic: z.array(z.string({ message: "profilePic is required." })),
    userId: z
        .string({ required_error: "User Id is required." })
        .trim()
        .min(1, { message: "User Id is required." })
        .max(30, { message: "User Id must not be more than 30 char. " }),
})

module.exports = { profilePicSchema };