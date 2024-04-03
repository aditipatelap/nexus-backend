const productCollection = require('../../models/productModel');

const handleGetAllProducts = async (req, res) => {
    try {
        const products = await productCollection.find();

        if(products){
            res.json({ status: "success", products: products });
        }
        else {
            res.json({ status: "No product found" })
        }
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleGetAllProducts };