"use client"
import OrderSummary from "@/_components/OrderSummary";
import PaymentForm from "@/_components/PaymentForm";
import ReviewForm from "@/_components/ReviewForm";
import ShippingForm from "@/_components/ShippingForm";

import Header from "@/_components/header";
import MaxWidthWrapper from "@/_components/max-width-wrapper";
import Stepper from "@/_components/stepper";
import { useState } from "react";

type Step = 'address' | 'payment' | "review";
export default function Page() {

    const [step, setStep] = useState<Step>("address")

    return (<section className="bg-background  dark:bg-zinc-900 min-h-screen">
        <MaxWidthWrapper className="h-full">
            <Header />
            <Stepper currentStep={step} onStepChange={setStep} />
            <div className=" grid lg:grid-cols-6 lg:p-6 lg:gap-10 gap-4 grid-cols-2 md:grid-cols-6 lg:h-[85%]  mt-10 ">
                {step === 'address' && <ShippingForm onNext={() => setStep("payment")} />}
                {step === 'payment' && <PaymentForm onNext={() => setStep("review")} />}
                {step === 'review' && <ReviewForm onBackToAdress={() => setStep("address")} onBackToPayment={() => setStep('payment')} />}
                <OrderSummary step={step} />
            </div>
        </MaxWidthWrapper>
    </section>
    )
}



