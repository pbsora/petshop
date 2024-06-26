import CompletedOrderItem from "@/components/Orders/CompletedOrderItem";
import { useGetOrders } from "@/lib/Queries/CartQueries";
import { Order } from "@/utils/Types & Interfaces";
import { Fragment } from "react";
import { PropagateLoader } from "react-spinners";

const Orders = () => {
  const orderQuery = useGetOrders();
  const orders = orderQuery.data?.data as Order[];

  if (orderQuery.isLoading)
    return (
      <div className="h-[60vh] w-full col-span-6 flex justify-center items-center">
        <PropagateLoader color="#15bde1" />
      </div>
    );

  if (!orders)
    return (
      <div className="flex items-center justify-center w-full h-40 lg:h-2/4">
        <h1 className="text-2xl font-bold text-zinc-700 dark:text-zinc-200">
          No orders found
        </h1>
      </div>
    );

  return (
    <div className="mb-10">
      <h1 className="my-2 mb-6 ml-6 text-2xl font-bold font-roboto text-zinc-700 dark:text-zinc-200">
        My orders
      </h1>
      <div className="w-[95%] m-auto flex flex-col gap-8">
        {orders &&
          orders?.map((order) => (
            <Fragment key={order.id}>
              <CompletedOrderItem order={order} />
            </Fragment>
          ))}
      </div>
    </div>
  );
};
export default Orders;
