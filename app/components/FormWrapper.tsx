"use client";

import { CreateFormState, CustomerField } from "anjrot-components";
import { FC, useActionState } from "react";
import { createInvoice } from "../apis/action";
import EditCreateForm from "../helpers/EditCreateForm";

const FormWrapper: FC<{ customers: CustomerField[] }> = ({ customers }) => {
  const initialState: CreateFormState = { message: null, errors: {} };
  const [state, formACtion] = useActionState(createInvoice, initialState);

  return (
    <EditCreateForm
      state={state}
      customers={customers}
      action={formACtion}
    />
  );
};

export default FormWrapper;
