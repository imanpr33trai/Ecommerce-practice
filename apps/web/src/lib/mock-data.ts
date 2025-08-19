export interface Product{
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  deal?: string;
  exclusive?: boolean;
  description: string;
  review: string[];
  user?: {
    name: string;
    image: string;
  }[];
}
export const mockProducts:Product[] = [
  {
    id: "1",
    name: "Long Chair",
    price: 508,
    rating: 4.9,
    image: "/placeholder.svg",
    category: "Sofa",
    deal: "New",
    review:["Great for lounging and relaxation, this long chair offers both comfort and style." ],
    description:
      "Great for lounging and relaxation, this long chair offers both comfort and style.",
  },
  {
    id: "2",
    name: "PureSpace Focus Duo",
    price: 320,
    rating: 4.8,
    image: "/placeholder.svg",
    category: "Table",
    exclusive: true,
    description:
      "Sleek, minimalist design for ultimate productivity and comfort.",
    review: [
      "Sleek, minimalist design for ultimate productivity and comfort.",
    ],
  },
  {
    id: "3",
    name: "Great Value Deal",
    price: 250,
    rating: 4.9,
    image: "/placeholder.svg",
    category: "Table",
    deal: "Great Value",
    description: "Find Items On Sale With 50 - 75%",
    review: [
      "Find Items On Sale With 50 - 75%",
      "Find Items On Sale With 50 - 15%",
      "Find Items On Sale With 50 - 45%",
      "Find Items On Sale With 50 - 95%",
    ],
    user: [{
      name: "Iman",
      image: "/placeholder.svg",
    },]
  },
  {
    id: "4",
    name: "Minimalist Lamp",
    price: 80,
    rating: 4.7,
    image: "/placeholder.svg",
    category: "Table",
    description: "Illuminate your space with this stylish and functional lamp.",
    review: [
      "Illuminate your space with this stylish and functional lamp.",
    ],
  },
  {
    id: "5",
    name: "Modern Dresser",
    price: 450,
    rating: 4.9,
    image: "/placeholder.svg",
    category: "Dressers",
    description: "A sleek and modern dresser that complements any bedroom decor.",
    review: [
      "A sleek and modern dresser that complements any bedroom decor.",
    ],
  },
  {
    id: "6",
    name: "King Size Bed",
    price: 800,
    rating: 4.9,
    image: "/placeholder.svg",
    category: "Bed",
    description: "Experience ultimate comfort with this spacious king size bed.",
    review: [
      "Experience ultimate comfort with this spacious king size bed.",
    ],
  },
];
