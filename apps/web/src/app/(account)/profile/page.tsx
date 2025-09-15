import Header from "@/_components/Layout/Header";
import MaxWidthWrapper from "@/_components/max-width-wrapper";
import { AccountNav } from "@/_components/SidebarProfile";
import PersonalInfoTab from "./__components/PersonalInfoTab";
import SecurityTab from "./__components/SecurityTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_components/ui/tabs";
import { AddressesTab } from "./__components/AddressTab";
import { PaymentMethodsTab } from "./__components/PaymentsTab";
import { NotificationPreferencesTab } from "./__components/NotificationPreferencesTab";



export default function Page() {
    return (
        <section className="
        bg-background  dark:bg-zinc-900 min-h-screen w-full">
            <MaxWidthWrapper className="h-full">
                <Header />
                <Tabs>
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto mb-6 rounded-2xl border-gray-200/20 bg-white/10 backdrop-blur-md  p-1">
                        <TabsTrigger value="personal-info" className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white">Personal Info

                        </TabsTrigger>
                        <TabsTrigger value="security" className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white">Security

                        </TabsTrigger>
                        <TabsTrigger value="addresses" className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white">Addresses
                        </TabsTrigger>
                        <TabsTrigger value="payment-method" className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white">Payments
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white">Notifations</TabsTrigger>

                    </TabsList>
                    <TabsContent value="personal-info" className="space-y-6">
                        <PersonalInfoTab />
                    </TabsContent>
                    <TabsContent value="security" className="space-y-6">
                        <SecurityTab />
                    </TabsContent>
                    <TabsContent value="addresses" className="space-y-6">
                        <AddressesTab />
                    </TabsContent>
                    <TabsContent value="payment-method" className="space-y-6">
                        <PaymentMethodsTab />
                    </TabsContent>
                    <TabsContent value="notifications" className="space-y-6">
                        <NotificationPreferencesTab />
                    </TabsContent>
                </Tabs>


            </MaxWidthWrapper>
        </section>
    )
}