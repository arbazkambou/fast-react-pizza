import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilitis/helpers";
import { deleteItem } from "./cartSlice";
import UpdateQuantity from "./UpdateQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch=useDispatch();
  return (
    <li className="py-3 text-sm font-semibold sm:flex sm:items-center sm:justify-between ">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-5">
        <p className="mt-3">{formatCurrency(totalPrice)}</p>
        <UpdateQuantity pizzaId={pizzaId} pizza={item}/>
        <Button type="small" onClick={()=>dispatch(deleteItem(pizzaId))}>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
