import { useState } from "react"
import {HomePageExplore} from "../../../data/homepage-explore"
import Card from "./Card"
const tabs=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
const ExploreMore =()=>{
    const[currentTab,setCurrentTab]=useState(tabs[0])
    const[courses,setcourses]=useState(HomePageExplore[0].courses)
    const[currentCard, setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

    const setcard=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=>course.tag===value);
        setcourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }

    return (
    <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-white">
            <p>Unlock the <span className="text-blue-500">Power of Code</span></p>
        </div>
        <p className="text-richblack-200">Learn to Build Anything You Can Imagine</p>

        <div className="flex flex-row mt-10 mb-10 bg-richblack-800 p-1 rounded-full">
            {
                tabs.map((element,index)=>{ 
                    return(
                        <div className={`p-2 pr-4 pl-4 rounded-full cursor-pointer text-[16px] ${element===currentTab? "bg-richblack-900 text-white":"bg-richblack-800 text-pure-greys-300"} `} key={index}
                        onClick={()=>{setcard(element)}}>
                            {element}
                        </div>
                        
                    )
                })
            }
        </div>
        <div className="flex flex-row w-3/4 items-center justify-center">
            {
                courses.map((course,index)=>{
                    return(
                    <Card heading={`${course.heading}`} 
                    description={`${course.description}`}
                    level={`${course.level}`}
                    lessionnumber={`${course.lessionNumber}`} 
                    currentCard={currentCard} 
                    currentTab={currentTab}
                    key={index}></Card>
                )})
            }
        
            
        </div>

    </div>)
}

export default ExploreMore