"use client"
import { Button } from "@/_components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { DialogTrigger, Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter, DialogHeader, DialogOverlay, DialogPortal } from "@/_components/ui/dialog";
import { Lock, KeyRound, Trash2 } from "lucide-react";
import { useState } from "react";


const SecurityTab = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const handleUpdatePassword = () => {
    console.log("handle Password");
  }
  const isUpdatingPassword = false
  const isDeletingAccount = false
  return (
    <div className="space-y-6">
      {/* Change Password Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Change Password</CardTitle>
          <CardDescription className="text-gray-300">
            Update your account password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="pl-10 text-white placeholder:text-gray-400 bg-white/10 border-gray-600/50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className="pl-10 text-white placeholder:text-gray-400 bg-white/10 border-gray-600/50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="confirm-new-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className="pl-10 text-white placeholder:text-gray-400 bg-white/10 border-gray-600/50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <Button type="submit" disabled={isUpdatingPassword} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {isUpdatingPassword ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Account Management Card (Delete Account) */}
      <Card className="border-red-400/30">
        <CardHeader>
          <CardTitle className="text-2xl text-red-400">Account Management</CardTitle>
          <CardDescription className="text-gray-300">
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isDeletingAccount}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {isDeletingAccount ? 'Deleting...' : 'Delete Account'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-2xl border-gray-200/20 bg-white/10 backdrop-blur-md text-white shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-xl text-red-400">Confirm Account Deletion</DialogTitle>
                <DialogDescription className="text-gray-300">
                  This action cannot be undone. Are you absolutely sure you want to delete your account?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="ghost" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20">Cancel</Button>
                <Button variant="destructive" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">Confirm Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );

}

export default SecurityTab