const productCollection = require('../../models/productModel');
const sellerCollection = require('../../models/sellerModel');

const handleNewProduct = async (req, res) => {
    try {
        const body = req.body;
        // if data is missing
        if (!body.name || !body.description || !body.sellerId || !body.sellerName || !body.brand || !body.price || !body.category || !body.subCategory || !body.discount || !body.discountType || !body.photo){
            return res.json({ status: "data missing" });
        }
        
        const newProduct = {
            name: body.name,
            description: body.description,
            sellerId: body.sellerId,
            sellerName: body.sellerName,
            brand: body.brand,
            price: body.price,
            category: body.category,
            subCategory: body.subCategory,
            discount: body.discount,
            discountType: body.discountType,
            photo: body.photo,
        }
        
        await productCollection.insertMany([newProduct]);
        
        // get the product id
        const product = await productCollection.findOne({ name: body.name });
        const productId = product._id;

        // add product id into seller's products list
        const seller = await sellerCollection.findOne({ _id: body.sellerId });
        seller.productsList.push(productId);
        
        await sellerCollection.updateOne({ _id: body.sellerId}, { $set: { productsList: seller.productsList } });

        const sendProduct = {
            id: product._id,
            name: product.name,
            description: product.description,
            brand: product.brand,
            price: product.price,
            category: product.category,
            subCategory: product.subCategory,
            discount: product.discount,
            discountType: product.discountType,
            photo: product.photo,
        }

        res.json({ status: "added", item: sendProduct });
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleNewProduct };