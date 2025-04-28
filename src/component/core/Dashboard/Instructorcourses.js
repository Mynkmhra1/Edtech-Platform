import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MdDeleteSweep } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export const Instructorcouses=()=>{
    const {user}=useSelector((state)=>state.profile);

    
    return(
        <div className="mt-20 text-white">
            <div>
                <h1>My Course</h1>
                <button >
                    <span><IoAddCircleOutline/></span>
                    New
                </button>
            </div>

            <div >
                <p>Courses</p>
                <p>Duration</p>
                <p>price</p>
                <p>Action</p>
               
                <div>
                    {user?.courses?.length>0?(
                        user.courses.map((course)=>(
                            <div>
                                <div>
                                    <div>
                                        <img src={course?.thumbnail}/>
                                    </div>
                                    <div>
                                        
                                        <p>{course?.name}</p>
                                        <p>{course?.courseDescription}</p>
                                        <p>{course?.category?.name}</p>
                                        <p>{course?.status}</p>
                                    </div>

                                    <div>
                                        <p>Duration</p>
                                    </div>

                                    <div>
                                        {course.price}
                                    </div>

                                    <div>
                                        <button>
                                            <MdDeleteSweep/>
                                        </button>

                                        <button>
                                            <MdEdit/>
                                        </button>
                                    </div>
                                </div>
                        </div>
                        ))
                    ):(<p>No courses created as of now</p>)}
                    {/* <p>{user}</p> */}
                </div>
            </div>
        </div>
    )
}