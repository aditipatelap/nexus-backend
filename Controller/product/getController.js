const productCollection = require('../../models/productModel');

const handleGetProduct = async (req, res) => {
    try {
        const { productsList } = req.body;
        const products = [];

        for (const productId of productsList) {
            const product = await productCollection.findOne({_id: productId})

            if(product){
                // console.log(productId + ": found");
                products.push({
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
                })
            }
            else{
                console.log(productId + ": not found");
            }
        }

        res.json({ status: "success", products: products});
    }
    catch (e) {
        console.error(e);
        res.json({ status: "fail" })
    }
}

module.exports = { handleGetProduct };