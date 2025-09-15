'use client';

import { useState } from 'react';
import { Save, Mail, Smartphone } from 'lucide-react';
import { Button } from '@/_components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/_components/ui/card';
import { Checkbox } from '@/_components/ui/checkbox';
import { Label } from '@/_components/ui/label';

export const NotificationPreferencesTab = () => {
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [pushEnabled, setPushEnabled] = useState(false);
    const [orderUpdates, setOrderUpdates] = useState(true);
    const [promotions, setPromotions] = useState(false);

    // TODO: Integrate tRPC mutations for saving preferences
    // const { mutate: updatePreferences, isLoading: isSaving } = api.user.updateNotificationPreferences.useMutation({...});

    const handleSavePreferences = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saving preferences:', { emailEnabled, pushEnabled, orderUpdates, promotions });
        // updatePreferences.mutate({ emailEnabled, pushEnabled, orderUpdates, promotions });
    };

    const isLoading = false; // Placeholder

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Notification Preferences</CardTitle>
                <CardDescription className="text-gray-300">
                    Choose how you would like to receive updates.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleSavePreferences} className="space-y-6">
                    {/* Communication Channels */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Channels</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="email-notifications" checked={emailEnabled} onCheckedChange={() => console.log("af")} disabled={isLoading} />
                                <Mail className="h-5 w-5 text-gray-400" />
                                <Label htmlFor="email-notifications">Email Notifications</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="push-notifications" checked={pushEnabled} onCheckedChange={() => console.log("af")} disabled={isLoading} />
                                <Smartphone className="h-5 w-5 text-gray-400" />
                                <Label htmlFor="push-notifications">Push Notifications</Label>
                            </div>
                        </div>
                    </div>

                    {/* Notification Types */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">What to notify me about</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="order-updates" checked={orderUpdates} onCheckedChange={() => console.log("af")} disabled={isLoading} />
                                <Label htmlFor="order-updates">Order Status Updates</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="promotions" checked={promotions} onCheckedChange={() => console.log("af")} disabled={isLoading} />
                                <Label htmlFor="promotions">Promotions and Offers</Label>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? 'Saving...' : 'Save Preferences'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};