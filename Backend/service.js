const { default: mongoose } = require("mongoose");
const { productSchema, orderSchema } = require("./schema");


const VegProductModel=mongoose.model("veg",productSchema);
const NonvegProductModel=mongoose.model("nonveg",productSchema);
const SweetsModel=mongoose.model("sweet",productSchema);
const DrinksProductModel=mongoose.model("drink",productSchema);
const DessertsProductModel=mongoose.model("dessert",productSchema);
const BreakfastProductModel=mongoose.model("breakfast",productSchema);
const SnacksModel=mongoose.model("snack",productSchema);
const FastfoodModel=mongoose.model("fastfood",productSchema);
const SoupsModel=mongoose.model("soup",productSchema);
const BakeryModel=mongoose.model("bakery",productSchema);

const OrderModel=mongoose.model("order",orderSchema);



const createNewOrder = async (orderData) => {
  const { items, totalAmount } = orderData;

  if (!items || !items.length || !totalAmount) {
    throw new Error("Items and totalAmount are required");
  }

  const newOrder = new OrderModel(orderData);
  return await newOrder.save();
};



const addVegProducts = async(newVegProducts)=>{
        await VegProductModel.insertMany(newVegProducts)

}

const addNonVegProducts = async(newNonVegProducts)=>{
            await NonvegProductModel.insertMany(newNonVegProducts)

}

const addSweets = async(newSweets)=>{
            await SweetsModel.insertMany(newSweets)

}

const addDrinkProducts = async(newDrinkProducts)=>{
            await DrinksProductModel.insertMany(newDrinkProducts)

}
const addDessertProducts = async(newDessertProducts)=>{
            await DessertsProductModel.insertMany(newDessertProducts)

}

const addBreakfastProducts = async(newBreakfastProducts)=>{
            await BreakfastProductModel.insertMany(newBreakfastProducts)

}

const addSnacks = async(newSnackProducts)=>{
            await SnacksModel.insertMany(newSnackProducts)

}

const addFastfood = async(newFastfoodProducts)=>{
            await FastfoodModel.insertMany(newFastfoodProducts)

}

const addSoups = async(newSoupProducts)=>{
            await SoupsModel.insertMany(newSoupProducts)

}
const addBakery = async(newBakeryProducts)=>{
            await BakeryModel.insertMany(newBakeryProducts)

}


const  fetchAllVegProducts=async() =>
{
    return await VegProductModel.find();
}
const  fetchAllNonVegProducts=async() =>
{
    return await NonvegProductModel.find();
}

const  fetchAllSweets=async() =>
{
    return await SweetsModel.find();
}

const  fetchAllDrinkProducts=async() =>
{
    return await DrinksProductModel.find();
}

const  fetchAllDessertProducts=async() =>
{
    return await DessertsProductModel.find();
}

const  fetchAllBreakfastProducts=async() =>
{
    return await BreakfastProductModel.find();
}

const  fetchAllSnackProducts=async() =>
{
    return await SnacksModel.find();
}

const  fetchAllFastfoodProducts=async() =>
{
    return await FastfoodModel.find();
}

const  fetchAllSoupProducts=async() =>
{
    return await SoupsModel.find();
}

const  fetchAllBakeryProducts=async() =>
{
    return await BakeryModel.find();
}



const fetchAllOrderedProducts = async () => {
  return await OrderModel.find().sort({ createdAt: -1 });
};






module.exports={addVegProducts,addNonVegProducts,addSweets,addDrinkProducts,createNewOrder,
    addBreakfastProducts,addSnacks,addFastfood,addSoups,addBakery,fetchAllBreakfastProducts,
    fetchAllSnackProducts,fetchAllFastfoodProducts,fetchAllSoupProducts,fetchAllBakeryProducts,fetchAllOrderedProducts,
    addDessertProducts,fetchAllVegProducts,fetchAllNonVegProducts,fetchAllSweets,fetchAllDrinkProducts,fetchAllDessertProducts}