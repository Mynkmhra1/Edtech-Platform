
export const Abouttags=({heading,content,color})=>{
    return(
        <div className="leading-loose">
            <div className={`text-${color} leading-loose text-start font-bold text-3xl`}>
                <p>{heading}</p>
            </div>
            <div className="text-pure-greys-200 text-start">
                {content}
            </div>
        </div>
    )
}