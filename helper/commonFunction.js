// Function to filter orders based on host ID
const filterOrdersByHostId = async (response, hostId) => {
    var finalArray = [];
    if (response.length > 0) {
        await Promise.all(response.map(async (item, index) => {
            var productResponse = await item.productItems.filter((productItem) => productItem.hostId === hostId)
            let obj = {
                "_id": item._id, "renterId": item.renterId, "orderTotalAmount": item.orderTotalAmount, "depositAmount": item.depositAmount,
                "orderStatus": item.orderStatus, "productItems": productResponse, "createdAt": item.createdAt, "__v": item.__v
            }
            finalArray.push(obj);
        }));
        return finalArray
    } else {
        return finalArray
    }
}


module.exports = { filterOrdersByHostId }