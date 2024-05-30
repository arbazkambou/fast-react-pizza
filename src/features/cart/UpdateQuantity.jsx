import Button from "../../ui/Button"
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, getCurrentQuantityById, increaseQuantity } from "./cartSlice";
function Updatequantity({pizzaId,pizza}) {
    const quantity=useSelector(getCurrentQuantityById(pizzaId));
    const dispatch=useDispatch();
    return (
        <div className=" flex items-center gap-2">
            <Button type="round" onClick={()=>dispatch(decreaseQuantity(pizzaId))}>-</Button>
            <p className=" font-bold pt-4">{quantity}</p>
            <Button type="round" onClick={()=>dispatch(increaseQuantity(pizzaId))}>+</Button>
        </div>
    )
}

export default Updatequantity
