import { formatCurrency } from "../../utilitis/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-5">
      <div className="flex items-center justify-between">
        <p className="">
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className=" font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className=" capitalize text-sm py-2 text-stone-500 italic">{isLoadingIngredients? "Loading...": ingredients?.join(', ')}</p>
    </li>
  );
}

export default OrderItem;
