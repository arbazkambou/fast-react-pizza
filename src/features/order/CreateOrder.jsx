import { useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { clearCart, getTotalPrice } from "../cart/cartSlice";
import {formatCurrency} from "../../utilitis/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );


function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart=useSelector((state)=>state.cart.cart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const errors = useActionData();
  const {username,status:addressStatus,position:userPosition,address:userAddress,error:adressError}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  let price=useSelector(getTotalPrice);
  if(withPriority)
  price=price+price*0.20;
 const isLoading=addressStatus==="loading";



  return (
    <div className="h-screen flex mx-10 mt-6">

    <div className="w-screen">
      <h2 className="mb-8 mt-6 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST" className="mt-4">
        <div className="flex flex-col gap-2 mb-3 font-semibold text-sm ">
          <label className=" ">First Name</label>
          <input type="text" className="input " name="customer" defaultValue={username} required />
        </div>

        <div className="flex flex-col gap-2 mb-3 font-semibold text-sm  ">
          <label className="mr-12">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input" required />
            {errors && <p className="text-sm mb-3 mt-1 text-red-500 bg-red-100 rounded-md py-2 px-2">{errors}</p>}
          </div>
         
        </div>
        

        <div className="flex flex-col gap-2 mb-3 font-semibold text-sm relative">
          <label className="mr-24">Address</label>
          <div className="grow ">
            <input type="text" name="address" required className="input " defaultValue={userAddress}/>
            {!userPosition.latitude && !userPosition.longitude ?  <span className="absolute right-1 top-[14px]  sm:right-1 sm:top-[16.5px]"> <Button onClick={(e)=>{
              e.preventDefault();
              dispatch(fetchAddress());
            }} type="round"  disabled={isLoading} >{isLoading? "Getting...":"Get location"}</Button></span>:null}
            {adressError && <p className="text-sm mb-3 mt-1 text-red-500 bg-red-100 rounded-md py-2 px-2">{adressError}</p>}
           
           
          </div>
          
        </div>

        <div className="mt-5 flex items-center font-semibold text-sm">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="ml-2">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
        <input type="hidden" value={`latitude:${userPosition.latitude} longitude:${userPosition.longitude}`} name="position" />
        <div className="mt-4">
          <Button type="primary"  disabled={isSubmitting || isLoading}>
            {isSubmitting ? "Placing order..." : `Oder now from ${formatCurrency(price)}`}
          </Button>
        </div>
      </Form>
    </div>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const formData = await Object.fromEntries(data);

  const order = {
    ...formData,
    cart: JSON.parse(formData.cart),
    priority: formData.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    return (errors.msg = "Please enter correct phone number to place order!");
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);

}

export default CreateOrder;
