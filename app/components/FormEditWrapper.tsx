"use client";

import {
  CreateFormState,
  CustomerField,
  InvoiceForm,
} from "anjrot-components";
import { FC, useActionState } from "react";
import { updateInvoice } from "../apis/action";

import EditCreateForm from "../helpers/EditCreateForm";

const FormEditWrapper: FC<{
  customers: CustomerField[];
  invoice: InvoiceForm;
}> = ({ customers, invoice }) => {
  const initialState: CreateFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateInvoice, initialState);

  return (
    <EditCreateForm
      state={state}
      action={formAction}
      customers={customers}
      invoice={invoice}
    />
  );
};

export default FormEditWrapper;