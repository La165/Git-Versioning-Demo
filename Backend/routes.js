const express = require("express");
const { getAllVegProducts, getAllNonVegProducts, getAllSweets, getAllDrinkProducts, getAllDessertProducts, saveSweets,
     getAllBreakfastProducts, getAllSnacksProducts, getAllFastFoodProducts, getAllSoupsProducts, getAllBakeryProducts,
      saveDessertProducts, saveBreakfastProducts, saveSnackProducts, saveFastfoodProducts, saveSoupProducts, 
      saveBakeryProducts, createVegProducts, createNonVegProducts, saveDrinkProducts, 
      createOrders,
      getAllOrderedProducts,
      loginUser,
      registerController} = require("./controller");
const authMiddleware = require("./authMiddleware");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginUser);

router.use(authMiddleware);

router.get("/veg",getAllVegProducts);
router.get("/nonveg", getAllNonVegProducts);
router.get("/sweets", getAllSweets);
router.get("/drinks", getAllDrinkProducts);
router.get("/desserts", getAllDessertProducts);
router.get("/breakfast", getAllBreakfastProducts);
router.get("/snacks", getAllSnacksProducts);
router.get("/fastfood", getAllFastFoodProducts);
router.get("/soups", getAllSoupsProducts);
router.get("/bakery", getAllBakeryProducts);
router.get("/orders", getAllOrderedProducts);



router.post("/saveVeg", createVegProducts);
router.post("/saveNonveg",createNonVegProducts);
router.post("/saveSweets",saveSweets);
router.post("/saveDrinks",saveDrinkProducts);
router.post("/saveDesserts",saveDessertProducts);
router.post("/saveBreakfast",saveBreakfastProducts);
router.post("/saveSnacks",saveSnackProducts);
router.post("/saveFastfood",saveFastfoodProducts);
router.post("/saveSoups",saveSoupProducts);
router.post("/saveBakery",saveBakeryProducts);
router.post("/saveOrders",createOrders);




module.exports = router;
