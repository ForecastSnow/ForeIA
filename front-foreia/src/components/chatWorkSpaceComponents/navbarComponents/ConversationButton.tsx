import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "../../../assets/SVGS";
import { dataFetcher } from "../../../services/DataFetcher";

export type Chat = {
    index: string;
    _id: string;

};

function ConversationButton(atributes: { setChatSelected: React.Dispatch<React.SetStateAction<string | undefined>>, chat: Chat, isOpen: boolean }) {

    const queryClient = useQueryClient();

    const { mutate: disableChatById } = useMutation({
        mutationFn: (id: string) => dataFetcher.disableChatById({ id }),
        onSuccess: () => {
            queryClient.resetQueries({ queryKey: ["getsChats"] })
        },

    });

    return (

        <li key={atributes.chat._id} >
            <a onClick={(event) => { event.preventDefault(), atributes.setChatSelected(atributes.chat._id) }} className="flex items-center cursor-pointer justify-between p-3 my-1 rounded-md hover:bg-gray-800 transition-colors duration-200">
                <span className="whitespace-nowrap truncate transition-opacity duration-300">
                    {atributes.chat.index}
                </span>
                {atributes.isOpen && (<button onClick={(e) => { e.stopPropagation(); disableChatById(atributes.chat._id); }} className="p-1 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 flex-shrink-0" aria-label={`Eliminar chat ${atributes.chat.index}`}><TrashIcon /></button>)}
            </a>
        </li>


    )

}


export default ConversationButton