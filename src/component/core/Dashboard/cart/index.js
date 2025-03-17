import { useSelector } from "react-redux"
import {Rendercourselist} from "./rendercourselist"
import {Rendertotalamount} from "./rendertotalamount"

export const Cart=()=>{
    
    const {total , totalItems} = useSelector((state)=>state.cart)

    return (<div className="mt-20 text-white">

        <h1 className="text-3xl">Your Cart</h1>
        <p >{totalItems} courses in wishlist</p>
        {
            totalItems > 0?(
                <div>
                    <Rendercourselist/>
                    <Rendertotalamount/>
                </div>
            ):(<div>
                <p>No courses in your wishlist</p>
            </div>)
        }
    </div>)
}