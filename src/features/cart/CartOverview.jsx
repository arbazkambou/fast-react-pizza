import { useSelector } from "react-redux";
import { Link } from "react-router-dom/dist";
import {  getTotalPizzaQuantity, getTotalPrice } from "./cartSlice";

function CartOverview() {
  const totalPizzaQuantity=useSelector(getTotalPizzaQuantity)
  const totalPrice=useSelector(getTotalPrice);
  if(totalPizzaQuantity!==0)
  return (
    <div className=" bg-stone-800 text-stone-200 uppercase p-4 sm:px-6 text-sm md:text-base flex items-center justify-between">
      <p className=" text-stone-300 font-semibold space-x-4 sm:space-x-6 ">
        <span>{totalPizzaQuantity} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open Cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
