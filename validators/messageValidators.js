const { z } = require("zod");

const messageSchema = z.object({
    senderId: z
        .string({ required_error: "senderId is required." })
        .trim()
        .min(1, { message: "senderId is required. " }),
    receiverId: z
        .string({ required_error: "receiverId is required." })
        .trim()
        .min(1, { message: "receiverId is required. " }),
    message: z
        .string({ required_error: "message is required" })
        .trim()
        .min(3, { message: "message must be at least of 3 char. " })
        .max(100, { message: "message must not be more than 100 char. " }),

})

const getMessageSchema = z.object({
    senderId: z
        .string({ required_error: "senderId is required." })
        .trim()
        .min(1, { message: "senderId is required. " }),
    receiverId: z
        .string({ required_error: "receiverId is required." })
        .trim()
        .min(1, { message: "receiverId is required. " }),
})

module.exports = { messageSchema, getMessageSchema };