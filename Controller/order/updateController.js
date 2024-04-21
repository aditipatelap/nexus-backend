const orderCollection = require('../../models/orderModel');
const mailController = require('./mailController');

const handleUpdateOrder = async (req, res) => {
    try {
        const body = req.body;

        // if data is missing
        if (!body.orderId || !body.productId || !body.action){
            return res.json({ status: "data missing" });
        }

        const order = await orderCollection.findOne({ _id: body.orderId})
        const updateStageList = [];
        let productName;

        for(let i = 0; i < order.productIdList.length; i++){
            if(String(order.productIdList[i]) === body.productId){
                updateStageList[i] = body.action;
                productName = order.productNameList[i];
            }
            else{
                updateStageList[i] = order.stageList[i];
            }
        }

        await orderCollection.updateOne({ _id: body.orderId}, { $set: { stageList: updateStageList } });
        
        res.json({ status: "updated" });

        // send mail notification
        mailController.handleSendMail(body.orderId, order.customerId, body.productId, productName, body.action)

    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleUpdateOrder };