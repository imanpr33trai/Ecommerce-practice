"use client"

import SignInForm from "@/_components/sign-in-form";
import SignUpForm from "@/_components/sign-up-form";
import { useState } from "react";


export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(false);

  return showSignIn ? (
    <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
  ) : (
    <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
  );
}
