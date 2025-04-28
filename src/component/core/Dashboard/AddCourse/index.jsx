import { Rendersteps } from "./Rendersteps"

export const AddCourse=()=>{
    return(
        <div className=" text-white mt-20">
            <div>
                <h1>Add Course</h1>
                <div>
                    <Rendersteps/>
                </div>
            </div>

            <div>
                <h1>Course Upload Tips</h1>
                
                <p>Set the Course Price option or make it free.</p>
                <p>Standard size for the course thumbnail is 1024x576.</p>
                <p>Video section controls the course overview video.</p>
                <p>Course Builder is where you create & organize a course.</p>
                <p>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</p>
                <p>Information from the Additional Data section shows up on the course single page.</p>
                <p>Make Announcements to notify any important</p>
                <p>Notes to all enrolled students at once.</p>
            </div>
        </div>
    )
}