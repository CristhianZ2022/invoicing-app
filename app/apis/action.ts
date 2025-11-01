'use server';

import { auth, signIn } from "@/auth";
import { CreateFormState } from "anjrot-components";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { authHeaders } from "./utils";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    error: "Please select a customer."
  }),
  amount: z.coerce.number().gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    message: "Please select an invoice status."
  }),
  date: z.string()
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true });

export async function createInvoice(prevState: CreateFormState, formData: FormData) {
  const session = await auth();

  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create invoice."
    }
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await fetch(`${process.env.BACKEND_URL}/invoices`, {
      method: "POST",
      headers: authHeaders(session?.user?.token),
      body: JSON.stringify({
        customer: customerId,
        amount: amountInCents,
        status,
        date
      })
    });
  } catch (error) {
    return {
      message: `Failed to create invoice. ${error}`
    }
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(prevState: CreateFormState, formData: FormData) {
  const session = await auth();

  const validatedFields = UpdateInvoice.safeParse({
    id: formData.get("invoiceId"),
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to Update invoice."
    }
  }

  const { customerId, amount, status, id } = validatedFields.data;
  const amountInCents = amount * 100;

  const body = {
    status,
    amount: amountInCents,
    customer: customerId
  };

  try {
    await fetch(`${process.env.BACKEND_URL}invoices/${id}`, {
      method: "PUT",
      headers: authHeaders(session?.user?.token),
      body: JSON.stringify(body)
    });
  } catch (error) {
    return {
      message: `Failed to Update invoice. ${error}`
    }
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(formData: FormData) {
  const session = await auth();

  const id = formData.get("invoiceId");

  try {
    await fetch(`${process.env.BACKEND_URL}invoices/${id}`, {
      method: "DELETE",
      headers: authHeaders(session?.user?.token),
    });
    revalidatePath("/dashboard/invoices");
  } catch (error) {
    return {
      message: `Failed to delete invoice. ${error}`
    }
  }
}

export async function authenticate(state: string | undefined, formData: FormData) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: formData.get("callbackUrl") || "/dashboard",
    });

    return result;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials. Please try again.";
        default:
          return "Something went wrong. Please try again.";
      }
    }
    throw error;
  }
}