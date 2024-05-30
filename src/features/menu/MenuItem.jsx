import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilitis/helpers";
import { addItem, deleteItem, getCurrentQuantityById } from "../cart/cartSlice";
import UpdateQuantity from "../cart/UpdateQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  // const isExist=useSelector((state)=>state.cart.cart.some((item)=>item.pizzaId===id));
  const isExist=useSelector(getCurrentQuantityById(id));
 
  const dispatch=useDispatch();
  function handleAddToCart(){
    const newItem={
      pizzaId:id,
      name,
      unitPrice,
      quantity:1,
      totalPrice:unitPrice*1
    }
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-3 mx-4 py-2">
      <img src={imageUrl} alt={name} className={`h-40 rounded-lg ${soldOut ? "grayscale opacity-70": ""}`} />
      <div className="flex flex-col grow pt-3">
        <p className="font-medium">{name}</p>
        <p className=" capitalize text-sm text-stone-500 italic">{ingredients.join(", ")}</p>
        <div className="mt-auto flex justify-between items-center">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p className=" text-sm text-stone-500 font-medium
           uppercase">Sold out</p>}
           {isExist!==0 && !soldOut && <div className="flex gap-4"><UpdateQuantity pizza={pizza} pizzaId={id}/> <Button type="small" onClick={()=>dispatch(deleteItem(id))}>Delete</Button></div>}
           {!soldOut &&  !isExist && <Button type="small" onClick={handleAddToCart}>Add to cart</Button> }
          
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
