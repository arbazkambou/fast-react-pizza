import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "./cartSlice";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";


function Cart() {
  const cart = useSelector(getCartItems);
const username=useSelector((state)=>state.user.username);
const dispatch=useDispatch();
if(!cart.length) return <EmptyCart/>
  return (
    <div className="my-2 mx-4 ">
      <LinkButton to={"/menu"}> &larr; Back to menu</LinkButton>

      <h2 className="mt-6 font font-semibold text-xl mx-4">Your cart, {username}</h2>
      <ul className="mt-4 divide-y-2 border-b-2 mx-4">
        {cart.map(item=> <CartItem item={item} key={item.pizzaId}/>)}
      </ul>

      <div className="mt-4 space-x-4 mx-4">
        <Button to="/order/new" type={"primary"}>Order pizzas</Button>
       <Button type="secondary" onClick={()=>dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
