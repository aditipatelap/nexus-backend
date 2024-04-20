const orderCollection = require('../../models/orderModel');


const handleGetOrder = async (req, res) => {
    try {
        const { sellerId, ordersList } = req.body;
        const orders = [];

        for (const orderId of ordersList) {
            const order = await orderCollection.findOne({_id: orderId})
            const productIdList = [];
            const productNameList = [];
            const amountList = [];
            const stageList = [];
            const matchingIndices = [];

            for (let i = 0; i < order.sellerIdList.length; i++) {
                if (String(order.sellerIdList[i]) === sellerId) {
                    matchingIndices.push(i);
                    productIdList.push(order.productIdList[i]);
                    productNameList.push(order.productNameList[i]);
                    amountList.push(order.amountList[i]);
                    stageList.push(order.stageList[i]);
                }
            }

            if(order){
                orders.push({
                        id: order._id,
                        billName: order.billName,
                        billPone: order.billPhone,
                        billAddress: order.billAddress,
                        shipAddress: order.shipAddress,
                        createdAt: order.createdAt,
                        productIdList: productIdList,
                        productNameList: productNameList,
                        amountList: amountList,
                        stageList: stageList,
                        matchingIndices: matchingIndices,
                })
            }
            else{
                console.log(productId + ": not found");
            }
        }

        res.json({ status: "success", orders: orders});
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleGetOrder };