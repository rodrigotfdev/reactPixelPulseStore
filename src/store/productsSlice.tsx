import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: number
  name: string
  specs: {
    memoryClock: string
    memorySize: string
    memoryType: string
  }
  price: number
  photoName: string
  soldOut: boolean
}

interface ProductsState {
  items: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
}

export const productData: Product[] = [
    {
        id: 1,
        name: "Placa de Vídeo Gigabyte NVIDIA GeForce RTX 3060 WINDFORCE OC",
        specs: {
          memoryClock: 1500 + " Mhz",
          memorySize: 12 + " Gb",
          memoryType: "GDDR6",
        },
        price: 1799,
        photoName: "productsImg/product01.jpg",
        soldOut: false,
      },
      {
        id: 2,
        name: "Placa De Vídeo Gigabyte AMD Radeon RX 7600 Gaming OC",
        specs: {
          memoryClock: 18 + " Gbps",
          memorySize: 8 + " Gb",
          memoryType: "GDDR6",
        },
        price: 1799,
        photoName: "productsImg/product02.jpg",
        soldOut: false,
      },
      {
        id: 3,
        name: "Placa de Vídeo PowerColor Fighter Radeon RX 6600",
        specs: {
          memoryClock: 14 + " Gbps",
          memorySize: 8 + " Gb",
          memoryType: "GDDR6",
        },
        price: 1299,
        photoName: "productsImg/product03.jpg",
        soldOut: false,
      },
      {
        id: 4,
        name: "Placa de Vídeo INNO3D GeForce RTX 3060 TWIN X2",
        specs: {
          memoryClock: 15 + " Gbps",
          memorySize: 12 + " Gb",
          memoryType: "GDDR6",
        },
        price: 1699,
        photoName: "productsImg/product04.jpg",
        soldOut: false,
      },
      {
        id: 5,
        name: "Placa de Vídeo Galax GeForce GTX 1650 EX PLUS",
        specs: {
          memoryClock: 18 + " Gbps",
          memorySize: 4 + " Gb",
          memoryType: "GDDR6",
        },
        price: 879,
        photoName: "productsImg/product05.png",
        soldOut: false,
      },
      {
        id: 6,
        name: "Placa De Video Gigabyte GeForce RTX 4070 Ti Eagle OC",
        specs: {
          memoryClock: 2625 + " Mhz",
          memorySize: 12 + "Gb",
          memoryType: "GDDR6",
        },
        price: 5999,
        photoName: "productsImg/product06.png",
        soldOut: false,
      },
      {
        id: 7,
        name: "Placa De Vídeo Galax NVIDIA GeForce RTX 4070 EX Gamer",
        specs: {
          memoryClock: 2550 + " Mhz",
          memorySize: 12 + "Gb",
          memoryType: "GDDR6",
        },
        price: 4479,
        photoName: "productsImg/product07.png",
        soldOut: false,
      },
      {
        id: 8,
        name: "Placa de Vídeo Asus Dual NVIDIA GeForce RTX 4060 Ti OC",
        specs: {
          memoryClock: 2550 + " Mhz",
          memorySize: 8 + "Gb",
          memoryType: "GDDR6",
        },
        price: 2399,
        photoName: "productsImg/product08.png",
        soldOut: false,
      },
      {
        id: 9,
        name: "Placa de Vídeo PowerColor Hellhound AMD Radeon RX 6650 XT",
        specs: {
          memoryClock: 2550 + " Mhz",
          memorySize: 12 + "Gb",
          memoryType: "GDDR6",
        },
        price: 2849,
        photoName: "productsImg/product09.png",
        soldOut: false,
      },
      {
        id: 10,
        name: "Placa de Vídeo AsRock AMD Radeon RX 7600 Phantom Gaming OC",
        specs: {
          memoryClock: 2550 + " Mhz",
          memorySize: 8 + "Gb",
          memoryType: "GDDR6",
        },
        price: 1999,
        photoName: "productsImg/product10.png",
        soldOut: false,
      },
      {
        id: 11,
        name: "Placa de Vídeo INNO3D NVIDIA GeForce RTX 4070 X3 OC",
        specs: {
          memoryClock: 1920 + " Mhz",
          memorySize: 12 + "Gb",
          memoryType: "GDDR6",
        },
        price: 4299,
        photoName: "productsImg/product11.jpg",
        soldOut: false,
      },
      {
        id: 12,
        name: "Placa de Vídeo MSI AMD Radeon RX 6650 XT MECH 2X, OC",
        specs: {
          memoryClock: 2699 + " Mhz",
          memorySize: 8 + "Gb",
          memoryType: "GDDR6",
        },
        price: 1999,
        photoName: "productsImg/product12.png",
        soldOut: false,
      },
]

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // Simulating API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return productData
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch products'
      })
  },
})

export default productsSlice.reducer