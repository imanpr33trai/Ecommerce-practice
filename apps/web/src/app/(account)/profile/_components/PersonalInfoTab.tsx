"use client"
import { User, Mail, Save } from "lucide-react";
import { Label } from "../../../../_components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../_components/ui/avatar";
import { Button } from "../../../../_components/ui/button";
import {
    Card, CardAction, CardContent, CardDescription
    , CardFooter, CardHeader, CardTitle
} from "../../../../_components/ui/card"
import { Input } from "../../../../_components/ui/input";
import { useState } from "react";

const PersonalInfoTab = () => {

    // const userAvatar = '/images/caroline';
    // const userName = "Man"
    // const userEmail = "man@"
    const isLoading = false

    const [userName, setUserName] = useState('John Doe');
    const [userEmail, setUserEmail] = useState('john.doe@example.com');
    const [userAvatar, setUserAvatar] = useState('/avatar-placeholder.png'); // Placeholder image
    const handleSavePersonalInfo = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saving personal info:', { userName, userEmail });
        // updateProfile.mutate({ name: userName, email: userEmail });
    };

    return (
        <Card className="rounded-3xl border-gray-200/20 bg-white/10 text-white shadow-xl backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-2xl">Personal Information</CardTitle>
                <CardDescription className="text-gray-300">
                    Update your name and email address.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24 border-4 border-white/50">
                        <AvatarImage src={userAvatar || '/images/caroline.jpg'} alt="User Avatar" />
                        <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="bg-white/20 text-white hover:bg-white/30">
                        Change Avatar
                    </Button>
                </div>
                <form onSubmit={handleSavePersonalInfo} className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your full name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                disabled={isLoading}
                                className="pl-10 text-white placeholder:text-gray-400 bg-white/10 border-gray-600/50 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="Your email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                disabled={isLoading}
                                className="pl-10 text-white placeholder:text-gray-400 bg-white/10 border-gray-600/50 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default PersonalInfoTab