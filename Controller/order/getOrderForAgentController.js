const orderCollection = require('../../models/orderModel');

const handleGetOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        let orderDetails = {}; // Changed to object instead of array

        const order = await orderCollection.findOne({_id: orderId})

        if(order){
            const productIdList = [];
            const productNameList = [];
            const amountList = [];
            const stageList = [];
    
            for (let i = 0; i < order.stageList.length; i++) {
                if (String(order.stageList[i]) === "approved" || String(order.stageList[i]) === "delivered") {
                    productIdList.push(order.productIdList[i]);
                    productNameList.push(order.productNameList[i]);
                    amountList.push(order.amountList[i]);
                    stageList.push(order.stageList[i]);
                }
            }
            
            if(productIdList.length === 0){
                res.json({ status: "not_found"})
                return
            }

            orderDetails = { // Updated orderDetails to object
                id: order._id,
                billName: order.billName,
                billPhone: order.billPhone,
                billAddress: order.billAddress,
                shipAddress: order.shipAddress,
                productIdList: productIdList,
                productNameList: productNameList,
                amountList: amountList,
                stageList: stageList,
            };
        }
        else{
            res.json({ status: "notexits"})
            return
        }

        res.json({ status: "success", orderDetails: orderDetails});
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleGetOrder };