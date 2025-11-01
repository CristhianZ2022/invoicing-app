"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { FaFileInvoice, FaHome, FaUsers } from "react-icons/fa";

function Ancors({ ...props }) {
  const pathname = usePathname();

  useEffect(() => {
    console.log("pathname:> ", pathname);
  }, [pathname]);

  /* `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-lg text-white font-bold hover:bg-slate-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 ${
            pathname === `/${props.href}` ? "bg-slate-500 text-white" : ""
          }`
  */
  return (
    <Link
      href={`/${props.href}`}
      className={twMerge(
        "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-lg text-white font-bold hover:bg-slate-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3",
        pathname === `/${props.href}` ? "bg-slate-500 text-white" : ""
      )}
    >
      <props.icon className="w-6" />
      <p className="hidden md:block">{props.title}</p>
    </Link>
  );
}

export default function AncorsSideNav() {
  return (
    <div>
      <Ancors title="Dashboard" href="dashboard" icon={FaHome} />
      <Ancors title="Invoices" href="dashboard/invoices" icon={FaFileInvoice} />
      <Ancors title="Customers" href="dashboard/customers" icon={FaUsers} />
    </div>
  );
}
