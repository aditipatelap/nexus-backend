const orderCollection = require('../../models/orderModel');
const sellerCollection = require('../../models/sellerModel');
const customerCollection = require('../../models/customerModel');

const handleCreateOrder = async (req, res) => {
    try {
        const body = req.body;
        
        const dbSize = await orderCollection.countDocuments();
        const countId = dbSize + 1;

        const newOrder = {
            countId: countId,
            productIdList: body.productIdList,
            productNameList: body.productNameList,
            amountList: body.amountList,
            sellerIdList: body.sellerIdList,
            sellerNameList: body.sellerNameList,
            stageList: body.stageList,
            totalAmount: body.totalAmount,
            customerId: body.customerId,
            billName: body.billName,
            billPhone: body.billPhone,
            billAddress: body.billAddress,
        }
        
        await orderCollection.insertMany([newOrder]);

        const order = await orderCollection.findOne({ countId: countId });
        const orderId = order._id;

        
        // take one by one seller and add orderid into their ordersList
        body.sellerIdList.map(async (sellerId) => {
            const seller = await sellerCollection.findOne({ _id: sellerId });
            seller.ordersList.push(orderId);
            await sellerCollection.updateOne({ _id: sellerId }, { $set: { ordersList: seller.ordersList }});
        });
        
        // add order customer's orders list also empty the bagList at customer side
        const customer = await customerCollection.findOne({ _id: body.customerId });
        customer.orders.push(orderId);
        customer.bag = [];
        await customerCollection.updateOne({ _id: body.customerId}, { $set: { orders: customer.orders, bag:customer.bag } });

        res.json({ status: "success", orderId: orderId });

    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleCreateOrder };