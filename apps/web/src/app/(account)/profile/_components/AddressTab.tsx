'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@comp/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@comp/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@comp/dialog';
import { Input } from '@comp/input';
import { Label } from '@comp/label';

// Mock Address Form Component (for Dialog)
const AddressForm = ({ initialData }: { initialData?: any }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [address1, setAddress1] = useState(initialData?.address1 || '');
    // ... more address fields
    const isEditing = !!initialData;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(isEditing ? 'Updating address' : 'Adding new address', { name, address1 });
        // TODO: Integrate tRPC mutation
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-1.5">
                <Label htmlFor="addressName">Address Label (e.g., Home, Work)</Label>
                <Input id="addressName" value={name} onChange={(e) => setName(e.target.value)} placeholder="Home" className="text-white placeholder:text-gray-400 bg-white/10 border-gray-600/50" />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="address1">Address Line 1</Label>
                <Input id="address1" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="123 Main St" className="text-white placeholder:text-gray-400 bg-white/10 border-gray-600/50" />
            </div>
            {/* ... Add more address fields like city, state, zip, etc. */}
            <DialogFooter className="flex-col sm:flex-row gap-2 mt-6">
                <Button variant="ghost" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20">Cancel</Button>
                <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">{isEditing ? 'Save Changes' : 'Add Address'}</Button>
            </DialogFooter>
        </form>
    );
};


export const AddressesTab = () => {
    // Mock addresses (replace with actual data from tRPC query)
    const [addresses, setAddresses] = useState([
        { id: '1', label: 'Home', fullAddress: '123 Main St, Anytown, CA 12345, USA', default: true },
        { id: '2', label: 'Work', fullAddress: '456 Office Rd, Workville, NY 67890, USA', default: false },
    ]);

    // TODO: Integrate tRPC queries/mutations for addresses
    // const { data: userAddresses, isLoading: isAddressesLoading } = api.user.getAddresses.useQuery();
    // const { mutate: deleteAddress, isLoading: isDeleting } = api.user.deleteAddress.useMutation({...});

    const handleDelete = (id: string) => {
        console.log('Deleting address:', id);
        // deleteAddress.mutate({ id });
        setAddresses(addresses.filter(addr => addr.id !== id)); // Optimistic update
    };

    const isAddressesLoading = false; // Placeholder

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-2xl">Saved Addresses</CardTitle>
                    <CardDescription className="text-gray-300">
                        Manage your shipping and billing addresses.
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
                            <DialogTitle className="text-xl">Add New Address</DialogTitle>
                            <DialogDescription className="text-gray-300">
                                Provide details for your new address.
                            </DialogDescription>
                        </DialogHeader>
                        <AddressForm />
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent className="space-y-4">
                {isAddressesLoading ? (
                    <p className="text-gray-400">Loading addresses...</p>
                ) : addresses.length > 0 ? (
                    <div className="grid gap-4">
                        {addresses.map((addr) => (
                            <div key={addr.id} className="relative rounded-lg bg-white/10 p-4 text-sm border border-gray-600/50">
                                {addr.default && (
                                    <span className="absolute top-2 right-2 rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">Default</span>
                                )}
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 flex-shrink-0 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">{addr.label}</p>
                                        <p className="text-gray-200">{addr.fullAddress}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2 justify-end">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="icon" className="h-8 w-8 bg-white/10 text-white hover:bg-white/20">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] rounded-2xl border-gray-200/20 bg-white/10 backdrop-blur-md text-white shadow-xl">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl">Edit Address</DialogTitle>
                                                <DialogDescription className="text-gray-300">
                                                    Modify details for your address.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <AddressForm initialData={addr} />
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant="destructive" size="icon" className="h-8 w-8 bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(addr.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No addresses saved yet. Click "Add New" to add one.</p>
                )}
            </CardContent>
        </Card>
    );
};