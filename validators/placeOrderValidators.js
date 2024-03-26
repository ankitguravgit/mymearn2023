const { z } = require("zod");

const placeOrderSchema = z.object({

    renterId: z
        .string({ required_error: "RenterId is required." })
        .trim()
        .min(1, { message: "RenterId is is required." }),

    orderTotalAmount: z
        .string({ required_error: "Order Total Amount is required." })
        .trim()
        .min(1, { message: "Order Total Amount is required." }),

    depositAmount: z
        .string({ required_error: "Deposit Amount is required" })
        .trim()
        .min(1, { message: "Deposit Amount is required" }),

    orderStatus: z
        .string({ required_error: "Order Status is required" })
        .min(1, { message: "Order Status is required" }),

    productItems: z.array(
        z.object({
            hostId: z.string({ required_error: "Host Id is required" }),
            productId: z.string({ required_error: "Product Id is required" }),
            pickUpDate: z.string({ required_error: "Pickup Date is required" }),
            pickUpTime: z.string({ required_error: "Pickup Time is required" }),
            returnDate: z.string({ required_error: "Return Date is required" }),
            returnTime: z.string({ required_error: "Return Time is required" }),
        })
    )
        .min(1, { message: "At least one item is required" })
})

const updateOrderStatusSchema = z.object({

    orderId: z
        .string({ required_error: "orderId is required." })
        .trim()
        .min(1, { message: "orderId is is required." }),

    orderStatus: z
        .string({ required_error: "orderStatus is required." })
        .trim()
        .min(1, { message: "orderStatus is required." }),

})


module.exports = { placeOrderSchema, updateOrderStatusSchema };