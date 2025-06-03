const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })


const productSchema = new mongoose.Schema({
    name: {
        type: String,  // doing the shcema like this can also add type. required or not
        //we can have many schema types such as validate, etc.
        required: true
    },
    price: {
        type: Number
    },
    qty: {
        online: {
            type: Number

        },
        inStore: {
            type: Number,
            max: [12, 'qty must be less than 12'] // adding error
        }
    },
    onSale: {
        requried: true,
        type: Boolean
    }

})


// const Product = mongoose.model('Product', productSchema);

// const bike = new Product({name: 'Mountain Bike', price: 599})
// bike.save()

// productSchema.findOneAndUpdate({name: 'Tire Pump'}, {price: 100},{runValidator: true} ) 
// //validation on ODMs are usually only applied on newly create object
// //if you want it to run also during update than need to add 'runValidator: true'
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("ERROR BRUH")
//         console.log(err)
//     })

    //adding methods to our schema
const Product = mongoose.model('Product', productSchema);


const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct)
}

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}


productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}
