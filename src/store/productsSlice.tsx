import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  specs: {
    memoryClock: string;
    memorySize: string;
    memoryType: string;
  };
  price: number;
  photoName: string;
  soldOut: boolean;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchTerm: string;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  status: "idle",
  error: null,
  searchTerm: "",
};

export const productData: Product[] = [
  {
    id: 1,
    name: "Gigabyte NVIDIA GeForce RTX 3060 WINDFORCE OC Graphics Card",
    specs: {
      memoryClock: "1500 MHz",
      memorySize: "12 GB",
      memoryType: "GDDR6",
    },
    price: 1799,
    photoName: "productsImg/product01.jpg",
    soldOut: false,
  },
  {
    id: 2,
    name: "Gigabyte AMD Radeon RX 7600 Gaming OC Graphics Card",
    specs: {
      memoryClock: "18 Gbps",
      memorySize: "8 GB",
      memoryType: "GDDR6",
    },
    price: 1799,
    photoName: "productsImg/product02.jpg",
    soldOut: false,
  },
  {
    id: 3,
    name: "PowerColor Fighter Radeon RX 6600 Graphics Card",
    specs: {
      memoryClock: "14 Gbps",
      memorySize: "8 GB",
      memoryType: "GDDR6",
    },
    price: 1299,
    photoName: "productsImg/product03.jpg",
    soldOut: false,
  },
  {
    id: 4,
    name: "INNO3D GeForce RTX 3060 TWIN X2 Graphics Card",
    specs: {
      memoryClock: "15 Gbps",
      memorySize: "12 GB",
      memoryType: "GDDR6",
    },
    price: 1699,
    photoName: "productsImg/product04.jpg",
    soldOut: false,
  },
  {
    id: 5,
    name: "Galax GeForce GTX 1650 EX PLUS Graphics Card",
    specs: {
      memoryClock: "18 Gbps",
      memorySize: "4 GB",
      memoryType: "GDDR6",
    },
    price: 879,
    photoName: "productsImg/product05.png",
    soldOut: false,
  },
  {
    id: 6,
    name: "Gigabyte GeForce RTX 4070 Ti Eagle OC Graphics Card",
    specs: {
      memoryClock: "2625 MHz",
      memorySize: "12 GB",
      memoryType: "GDDR6",
    },
    price: 5999,
    photoName: "productsImg/product06.png",
    soldOut: false,
  },
  {
    id: 7,
    name: "Galax NVIDIA GeForce RTX 4070 EX Gamer Graphics Card",
    specs: {
      memoryClock: "2550 MHz",
      memorySize: "12 GB",
      memoryType: "GDDR6",
    },
    price: 4479,
    photoName: "productsImg/product07.png",
    soldOut: false,
  },
  {
    id: 8,
    name: "Asus Dual NVIDIA GeForce RTX 4060 Ti OC Graphics Card",
    specs: {
      memoryClock: "2550 MHz",
      memorySize: "8 GB",
      memoryType: "GDDR6",
    },
    price: 2399,
    photoName: "productsImg/product08.png",
    soldOut: false,
  },
  {
    id: 9,
    name: "PowerColor Hellhound AMD Radeon RX 6650 XT Graphics Card",
    specs: {
      memoryClock: "2550 MHz",
      memorySize: "12 GB",
      memoryType: "GDDR6",
    },
    price: 2849,
    photoName: "productsImg/product09.png",
    soldOut: false,
  },
  {
    id: 10,
    name: "AsRock AMD Radeon RX 7600 Phantom Gaming OC Graphics Card",
    specs: {
      memoryClock: "2550 MHz",
      memorySize: "8 GB",
      memoryType: "GDDR6",
    },
    price: 1999,
    photoName: "productsImg/product10.png",
    soldOut: false,
  },
  {
    id: 11,
    name: "INNO3D NVIDIA GeForce RTX 4070 X3 OC Graphics Card",
    specs: {
      memoryClock: "1920 MHz",
      memorySize: "12 GB",
      memoryType: "GDDR6",
    },
    price: 4299,
    photoName: "productsImg/product11.jpg",
    soldOut: false,
  },
  {
    id: 12,
    name: "MSI AMD Radeon RX 6650 XT MECH 2X OC Graphics Card",
    specs: {
      memoryClock: "2699 MHz",
      memorySize: "8 GB",
      memoryType: "GDDR6",
    },
    price: 1999,
    photoName: "productsImg/product12.png",
    soldOut: false,
  },
];

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    // Simulating API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return productData;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload.toLowerCase();
      state.filteredItems = state.items.filter((product) =>
        product.name.toLowerCase().includes(state.searchTerm)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
          state.filteredItems = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;
