import { fetchCustomers } from "../apis/api";
import Customers from "../helpers/Customers";

interface CustomerType {
  _id: string;
  name: string;
  email: string;
  image_url?: string;
}
async function CustomerWrapper () {
  const getCustomers: CustomerType[] = await fetchCustomers();

  return (
    <Customers customer={getCustomers} />
  );
};

export default CustomerWrapper;
