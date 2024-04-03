const customerCollection = require('../../models/customerModel');

const handleRemoveBag = async (req, res) => {
    // product-id and customer-id are required
    const body = req.body;

    // if data is missing
    if (!body.productId || !body.customerId){
        return res.json({ status: "data missing" });
    }

    try {
        // add product id into customer's Bag List
        const customer = await customerCollection.findOne({ _id: body.customerId });
        if (!customer) {
            return res.json({ status: "customer not found" });
        }
        
        // add into list
        customer.bag = customer.bag.filter(id => String(id) !== body.productId)

        // update into database
        await customerCollection.updateOne({ _id: body.customerId}, { $set: { bag: customer.bag } });

        res.json({ status: "removed" });
    } 
    catch (error) {
        console.error(e);
        res.json({ status: "fail" })    
    }

}

module.exports = { handleRemoveBag };