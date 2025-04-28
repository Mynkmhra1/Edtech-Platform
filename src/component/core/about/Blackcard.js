export const Blackcard=({heading, content})=>{
    return(
        <div>
             <div className="flex flex-col lg:h-[300px] pb-14 bg-[#161D29]">
              <p className="text-pure-greys-50 text-xl m-4 p-3">{heading}</p>
              <p className="text-sm text-pure-greys-50 mx-4 px-6 pb-8">{content}</p>
          </div>
        </div>
    )
}