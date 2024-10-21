import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string; // Alterado de 'name' para 'productName'
  productDesc: string; // Adicionado para descrição do produto
  price: number;
  photoName: string;
  soldOut: boolean;
  productFamily: string; // Alterado de 'productCategory' para 'productFamily'
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
    name: "Aditivo De Combustível Diesel S10 Bardahl Max S10",
    productDesc: "Este aditivo de combustível é produzido pela Bardahl, uma marca conhecida e respeitada na indústria automotiva. Com o número de peça 436846, você pode ter certeza de que está recebendo um produto genuíno e de alta qualidade. O volume da unidade é de 0.5 L, proporcionando uma quantidade suficiente para múltiplas aplicações.",
    price: 39.89,
    photoName: "productsImg/product01.jpg",
    soldOut: false,
    productFamily: "Aditivo",
  },
  {
    id: 2,
    name: "Macaco Joelho 600kg Universal Bosal Corsa Celta Onix Prisma",
    productDesc: "O Macaco Joelho Maxi Light Universal - Mecanico é um produto de alta qualidade da marca BOSAL, conhecida por sua excelência em equipamentos automotivos.",
    price: 129.68,
    photoName: "productsImg/product02.jpg",
    soldOut: false,
    productFamily: "Ferramentas",
  },
  {
    id: 3,
    name: "Multimetro Com Capacímetro Digital - Mede Capacitor",
    productDesc: "Multímetro Digital Capacímetro Beep Tela Lcd Dt 9205a 9kf possui tensão máxima CC de 1000V, garantindo medições precisas e seguras.",
    price: 99.98,
    photoName: "productsImg/product03.jpg",
    soldOut: false,
    productFamily: "Ferramentas",
  },
  {
    id: 4,
    name: "Chave De Roda Cruz 17x19x21x23 Eda",
    productDesc: "Chave de Roda Cruz 9RU fabricada em aço resistente para maior durabilidade.",
    price: 61.59,
    photoName: "productsImg/product04.jpg",
    soldOut: false,
    productFamily: "Ferramentas",
  },
  {
    id: 5,
    name: "4 Litros Óleo Motor Mineral Castrol Gtx Antiborra Sae 20w50",
    productDesc: "O óleo é uma parte essencial para o bom funcionamento do motor do seu veículo, pois tem a função de limpar e lubrificar, buscando protegê-lo do desgaste e da corrosão.",
    price: 197.78,
    photoName: "productsImg/product05.jpg",
    soldOut: false,
    productFamily: "Óleo",
  },
  {
    id: 6,
    name: "Aditivo Para Radiador Pronto Uso Paraflu 1 litro Rosa",
    productDesc: "Paraflu Bio Orgânico possui a tecnologia Long Life OAT (Organic Acid Tecnology), que aumenta a vida útil do motor lubrificando a bomba d’água, a válvula termostática, evitando o ressecamento das mangueiras e protegendo contra a corrosão todos os tipos de motores.",
    price: 27.99,
    photoName: "productsImg/product06.jpg",
    soldOut: false,
    productFamily: "Aditivo",
  },
  {
    id: 7,
    name: "Pneu 175/70r13 General Tire Altimax One 82t Índice de velocidade T",
    productDesc: "Baixo ruído devido à sua banda de rodagem desenvolvida com tecnologia acústica de modulação de som",
    price: 390.27,
    photoName: "productsImg/product07.jpg",
    soldOut: false,
    productFamily: "Pneu",
  },
  {
    id: 8,
    name: "3 Cera Limpadora E Polidora Orbi-max Proteção E Brilho 200g",
    productDesc: "A cera automotiva Orbi-Max remove a tinta oxidada, manchas e auxilia na remoção de sujidades diversas (piche, insetos) após sua aplicação, deixa uma camada de proteção contra as intempéries",
    price: 53.55,
    photoName: "productsImg/product08.jpg",
    soldOut: false,
    productFamily: "Cera",
  },
  {
    id: 9,
    name: "Kit 02 Cinemático Rodoar Calibrador Roda Pneu Voar Caminhão",
    productDesc: " Este produto de alta qualidade da marca Voar é essencial para manter a calibragem correta dos pneus, garantindo uma melhor performance nas estradas.",
    price: 102.99,
    photoName: "productsImg/product09.jpg",
    soldOut: true,
    productFamily: "Ferramentas",
  },
  {
    id: 10,
    name: "Kit 4 Água Para Bateria E Radiador Desmineralizada Paraflu",
    productDesc: "A Água Desmineralizada PARAFLU é recomendada para uso em sistemas de arrefecimento de motores endotérmicos e também em sistemas elétricos automotivos.",
    price: 49.26,
    photoName: "productsImg/product10.jpg",
    soldOut: true,
    productFamily: "Aditivo",
  },
  {
    id: 11,
    name: "Óleo Lubrificante Corrente Bardahl Maxlub Kart E Moto",
    productDesc: "O Óleo Especial Lubrificante Corrente Bardahl Kart Moto é o produto ideal para garantir o melhor desempenho e durabilidade da corrente da sua moto ou quadriciclo.",
    price: 39.90,
    photoName: "productsImg/product11.jpg",
    soldOut: false,
    productFamily: "Óleo",
  },
  {
    id: 14,
    name: "Pistola De Pintura Gravidade - Hvlp Bico1,4mm C/manômetro",
    productDesc: "Ideal para aplicações em Madeiras, Metais, Plásticos, Superficies Cerâmicas, bem como Serviçoes de Funilaria, tanto em Ambientes Fechados como Abertos.",
    price: 356.12,
    photoName: "productsImg/product14.jpg",
    soldOut: false,
    productFamily: "Ferramentas",
  },
  {
    id: 12,
    name: "Lubrificante Para Correntes - Chain Lub Mobil Super Moto",
    productDesc: "O Lubrificante Para Correntes - Chain Lub Mobil Super Moto é um produto de alta qualidade, desenvolvido pela renomada marca Mobil.",
    price: 33.68,
    photoName: "productsImg/product12.jpg",
    soldOut: false,
    productFamily: "Lubrificante",
  },
  
  {
    id: 13,
    name: "Óleo Lubrificante Cambio Diferencia Dexron 3 1 L Menzoil",
    productDesc: "O óleo é uma parte essencial para o bom funcionamento do motor do seu veículo, pois tem a função de limpar e lubrificar, buscando protegê-lo do desgaste e da corrosão.",
    price: 50.00,
    photoName: "productsImg/product13.jpg",
    soldOut: false,
    productFamily: "Lubrificante",
   
  },
  {
    id: 15,
    name: "Kit Jogo Profissional Lima Agulha Com 6 Peças Eda 7gm",
    productDesc: "Aproveite a qualidade profissional das limas tipo agulha EDA para realizar seus trabalhos com precisão e eficiência. Compostas por materiais de alta qualidade, como madeira e aço, essas limas são perfeitas para modelar e dar acabamento em diversos materiais.",
    price: 39.90,
    photoName: "productsImg/product15.jpg",
    soldOut: false,
    productFamily: "Ferramentas",
  },
  {
    id: 16,
    name: "Filtro Ar Esportivo Cbx250 Twister 2001 A 2008 53mm",
    productDesc: "Os filtros fabricados pela marca Eksim tem como base o modelo original produzido pelo fabricante, que oferece o mesmo fluxo e a mesma capacidade de filtragem do item original.",
    price: 35.66,
    photoName: "productsImg/product16.jpg",
    soldOut: false,
    productFamily: "Acessórios",
  },
  {
    id: 17,
    name: "Óleo Lubrificante de Motor 5W-40 Sintético SN",
    productDesc: "Esse tipo de produto possui maior resistência a temperaturas altas e melhor desempenho em temperaturas baixas. Por isso, esses óleos são excelentes para a proteção do seu motor. ",
    price: 49.99,
    photoName: "productsImg/product17.jpg",
    soldOut: false,
    productFamily: "Óleo",
  },
  {
    id: 18,
    name: "Estator Magnetron Turuna125 ",
    productDesc: "A Magnetron é pioneira na industrialização de sistemas de ignição e energia. Sendo reconhecidamente. a melhor opção em peças de reposição para motos.",
    price: 172.50,
    photoName: "productsImg/product18.jpg",
    soldOut: false,
    productFamily: "Acessórios",
  },
  
  
];

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
  
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
