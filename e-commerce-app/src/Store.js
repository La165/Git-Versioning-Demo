import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { coupons } from "./Coupon";

//veg thunk
export const fetchVegProducts=createAsyncThunk('veg/fetchVegProducts',
  async()=>{
    const response=await axios.get('http://localhost:6001/api/v1/products/veg');
    return response.data;
  }
)
//nonveg thunk
export const fetchNonVegProducts=createAsyncThunk('nonveg/fetchNonVegProducts',
  async()=>{
    const response=await axios.get('http://localhost:6001/api/v1/products/nonveg');
    return response.data;
  }
)
//sweet thunk
export const fetchSweets=createAsyncThunk('sweets/fetchSweetsProducts',
  async()=>{
    const response=await axios.get('http://localhost:6001/api/v1/products/sweets');
    return response.data;
  }
)

//drink thunk
export const fetchDrinkProducts=createAsyncThunk('drinks/fetchDrinkProducts',
  async()=>{
    const response=await axios.get('http://localhost:6001/api/v1/products/drinks');
    return response.data;
  }
)

//dessert thunk
export const fetchDessertProducts=createAsyncThunk('desserts/fetchDessertProducts',
  async()=>{
    const response=await axios.get('http://localhost:6001/api/v1/products/desserts');
    return response.data;
  }
)

//breakfast thunk
export const fetchBreakfastProducts=createAsyncThunk('breakfast/fetchBreakfastProducts',
  async()=>{
    const response=await axios.get('http://localhost:6001/api/v1/products/breakfast');
    return response.data;
  }
)

//snack thunk
export const fetchSnackProducts=createAsyncThunk('snacks/fetchSnackProducts',
  async()=>{
    const response=await axios.get('http://localhost:6001/api/v1/products/snacks');
    return response.data;
  }
)


//fastFood thunk
export const fetchFastfoodProducts=createAsyncThunk('fastfood/fetchFastfoodProducts',
  async()=>{
    const response=await axios.get('http://localhost:6001/api/v1/products/fastfood');
    return response.data;
  }
)
//soups thunk
export const fetchSoupProducts=createAsyncThunk('soups/fetchSoupProducts',
  async()=>{
    const response=await axios.get('http://localhost:6001/api/v1/products/soups');
    return response.data;
  }
)
// bakery thunk
export const fetchBakeryProducts=createAsyncThunk('bakery/fetchBakeryProducts',
  async()=>{
    const response=await axios.get('http://localhost:6001/api/v1/products/bakery');
    return response.data;
  }
)
//post orders
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData) => {
    const res = await axios.post("http://localhost:6001/api/v1/products/saveOrders", orderData);
    return res.data;
  }
);

// GET ORDERS
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const res = await axios.get("http://localhost:6001/api/v1/products/orders");
    return res.data;
  }
);
// order slice
let ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // POST ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.loading = false;

      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        
      });
    },
  });

  //get orders slice
  let getOrderSlice=createSlice({
    name:"getOrders",
    initialState:
    {
      getOrderedItems:[],
      loading:false,
      error:null
    },
    reducers:{},
    extraReducers:(builder)=>
    {
      builder

      // GET ORDERS
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.getOrderedItems= action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});



//veg Slice
let vegSlice=createSlice({
    name:"veg",
    initialState:
    {
      vegItems:[],
      loading:false,
      error:null
    },
    reducers:{},
    extraReducers:(builder)=>
    {
      builder
      .addCase(fetchVegProducts.fulfilled,
        (state,action)=>{
          state.vegItems=action.payload;
          state.loading = false;
        })
        .addCase(fetchVegProducts.pending,
        (state)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(fetchVegProducts.rejected,
        (state,action)=>{
          state.loading = false;
          state.error=action.error;
        });
    },

  });
//non veg Slice
  let nonvegSlice=createSlice({
    name:"nonveg",
    initialState:
    {
      nonVegItems:[],
      loading:false,
      error:null
    },
    reducers:{},
    extraReducers:(builder)=>
    {
      builder
      .addCase(fetchNonVegProducts.fulfilled,
        (state,action)=>{
          state.nonVegItems=action.payload;
          state.loading = false;
        })
        .addCase(fetchNonVegProducts.pending,
        (state)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(fetchNonVegProducts.rejected,
        (state,action)=>{
          state.loading = false;
          state.error=action.error;
        });
    },

  });

//sweetSLice
  let sweetSlice=createSlice({
    name:"sweets",
    initialState:
    {
      sweetItems:[],
      loading:false,
      error:null
    },
    reducers:{},
    extraReducers:(builder)=>
    {
      builder
      .addCase(fetchSweets.fulfilled,
        (state,action)=>{
          state.sweetItems=action.payload;
          state.loading = false;
        })
        .addCase(fetchSweets.pending,
        (state)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(fetchSweets.rejected,
        (state,action)=>{
          state.loading = false;
          state.error=action.error;
        });
    },

  });
//drinks Slice
  let drinkSlice=createSlice({
    name:"drinks",
    initialState:
    {
      drinks:[],
      loading:false,
      error:null
    },
    reducers:{},
    extraReducers:(builder)=>
    {
      builder
      .addCase(fetchDrinkProducts.fulfilled,
        (state,action)=>{
          state.drinks=action.payload;
          state.loading = false;
        })
        .addCase(fetchDrinkProducts.pending,
        (state)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(fetchDrinkProducts.rejected,
        (state,action)=>{
          state.loading = false;
          state.error=action.error;
        });
    },

  });

//dessertSlice
  let dessertSlice=createSlice({
    name:"desserts",
    initialState:
    {
      desserts:[],
      loading:false,
      error:null
    },
    reducers:{},
    extraReducers:(builder)=>
    {
      builder
      .addCase(fetchDessertProducts.fulfilled,
        (state,action)=>{
          state.desserts=action.payload;
          state.loading = false;
        })
        .addCase(fetchDessertProducts.pending,
        (state)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(fetchDessertProducts.rejected,
        (state,action)=>{
          state.loading = false;
          state.error=action.error;
        });
    },

  });
//breakfast slice
  let breakfastSlice=createSlice({
    name:"breakfast",
    initialState:
    {
      breakfast:[],
      loading:false,
      error:null
    },
    reducers:{},
    extraReducers:(builder)=>
    {
      builder
      .addCase(fetchBreakfastProducts.fulfilled,
        (state,action)=>{
          state.breakfast=action.payload;
          state.loading = false;
        })
        .addCase(fetchBreakfastProducts.pending,
        (state)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(fetchBreakfastProducts.rejected,
        (state,action)=>{
          state.loading = false;
          state.error=action.error;
        });
    },

  });


  //snacksSlice
  let snacksSlice=createSlice({
    name:"snacks",
    initialState:
    {
      snacks:[],
      loading:false,
      error:null
    },
    reducers:{},
    extraReducers:(builder)=>
    {
      builder
      .addCase(fetchSnackProducts.fulfilled,
        (state,action)=>{
          state.snacks=action.payload;
          state.loading = false;
        })
        .addCase(fetchSnackProducts.pending,
        (state)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(fetchSnackProducts.rejected,
        (state,action)=>{
          state.loading = false;
          state.error=action.error;
        });
    },

  });

//fastfood slice

  let fastfoodSlice=createSlice({
    name:"fastfood",
    initialState:
    {
      fastfood:[],
      loading:false,
      error:null
    },
    reducers:{},
    extraReducers:(builder)=>
    {
      builder
      .addCase(fetchFastfoodProducts.fulfilled,
        (state,action)=>{
          state.fastfood=action.payload;
          state.loading = false;
        })
        .addCase(fetchFastfoodProducts.pending,
        (state)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(fetchFastfoodProducts.rejected,
        (state,action)=>{
          state.loading = false;
          state.error=action.error;
        });
    },

  });

  //soups slice

  let soupsSlice=createSlice({
    name:"soups",
    initialState:
    {
      soups:[],
      loading:false,
      error:null
    },
    reducers:{},
    extraReducers:(builder)=>
    {
      builder
      .addCase(fetchSoupProducts.fulfilled,
        (state,action)=>{
          state.soups=action.payload;
          state.loading = false;
        })
        .addCase(fetchSoupProducts.pending,
        (state)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(fetchSoupProducts.rejected,
        (state,action)=>{
          state.loading = false;
          state.error=action.error;
        });
    },

  });


  // bakery slice
  let bakerySlice=createSlice({
    name:"bakery",
    initialState:
    {
      bakery:[],
      loading:false,
      error:null
    },
    reducers:{},
    extraReducers:(builder)=>
    {
      builder
      .addCase(fetchBakeryProducts.fulfilled,
        (state,action)=>{
          state.bakery=action.payload;
          state.loading = false;
        })
        .addCase(fetchBakeryProducts.pending,
        (state)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(fetchBakeryProducts.rejected,
        (state,action)=>{
          state.loading = false;
          state.error=action.error;
        });
    },

  });

//coupon slice
  const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    code: "",
    discount: 0,
    applied: false,
    message: "",
  },

  reducers: {
    applyCoupon: (state, action) => {
      const enteredCode = action.payload;

      if (coupons[enteredCode]) {
        state.code = enteredCode;
        state.discount = coupons[enteredCode];
        state.applied = true;
        state.message = `${enteredCode} applied! You got ${coupons[enteredCode]}% off`;
      } else {
        state.applied = false;
        state.discount = 0;
        state.message = "Invalid coupon code";
      }
    },
  },
});

//cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    decreaseQuantity: (state, action) => {
      const index = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        if (state[index].quantity === 1) {
          state.splice(index, 1);
        } else {
          state[index].quantity -= 1;
        }
      }
    },

    removeFromCart: (state, action) => {
      const index = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});
export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/products/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server Error");
    }
  }
);


let registrationSlice=createSlice(
  {
    name: "auth",
    initialState : {
  loading: false,
  user: null,
  message: "",
  error: "",
},
reducers:{},
extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Registration failed";
      });
  },



  });



export const { addToCart, decreaseQuantity, removeFromCart} =cartSlice.actions;
export const{applyCoupon}=couponSlice.actions;

const store = configureStore({
  reducer: {
    veg:vegSlice.reducer,
    nonveg:nonvegSlice.reducer,
    sweets:sweetSlice.reducer,
    drinks:drinkSlice.reducer,
    desserts:dessertSlice.reducer,
    breakfast:breakfastSlice.reducer,
    snacks:snacksSlice.reducer,
    fastfood:fastfoodSlice.reducer,
    soups:soupsSlice.reducer,
    bakery:bakerySlice.reducer,
    cart: cartSlice.reducer,
    coupon: couponSlice.reducer, 
    Orders: ordersSlice.reducer,
    getOrders:getOrderSlice.reducer ,
    auth:registrationSlice.reducer 
  },
});

export default store;
