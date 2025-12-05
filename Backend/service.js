const { default: mongoose } = require("mongoose");
const { productSchema, orderSchema, userSchema } = require("./schema");


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

const userModel=mongoose.model("user",userSchema)
const registerUser = async (data) => {
  const { name, email, password, phone, address } = data;

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return { status: false, message: "Email already registered" };
  }

  const newUser = await userModel.create({
    name,
    email,
    password,   // NO HASHING
    phone,
    address
  });

  return {
    status: true,
    message: "Registration Successful!",
    user: newUser
  };
};

const jwt = require("jsonwebtoken");

const loginService = async (email, password) => {
  const user = await userModel.findOne({ email });

  // User not found
  if (!user) {
    return {
      status: false,
      message: "User not found",
      user: null,
      token: null
    };
  }

  // Password mismatch
  if (user.password !== password) {
    return {
      status: false,
      message: "Incorrect password",
      user: null,
      token: null
    };
  }

  // Prepare user data (remove password)
  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address
  };

  // Generate JWT Token
  const token = jwt.sign(
    { id: user._id, email: user.email },  // payload
    process.env.JWT_SECRET,              // secret key
    { expiresIn: process.env.JWT_EXPIRES_IN }  // expiry
  );

  return {
    status: true,
    message: "Login Successful!",
    user: userData,
    token: token
  };
};






module.exports={addVegProducts,addNonVegProducts,addSweets,addDrinkProducts,createNewOrder,registerUser,
    addBreakfastProducts,addSnacks,addFastfood,addSoups,addBakery,fetchAllBreakfastProducts,loginService,
    fetchAllSnackProducts,fetchAllFastfoodProducts,fetchAllSoupProducts,fetchAllBakeryProducts,fetchAllOrderedProducts,
    addDessertProducts,fetchAllVegProducts,fetchAllNonVegProducts,fetchAllSweets,fetchAllDrinkProducts,fetchAllDessertProducts}