import { FaCheck, FaRegClock } from "react-icons/fa6";
import { CiDollar } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FC, FormHTMLAttributes } from "react";
import Link from "next/link";
export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomerField = {
  _id: string;
  name: string;
};

export type CreateFormState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

interface CreateFormProps extends FormHTMLAttributes<HTMLFormElement> {
  customers: CustomerField[];
  state: CreateFormState;
  invoice?: InvoiceForm;
}

const EditCreateForm: FC<CreateFormProps> = ({ state,
action,
customers,
invoice
}) => {
  return (
    <form action={action} className="space-y-6">
      {invoice && <input type="hidden" name="invoiceId" value={invoice.id} />}
      <div>
        <div className="mb-6">
          <label
            htmlFor="customer"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              defaultValue={invoice ? invoice.customer_id : ""}
              aria-describedby="customer-error"
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <FaRegUserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div
            id="customer-error"
            aria-live="polite"
            aria-atomic="true"
            className="mt-2"
          >
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Choose an amount
          </label>
          <div className="relative mt-2">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={invoice ? invoice.amount : undefined}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-300 py-2.5 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-describedby="amount-error"
              />
              <CiDollar className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-600" />
            </div>
            <div
              id="amount-error"
              aria-live="polite"
              aria-atomic="true"
              className="mt-2"
            >
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="text-xs text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-slate-200">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-300 bg-white p-4">
            <div className="flex gap-6">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice && invoice.status === "pending"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="pending"
                  className="ml-3 flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                    Pending <FaRegClock className="h-4 w-4" />
                  </span>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice && invoice.status === "paid"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
                />
                <label
                  htmlFor="paid"
                  className="ml-3 flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <span className="flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
                    Paid <FaCheck className="h-4 w-4" />
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div
            id="status-error"
            aria-live="polite"
            aria-atomic="true"
            className="mt-2"
          >
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {state.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center justify-center rounded-lg bg-gray-100 px-5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="flex h-10 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          {
            invoice ?
              "Update Invoice"
              :
              "Create Invoice"
          }
        </button>
      </div>
    </form>
  );
};

export default EditCreateForm;
