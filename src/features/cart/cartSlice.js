import { createSlice } from "@reduxjs/toolkit"

const initialState={

    cart:[
    ]

}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem(state,action){
            //payLoad new item
            state.cart.push(action.payload);
        },
        deleteItem(state,action){
            //payLoad pizzaId
            
            state.cart=state.cart.filter((item)=>item.pizzaId!==action.payload);
        },
        increaseQuantity(state,action){
            //payLoad pizzaId
            const item=state.cart.find((item)=>item.pizzaId===action.payload);
            item.quantity++;
            item.totalPrice=item.quantity*item.unitPrice;
            
        },
        decreaseQuantity(state,action){
            const item=state.cart.find((item)=>item.pizzaId===action.payload);
            item.quantity--;
            item.totalPrice=item.quantity*item.unitPrice;
           if(item.quantity<=0)
           cartSlice.caseReducers.deleteItem(state,action);
        },
            

        clearCart(state){
                state.cart=[];
            },
    }
});

export const {addItem,deleteItem,increaseQuantity,decreaseQuantity,clearCart}=cartSlice.actions;
export default cartSlice.reducer;

export const getTotalPizzaQuantity=(state)=>state.cart.cart.reduce((sum,item)=>sum+item.quantity,0);
export const getTotalPrice=(state)=>state.cart.cart.reduce((sum,item)=>sum+item.totalPrice,0);
export const getCartItems=(state)=>state.cart.cart;
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;