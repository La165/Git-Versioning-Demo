const { addNonVegProducts, addVegProducts, fetchAllVegProducts, fetchAllNonVegProducts, 
    addDessertProducts, fetchAllSweets, fetchAllDrinkProducts, fetchAllDessertProducts, addDrinkProducts,
     addSweets, addSnacks, addBreakfastProducts, fetchAllBreakfastProducts, fetchAllSnackProducts, addFastfood, addSoups, addBakery, 
     fetchAllFastfoodProducts,
     fetchAllSoupProducts,
     fetchAllBakeryProducts,
     fetchAllOrderedProducts,
     createNewOrder,
     registerUser,
     loginService,
     } = require("./service");

//post calls
const createVegProducts = async (req, res) => {
    let newVegProducts = req.body;
    await addVegProducts(newVegProducts);
    res.send("Veg items added successfully");
};

const createNonVegProducts = async (req, res) => {
    let newNonVegProducts = req.body;
    await addNonVegProducts(newNonVegProducts);
    res.send("Non-veg items added successfully");
};


const saveSweets = async (req, res) => {
    let newSweets = req.body;
    await addSweets(newSweets);
    res.send("sweet items added successfully");
};

const saveDrinkProducts = async (req, res) => {
    let newDrinkProducts = req.body;
    await addDrinkProducts(newDrinkProducts);
    res.send("Drink items added successfully");
};
 
const saveDessertProducts = async (req, res) => {
    let newDessertProducts = req.body;
    await addDessertProducts(newDessertProducts);
    res.send("dessert items added successfully");
};


const saveBreakfastProducts = async (req, res) => {
    let newBreakfastProducts = req.body;
    await addBreakfastProducts(newBreakfastProducts);
    res.send("Breakfast items added successfully");
};

const saveFastfoodProducts = async (req, res) => {
    let newFastfoodProducts = req.body;
    await addFastfood(newFastfoodProducts);
    res.send("Fastfood  items added successfully");
};


const saveSnackProducts = async (req, res) => {
    let newSnackProducts = req.body;
    await addSnacks(newSnackProducts);
    res.send("Snack  items added successfully");
};

const saveSoupProducts = async (req, res) => {
    let newSoupProducts = req.body;
    await addSoups(newSoupProducts);
    res.send("Soups items added successfully");
};

const saveBakeryProducts = async (req, res) => {
    let newBakeryProducts = req.body;
    await addBakery(newBakeryProducts);
    res.send("Bakery items added successfully");
};

const createOrders = async (req, res) => {
  try {
    const orderDetails = req.body;
    const savedOrder = await createNewOrder(orderDetails);
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error while placing order", error: error.message });
  }
};



//get call methods
const getAllVegProducts = async (req, res) => {
    const products = await fetchAllVegProducts();
    res.send(products);
};

const getAllNonVegProducts = async (req, res) => {
    const products = await fetchAllNonVegProducts();
    res.send(products);
};

const getAllSweets = async (req, res) => {
    const products = await fetchAllSweets();
    res.send(products);
};
const getAllDrinkProducts = async (req, res) => {
    const products = await fetchAllDrinkProducts();
    res.send(products);
};
const getAllDessertProducts = async (req, res) => {
    const products = await fetchAllDessertProducts();
    res.send(products);
};

const getAllBreakfastProducts = async (req, res) => {
    const products = await fetchAllBreakfastProducts();
    res.send(products);
};

const getAllSnacksProducts = async (req, res) => {
    const products = await fetchAllSnackProducts();
    res.send(products);
};

const getAllFastFoodProducts = async (req, res) => {
    const products = await fetchAllFastfoodProducts();
    res.send(products);
};

const getAllSoupsProducts = async (req, res) => {
    const products = await fetchAllSoupProducts();
    res.send(products);
};

const getAllBakeryProducts = async (req, res) => {
    const products = await fetchAllBakeryProducts();
    res.send(products);
};

// const getAllOrderedProducts = async (req, res) => {
//     const products = await fetchAllOrderedProducts();
//     res.send(products);
// };

const getAllOrderedProducts = async (req, res) => {
  try {
    const orders = await fetchAllOrderedProducts();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Cannot fetch orders",
      error: error.message
    });
  }
};

const registerController = async (req, res) => {

  try {
    const result = await registerUser(req.body);

    if (!result.status) {
      return res.status(400).json(result);
    }

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required",
        user: null,
        token: null
      });
    }

    const result = await loginService(email, password);

    if (!result.status) {
      return res.status(401).json(result);
    }

    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server Error",
      error: error.message
    });
  }
};










module.exports = {
    createVegProducts,
    createNonVegProducts,
    saveSweets,
    saveDrinkProducts,
    saveDessertProducts,
    saveBreakfastProducts,
    saveSnackProducts,saveBakeryProducts,saveFastfoodProducts,saveSoupProducts,
    getAllVegProducts,
    getAllNonVegProducts,
    getAllSweets,
    getAllDrinkProducts,
    getAllDessertProducts,
    getAllBreakfastProducts,
    getAllSnacksProducts,
    getAllBakeryProducts,getAllFastFoodProducts,getAllSoupsProducts,
    createOrders,getAllOrderedProducts,loginUser,registerController
};
