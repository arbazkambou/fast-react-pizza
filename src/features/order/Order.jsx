// Test ID: IIDSAT
/* eslint-disable react/no-unescaped-entities */
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilitis/helpers";
import OrderItem from "./OrderItem"
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const fetcher=useFetcher();

  useEffect(function (){
    if(!fetcher.data && fetcher.state==="idle")
    fetcher.load("/menu");
  },[fetcher])

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className=" space-y-10 mx-4">
      <div className="flex gap-2 items-center justify-between mt-5 flex-wrap">
        <h2 className=" text-xl font-semibold">Order #{id} Status</h2>

        <div className=" space-x-5 uppercase mt-2 sm:mt-0">
          {priority && <span className="bg-red-500 text-red-50 py-2 px-2 rounded-full ">Priority Order</span>}
          <span className="bg-green-500 text-green-50 py-2 px-2 rounded-full ">order {status} </span>
        </div>
      </div>

      <div className="flex gap-2 justify-between items-center bg-stone-300 py-8 px-4 flex-wrap">
        <p className=" text-lg  font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className=" text-sm font-semibold">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className=" divide-y-2 border-t-2 border-b-2 mx-2">
        {cart.map(item=> <OrderItem item={item} key={item.pizzaId} ingredients={fetcher?.data?.find((ele)=>ele.id===item.pizzaId)?.ingredients}  isLoadingIngredients={fetcher.state==="loading"} />)}
      </ul>

      <div className="flex gap-2 justify-between bg-stone-300 py-8 px-4 flex-col flex-wrap">
        <p className="text-sm font-semibold">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className=" text-sm font-semibold">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className=" text-lg font-semibold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder data={order} status={status} priorityPrice={priorityPrice}/>}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderID);
  return order;
}
export default Order;
