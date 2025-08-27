'use client';

import { useCart } from '@/hooks/useCart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
    id: string;
    product: {
        name: string;
        price: number;
    };
    quantity: number;
}

export default function CartModal() {
    const { data: cart } = useCart.getAll();

    if (!cart) {
        return null;
    }

    const calculateTotal = (items: CartItem[] = []): number => {
        return items.reduce((acc, item) =>
            acc + (Number(item.product.price) * Number(item.quantity)),
            0
        );
    };

    return (
        <Card className="fixed right-4 top-20 z-50 w-96 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Cart</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {!cart.items?.length ? (
                    <p className="text-muted-foreground text-center py-6">
                        Your cart is empty
                    </p>
                ) : (
                    <div className="space-y-4">
                        {cart.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{item.product.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <p className="font-medium">
                                    ${(Number(item.product.price) * Number(item.quantity)).toFixed(2)}
                                </p>
                            </div>
                        ))}
                        <div className="border-t pt-4 space-y-4">
                            <div className="flex justify-between">
                                <p className="font-medium">Total</p>
                                <p className="font-medium">
                                    ${calculateTotal(cart.items).toFixed(2)}
                                </p>
                            </div>
                            <Button asChild className="w-full">
                                <Link href="/cart">View Cart</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
