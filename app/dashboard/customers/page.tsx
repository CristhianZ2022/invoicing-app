import CustomerWrapper from "@/app/components/CustomerWrapper";
import { Metadata } from "next";

export function metadata(): Metadata {
  return {
    title: "Customers"
  };
}

async function Customers() {
  
  
  return (
    <CustomerWrapper />
  )
}

export default Customers
