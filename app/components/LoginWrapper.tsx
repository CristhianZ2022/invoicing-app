"use client";
import { useActionState } from "react";
import { authenticate } from "../apis/action";
import { useSearchParams } from "next/navigation";
import LoginForm from "../helpers/LoginForm";



export default function LoginWrapper() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <LoginForm
      action={formAction}
      error={errorMessage}
      callbackurl={callbackUrl}
      isPending={isPending}
    />
  );
}