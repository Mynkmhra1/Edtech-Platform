import { useDispatch, useSelector } from "react-redux"
import ReactStars from "react-stars"
import { MdDeleteSweep } from "react-icons/md";

export const Rendercourselist=()=>{
    const {cart ,total, removeFromCart }=useSelector((state)=>state.cart)
    
    const dispatch=useDispatch();

    
    return(<div>
        {cart.map((course)=>(
            <div>
                <div>
                    <img src={course?.thumbnail}/>
                    <div>
                        <p>{course.name}</p>
                        <p>{course?.category?.name}</p>
                        <div>
                            <span>
                                <p>4.8</p>
                            </span>
                                <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                color2={'#ffd700'}
                                />
                            <span>{course?.RatingAndReviews?.length}</span>
                        </div>

                    </div>
                </div>
            <div>
                <button onClick={()=>dispatch(removeFromCart(course)) }>
                    <p>Remove</p>
                    <span><MdDeleteSweep /></span>
                </button>

                <h1> Rs {total}</h1>
            </div>
        </div>))}
    </div>)
}