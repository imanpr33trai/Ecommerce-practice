import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Breadcrumb, BreadcrumbList, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Page() {
    return (<MaxWidthWrapper className="bg-red-400">
        <div className="flex justify-center">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>Shipping</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>Payment</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Review</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div className=" grid lg:grid-cols-6 gap-6 grid-cols-">
            <div className="lg:col-span-3 bg-blue-400">
                <ShippingForm />
            </div>
            <div className="lg:col-span-3 bg-green-400">Right</div>
        </div>
    </MaxWidthWrapper>

    )
}

const ShippingForm = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>
                    Enter Your Shipping Details Below
                </CardDescription>

            </CardHeader>
            <CardContent>
                <Input />
                <Input />
                <Input />
                <Input />
                <Input />
                <Input />
                <Input />
            </CardContent>
            <CardFooter>
                <Button>Continue to Payment</Button>
            </CardFooter>
        </Card>
    )
}