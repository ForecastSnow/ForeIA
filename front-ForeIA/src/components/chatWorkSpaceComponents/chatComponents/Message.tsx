import type { message } from "../Chat";


function Message({ messageData }: { messageData: message }) {

    return (

        <div className={`w-full flex flex-col mb-8  ${messageData.sender == "user" ? 'items-end' : 'items-start'}`}>

            <div className={`px-3 py-2 rounded-lg w-fit ${messageData.sender != "user" ? "" : 'bg-gray-700'}`}>

                {messageData.sender == "user" && (<p className="text-sm font-bold text-cyan-400 mb-1">{messageData.name}</p>)}

                <p className="text-white text-base">{messageData.message}</p>

                <p className={`text-xs mt-1 ${messageData.sender != "user" ? 'text-gray-200 text-left' : 'text-gray-400 text-right'} `}> {messageData.timestamp}</p>
            </div>
        </div>
    );





}


export default Message