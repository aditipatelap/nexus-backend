const orderCollection = require('../../models/orderModel');


const handleTrackOrder = async (req, res) => {
    try {
        const { ordersList } = req.body;
        const orders = [];

        for (const orderId of ordersList) {
            const order = await orderCollection.findOne({_id: orderId})
            if(order) {
                orders.push(order);
            }
            else{
                console.log(orderId + ": not found");
            }
        }
        res.json({ status: "success", orders: orders});
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleTrackOrder };