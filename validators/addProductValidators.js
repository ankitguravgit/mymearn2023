const { z } = require("zod");

const addProductSchema = z.object({

    userId: z
        .string({ required_error: "User Id is required." })
        .trim()
        .min(1, { message: "User Id is required." })
        .max(30, { message: "User Id must not be more than 30 char. " }),

    //productImage: z.array(z.string({ message: "Product Image Type is required." })),
    productType: z
        .string({ required_error: "Product Type is required." })
        .trim()
        .min(1, { message: "Product Type is required." })
        .max(30, { message: "Product Type must not be more than 30 char. " }),

    productName: z
        .string({ required_error: "Product Name is required" })
        .trim()
        .min(1, { message: "Product Name is required" })
        .max(30, { message: "Product Name must not be more than 30 char. " }),

    price: z
        .string({ required_error: "Price is required" })
        .min(1, { message: "Price is required" })
        .min(1, { message: "Price must greater than 0." }),

    state: z
        .string({ required_error: "State is required" })
        .min(1, { message: "State is required" })
        .trim(),

    city: z
        .string({ required_error: "City is required" })
        .min(1, { message: "City is required" })
        .trim(),

    make: z
        .string({ required_error: "Make is required" })
        .trim()
        .min(1, { message: "Make is required." })
        .max(30, { message: "Make must not be more than 30 char. " }),

    model: z
        .string({ required_error: "Model is required." })
        .trim()
        .min(1, { message: "Model is required." })
        .max(30, { message: "Model must not be more than 30 char. " }),

    isAvailableForDelivery: z
        .string({ required_error: "isAvailableForDelivery is required" })
        .min(1, { message: "isAvailableForDelivery is required" })
        .trim(),

    deliveryCost: z
        .string({ required_error: "Delivery Cost is required" })
        .min(1, { message: "Delivery Cost is required." }),

    otherFee: z
        .string({ required_error: "Other Fee is required." })
        .min(1, { message: "Other Fee is required." }),

    securityDeposit: z
        .string({ required_error: "Security Deposit is required." })
        .min(1, { message: "Security Deposit is required." }),

    insuranceCostPerDay: z
        .string({ required_error: "Insurance Cost PerDay is required." })
        .min(1, { message: "Insurance Cost PerDay is required." }),

    vin: z
        .string({ required_error: "Vin is required." })
        .trim()
        .min(1, { message: "Vin is required." })
        .max(30, { message: "Vin must not be more than 30 char. " }),

    description: z
        .string({ required_error: "Description is required" })
        .trim()
        .min(1, { message: "Description is required" })
        .max(30, { message: "Description must not be more than 30 char. " }),

    specificationOfProduct: z
        .string({ required_error: "Specification Of Product is required" })
        .trim()
        .min(1, { message: "Specification Of Product is required" })
        .max(30, { message: "Specification Of Product must not be more than 30 char. " }),
})


module.exports = { addProductSchema };