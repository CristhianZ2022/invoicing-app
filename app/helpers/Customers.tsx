import { FC } from "react";
import Image from "next/image";

interface CustomerType {
  _id: string;
  name: string;
  email: string;
  image_url?: string;
}

interface CustomerProps {
  customer: CustomerType[];
}

const Customers: FC<CustomerProps> = ({ customer }) => {
  
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 h-full overflow-y-auto">
        {customer?.map((customer) => (
          <div
            key={customer._id}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <Image
              src={customer.image_url || "/default-avatar.png"}
              alt={customer.name}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover border-2 border-gray-200 mb-4"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhZPQAJOAKI6M7u0wAAAABJRU5ErkJggg=="
            />
            <p className="text-lg font-semibold text-gray-900 text-center">
              {customer.name}
            </p>
            <p className="text-sm text-gray-600 text-center break-all mt-1">
              {customer.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Customers
