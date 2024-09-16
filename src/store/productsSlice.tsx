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
  productCategory: string;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  status: "idle",
  error: null,
  searchTerm: "",
  currentPage: 1,
  itemsPerPage: 9,
  totalPages: 1,
};

const shuffleArray = (array: Product[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
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
    productCategory:"GPU",
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
    productCategory: "GPU",
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
    productCategory: "GPU",
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
    productCategory: "GPU",
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
    productCategory: "GPU",
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
    productCategory: "GPU",
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
    productCategory: "GPU",
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
    productCategory: "GPU",
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
    productCategory: "GPU",
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
    productCategory: "GPU",
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
    productCategory: "GPU",
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
    productCategory: "GPU",
  },
  {
    id: 13,
    name: "Processador AMD Ryzen 9 9950X, 4.3GHz (5.7GHz Turbo), 16-Cores 32-Threads, AM5",
    specs: {
      memoryClock: "4.3GHz (5.7GHz Turbo)",
      memorySize: "16-Cores 32-Threads",
      memoryType: "AM5",
    },
    price: 6299,
    photoName: "productsImg/product13.jpg",
    soldOut: false,
    productCategory: "CPU",
  },
  {
    id: 14,
    name: "Processador AMD Ryzen 5 8400F, 4.2GHz (4.7GHz Turbo), 6-Cores 12-Threads, AM5",
    specs: {
      memoryClock: "4.2GHz (4.7GHz Turbo)",
      memorySize: "6-cores 12-threads",
      memoryType: "AM5",
    },
    price: 899,
    photoName: "productsImg/product14.jpg",
    soldOut: false,
    productCategory: "CPU",
  },
  {
    id: 15,
    name: "Processador Intel Core i5 12600KF 3.7GHz (4.9GHz Turbo), 12ª Geração, 10-Cores 16-Threads, LGA 1700",
    specs: {
      memoryClock: "3.7GHz (4.9GHz Turbo)",
      memorySize: "10-cores 16-threads",
      memoryType: "LGA 1700",
    },
    price: 1100,
    photoName: "productsImg/product15.jpg",
    soldOut: false,
      productCategory: "CPU",
  },
  {
    id: 16,
    name: "Processador Intel Core i3 12100, 3.3GHz (4.3GHz Turbo), 12ª Geração, 4-Cores 8-Threads, LGA 1700",
    specs: {
      memoryClock: "3.3GHz (4.3GHz Turbo)",
      memorySize: "4-cores 8-threads",
      memoryType: "LGA 1700",
    },
      price: 799,
    photoName: "productsImg/product16.jpg",
    soldOut: false,
    productCategory: "CPU",
  },
  {
    id: 17,
    name: "Processador AMD Ryzen 9 5950X 3.4GHz (4.9GHz Turbo), 16-Cores 32-Threads, AM4 ",
    specs: {
      memoryClock: "3.4GHz (4.9GHz Turbo)", 
      memorySize: "16-cores 32-threads", 
      memoryType: "AM4",
    },
    price: 2869,
    photoName: "productsImg/product17.jpg",
    soldOut: false,
    productCategory: "CPU",
  },
  {
    id: 18,
    name: "Processador Intel Core i9 12900K 3.2GHz (5.2GHz Turbo), 12ª Geração, 16-Cores 24-Threads, LGA 1700",
    specs: {
      memoryClock: "3.2GHz (5.2GHz Turbo)", 
      memorySize: "16-cores 24-threads",  
      memoryType: "LGA 1700",
    },
    price: 2300,
    photoName: "productsImg/product18.jpg",
    soldOut: false,
    productCategory: "CPU",
  },
  {
    id: 19,
    name: "Processador AMD Ryzen 7 7700X 4.5GHz (5.4GHz Turbo), 8-Cores 16-Threads, AM5",
    specs: {
      memoryClock: "4.5GHz (5.4GHz Turbo)", 
      memorySize: "8-cores 16-threads",   
      memoryType: "AM5",
    },
    price: 2599,
    photoName: "productsImg/product19.jpg",
    soldOut: false, 
    productCategory: "CPU",
  },  
  {
    id: 20,
    name: "Processador AMD Athlon 3000G, 3.5GHz, 2-Cores, 4-Threads, 4Mb Cache, AM4",
    specs: {
      memoryClock: "3.5GHz",  
      memorySize: "2-cores 4-threads",
      memoryType: "GDDR6",
    },
    price: 329,
    photoName: "productsImg/product20.jpg",
    soldOut: false,
    productCategory: "CPU",
  },
  {
    id: 21,
    name: "Processador AMD Ryzen 3 3200G, 3.6GHz (4.0GHz Turbo), 4-Cores 4-Threads, Cooler Wraith Stealth, AM4",
    specs: {
      memoryClock: "3.6GHz (4.0GHz Turbo)", 
      memorySize: "4-cores 4-threads",
      memoryType: "AM4",
    },
    price: 499,
    photoName: "productsImg/product21.jpg",
    soldOut: false,
    productCategory: "CPU",
  },
  {
    id: 22,
    name: "Placa Mãe Asus Rog Maximus Z790 Formula, Chipset Z790, Wi-Fi, Intel LGA 1700",
    specs: {
      memoryClock: "Z790",
      memorySize: "Intel LGA 1700",
      memoryType: "DDR5",
    },
    price: 2599,
    photoName: "productsImg/product22.jpg",
    soldOut: false,
    productCategory: "MOTHERBOARD",
  },
  {
    id: 23,
    name: "Placa Mãe Gigabyte Z790 AORUS TACHYON X, Chipset Z790, WIFI, Intel LGA 1700",
    specs: {
      memoryClock: "Z790",
      memorySize: "Intel LGA 1700",
      memoryType: "DDR5",
    },
    price: 4819,
    photoName: "productsImg/product23.jpg",
    soldOut: false,
    productCategory: "MOTHERBOARD",
  },
  {
    id: 24,
    name: "Placa Mãe ASRock X670E Steel Legend, Chipset X670, AMD AM5",
    specs: {
      memoryClock: "X670",
      memorySize: "AM5",
      memoryType: "DDR5",
    },
    price: 1999,
    photoName: "productsImg/product24.jpg",
    soldOut: false,
    productCategory: "MOTHERBOARD",
  },
  {
    id: 25,
      name: "Placa Mãe Asus TUF Gaming A520M-PLUS WIFI, Chipset A520, AMD AM4, mATX, DDR4",
    specs: {
      memoryClock: "A520",
      memorySize: "AM4",
      memoryType: "DDR4",
    },
    price: 649,
    photoName: "productsImg/product25.jpg",
    soldOut: false,
    productCategory: "MOTHERBOARD",
  },
  {
    id: 26,
    name: "Placa Mãe Gigabyte B550M AORUS Elite, Chipset B550, AMD AM4, mATX, DDR4",
    specs: {
      memoryClock: "B550",
      memorySize: "AM4",
      memoryType: "DDR4",
    },
    price: 799,
    photoName: "productsImg/product26.jpg",
    soldOut: false,
    productCategory: "MOTHERBOARD",
  },
  
];

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulating API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return shuffleArray(productData); // Shuffle only when fetching
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
      state.totalPages = Math.ceil(state.filteredItems.length / state.itemsPerPage);
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
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
          state.totalPages = Math.ceil(action.payload.length / state.itemsPerPage);
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSearchTerm, setCurrentPage } = productsSlice.actions;
export default productsSlice.reducer;