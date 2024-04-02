const productCollection = require('../../models/productModel');

const handleUpdateProduct = async (req, res) => {
    try {
        const body = req.body;

        // if data is missing
        if (!body.id || !body.name || !body.description || !body.brand || !body.price || !body.category || !body.subCategory || !body.discount || !body.discountType || !body.photo){
            return res.json({ status: "data missing" });
        }
        
        const updateProduct = {
            name: body.name,
            description: body.description,
            brand: body.brand,
            price: body.price,
            category: body.category,
            subCategory: body.subCategory,
            discount: body.discount,
            discountType: body.discountType,
            photo: body.photo,
        }
        
        const filter = { _id: body.id }
        const found = await productCollection.findOne(filter);

        if (!found) {
            return res.json({ status: "notexist" })
        }

        await productCollection.updateOne(filter, updateProduct);
        res.json({ status: "updated" });
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleUpdateProduct };