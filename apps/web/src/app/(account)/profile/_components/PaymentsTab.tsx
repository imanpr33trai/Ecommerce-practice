'use client';

import { useState } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { Button } from '@comp/button';
import { CardContent, CardDescription, CardHeader, CardTitle, Card } from '@comp/card';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@comp/dialog';
import { Input } from '@comp/input';
import { Label } from '@comp/label';

// Mock Payment Form Component (for Dialog)
const PaymentMethodForm = ({ initialData }: { initialData?: any }) => {
    const [cardNumber, setCardNumber] = useState(initialData?.cardNumber || '');
    const [expiry, setExpiry] = useState(initialData?.expiry || '');
    // ... more card fields
    const isEditing = !!initialData;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(isEditing ? 'Updating payment' : 'Adding new payment', { cardNumber, expiry });
        // TODO: Integrate tRPC mutation
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-1.5">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="•••• •••• •••• ••••" className="text-white placeholder:text-gray-400 bg-white/10 border-gray-600/50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className="text-white placeholder:text-gray-400 bg-white/10 border-gray-600/50" />
                </div>
                {/* Add CVV, etc. */}
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2 mt-6">
                <Button variant="ghost" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20">Cancel</Button>
                <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">{isEditing ? 'Save Changes' : 'Add Card'}</Button>
            </DialogFooter>
        </form>
    );
};


export const PaymentMethodsTab = () => {
    // Mock payment methods (replace with actual data from tRPC query)
    const [paymentMethods, setPaymentMethods] = useState([
        { id: '1', type: 'Visa', last4: '4242', expiry: '12/25', default: true },
        { id: '2', type: 'Mastercard', last4: '1111', expiry: '06/27', default: false },
    ]);

    // TODO: Integrate tRPC queries/mutations
    // const { data: userPaymentMethods, isLoading: isPaymentsLoading } = api.user.getPaymentMethods.useQuery();
    // const { mutate: deletePaymentMethod, isLoading: isDeleting } = api.user.deletePaymentMethod.useMutation({...});

    const handleDelete = (id: string) => {
        console.log('Deleting payment method:', id);
        // deletePaymentMethod.mutate({ id });
        setPaymentMethods(paymentMethods.filter(pm => pm.id !== id)); // Optimistic update
    };

    const isPaymentsLoading = false; // Placeholder

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-2xl">Payment Methods</CardTitle>
                    <CardDescription className="text-gray-300">
                        Manage your saved credit and debit cards.
                    </CardDescription>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-2xl border-gray-200/20 bg-white/10 backdrop-blur-md text-white shadow-xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl">Add New Payment Method</DialogTitle>
                            <DialogDescription className="text-gray-300">
                                Enter your card details securely.
                            </DialogDescription>
                        </DialogHeader>
                        <PaymentMethodForm />
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent className="space-y-4">
                {isPaymentsLoading ? (
                    <p className="text-gray-400">Loading payment methods...</p>
                ) : paymentMethods.length > 0 ? (
                    <div className="grid gap-4">
                        {paymentMethods.map((pm) => (
                            <div key={pm.id} className="relative rounded-lg bg-white/10 p-4 text-sm border border-gray-600/50">
                                {pm.default && (
                                    <span className="absolute top-2 right-2 rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">Default</span>
                                )}
                                <div className="flex items-start gap-3">
                                    <CreditCard className="h-5 w-5 flex-shrink-0 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">{pm.type} ending in {pm.last4}</p>
                                        <p className="text-gray-200">Expires {pm.expiry}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2 justify-end">
                                    <Button variant="destructive" size="icon" className="h-8 w-8 bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(pm.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No payment methods saved yet. Click "Add New" to add one.</p>
                )}
            </CardContent>
        </Card>
    );
};