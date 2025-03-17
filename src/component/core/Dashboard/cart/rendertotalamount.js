import { useSelector } from "react-redux"

export const Rendertotalamount=()=>{
   const {total} =useSelector((state)=>state.cart)

   const buyHandler=async(e)=>{
        e.preventDefault();
        // const request=await(enrollcourse)
   }
   return(<div>
        <h1>Total</h1>
        <span>RS {total}</span>
        <button
        onClick={buyHandler}>
            Buy Now
        </button>
    </div>)
}