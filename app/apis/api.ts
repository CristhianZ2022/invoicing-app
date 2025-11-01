// Card Wrapper

import { auth } from "@/auth";
import { authHeaders } from "./utils";

export async function fetchCardData() {
  const session = await auth();

  try {
    const [getCustomersCount, getInvoicesCount, getInvoicesStatusCount] =
      await Promise.all([
        fetch(`${process.env.BACKEND_URL}customer/count`, {
          headers: authHeaders(session?.user?.token),
        }),
        fetch(`${process.env.BACKEND_URL}invoices/count`, {
          headers: authHeaders(session?.user?.token),
        }),
        fetch(`${process.env.BACKEND_URL}invoices/status-count`, {
          headers: authHeaders(session?.user?.token),
        }),
      ]);

    const [customersData, invoicesData, statusData] = await Promise.all([
      getCustomersCount.json(),
      getInvoicesCount.json(),
      getInvoicesStatusCount.json(),
    ]);

    const numberOfCustomers = customersData ?? 0;
    const numberOfInvoices = invoicesData ?? 0;
    const totalPaidInvoices = Number(statusData.paid ?? 0);
    const totalPendingInvoices = Number(statusData.pending ?? 0);

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch card data.");

  }
}

// Chart Wrapper

export async function fetchRecentRevenues() {
  try {
    const fetchRecentRevenues = await fetch("http://localhost:3001/revenue");
    const revenueResult = await fetchRecentRevenues.json();

    await new Promise((res) => setTimeout(res, 1000));

    return revenueResult;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch recent revenues data.");
  }
}

// Invoices Latest

export const fetchLatestInvoices = async () => {
  const session = await auth();

  try {
    const fetchInvoices = await fetch(`${process.env.BACKEND_URL}/invoices`, {
      headers: authHeaders(session?.user?.token),
    });
    const resultFetchInvoices = await fetchInvoices.json();

    return resultFetchInvoices;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch fetchLatestInvoices data.");
  }
};

// Invoices Filtered

export async function fetchFilteredInvoices(
  query?: string,
  currentPage?: number
) {
  const session = await auth();

  try {
    const fetchFilteredInvoices = await fetch(
      `${process.env.BACKEND_URL}invoices/paginate?q=${query}&page=${currentPage}`,
      { headers: authHeaders(session?.user?.token) }
    );
    const resultfetchFilteredInvoices = await fetchFilteredInvoices.json();

    return resultfetchFilteredInvoices;
  } catch (error) {
    console.log("Error Invoices -> ", error);
    throw new Error("Failed to fetch filtered invoices data.");
  }
}

// Invoices Pages

export async function fetchInvoicesPages(query?: string) {
  const session = await auth();

  try {
    const getInvoicesPages = await fetch(
      `${process.env.BACKEND_URL}invoices/page-count?q=${query}`,
      { headers: authHeaders(session?.user?.token) }
    );
    const resultgetInvoicesPages = await getInvoicesPages.json();

    return resultgetInvoicesPages;
  } catch (error) {
    console.log("Error Invoices -> ", error);
    throw new Error("Failed to fetch invoices pages data.");
  }
}

// Customers List

export async function fetchCustomers() {
  const session = await auth();

  try {
    const getCustomers = await fetch(`${process.env.BACKEND_URL}customer`, {
      headers: authHeaders(session?.user?.token),
    });
    const resultFetchCustomers = await getCustomers.json();

    return resultFetchCustomers;
  } catch (error) {
    console.log("Error Customers -> ", error);
    throw new Error("Failed to fetch customers data.");
  }
}

// Invoices Edit

export async function fetchInvoiceById(id: string) {
  const session = await auth();

  try {
    const getInvoicesById = await fetch(
      `${process.env.BACKEND_URL}invoice/${id}`,
      { headers: authHeaders(session?.user?.token) }
    );
    if (getInvoicesById.status === 404) return null;
    if (getInvoicesById.status !== 200)
      throw new Error(`HTTP error! status: ${getInvoicesById.status}`);

    const resultInvoiceById = await getInvoicesById.json();

    return resultInvoiceById;
  } catch (error) {
    console.log("Error Inovoice By ID -> ", error);
    throw new Error("Failed to fetch invoice by id data.");
  }
}
