import { z } from "zod";
import { productSchema } from "./product";
import { orderSchema } from "./order";
import { paymentSchema } from "./payment";
import { userSchema } from "./auth";
import { cartSchema } from "./cart";
import { categorySchema } from "./category";
import { imageSchema } from "./image";
import { reviewSchema } from "./review";
import { wishSchema } from "./wish";

export * from "./product";
export * from "./order";
export * from "./payment";
export * from "./auth";
export * from "./cart";
export * from "./category";
export * from "./image";
export * from "./review";
export * from "./wish";

export type Product = z.infer<typeof productSchema>;
export type Order = z.infer<typeof orderSchema>;
export type Payment = z.infer<typeof paymentSchema>;
export type User = z.infer<typeof userSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Image = z.infer<typeof imageSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type Wish = z.infer<typeof wishSchema>;
export type CartItem = z.infer<typeof cartSchema.shape.items.element>;


export interface ProductWithRelations extends Product {
    category?: Category | null;
    images: Image[];
    reviews: Review[];
    wishes: Wish[];
}

export interface CartWithItems extends Cart {
    items: CartItem[];
}

export interface UserWithRelations extends User {
    reviews: Review[];
    cart: CartWithItems[];
    order: Order[];
    wishList: Wish[];
}

export interface OrderWithRelations extends Order {
    items: CartItem[];
    user: UserWithRelations;

}

export interface PaymentWithRelations extends Payment {
    order: OrderWithRelations;
}

export interface CategoryWithProducts extends Category {
    products: ProductWithRelations[];
}

export interface ReviewWithProduct extends Review {
    product: ProductWithRelations;
}

export interface WishWithProduct extends Wish {
    product: ProductWithRelations;
}

export interface ImageWithProduct extends Image {
    product: ProductWithRelations;
}

export interface CartItemWithProduct extends CartItem {
    product: ProductWithRelations;
}

export interface PaymentWithOrder extends Payment {
    order: OrderWithRelations;
}

export interface OrderWithPayment extends Order {
    payment: PaymentWithRelations;
}

export interface UserWithCart extends User {
    cart: CartWithItems[];
}


export const schemas = {
    productSchema,
    orderSchema,
    paymentSchema,
    userSchema,
    cartSchema,
    categorySchema,
    imageSchema,
    reviewSchema,
    wishSchema,
};

export type Schemas = typeof schemas;
export type SchemaKeys = keyof Schemas;
export type SchemaType<K extends SchemaKeys> = z.infer<Schemas[K]>;

