const productCollection = require('../../models/productModel');
const sellerCollection = require('../../models/sellerModel');

const handleDeleteProduct = async (req, res) => {
    const body = req.body;
    
    if (!body.id || !body.sellerId){
        return res.json({ status: "data missing" });
    }

    try {
        const found = await productCollection.findOne({ _id: body.id })
        if (!found) {
            return res.json({ status: "notexist" })
        }
        await productCollection.deleteOne({ _id: body.id });

        const foundSeller = await sellerCollection.findOne({ _id: body.sellerId });
        if (!foundSeller) {
            return res.json({ status: "sellernotfound" });
        }
       
        foundSeller.productsList = foundSeller.productsList.filter(productId => String(productId) !== body.id);
        await sellerCollection.updateOne({ _id: body.sellerId }, { $set: { productsList: foundSeller.productsList } });

        res.json({ status: "deleted" });
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleDeleteProduct };