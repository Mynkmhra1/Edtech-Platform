import { Link } from "react-router-dom"

const CTAbutton=({children,active,tolink})=>{
    return(
        <div >
            <Link to={tolink}>
                <div className={`text-xl pt-3 pl-5 pr-5 pb-3 m-3 rounded-lg
                    ${active ? "bg-yellow-50 text-black ":" bg-pure-greys-700"}`}>
                    {children}
                </div>
            </Link>
        </div>
    )
}
export default CTAbutton