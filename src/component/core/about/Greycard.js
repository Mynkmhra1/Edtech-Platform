export const Greycard=({heading, content})=>{
    return(
        <div>
             <div className="flex flex-col min-h-full bg-[#2C333F] ">
              <p className="text-pure-greys-50 text-xl m-4 p-3">{heading}</p>
              <p className="text-sm text-pure-greys-50 mx-4 px-6 pb-8">{content}</p>
          </div>
        </div>
    )
}