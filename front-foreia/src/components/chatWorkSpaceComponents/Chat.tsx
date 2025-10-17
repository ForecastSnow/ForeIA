import { useEffect, useRef } from "react"
import Message from "./chatComponents/Message"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { dataFetcher } from "../../services/DataFetcher"
import { SendIcon } from "../../assets/SVGS"
import WaitingMessage from "./chatComponents/WaitingMessage"

export type message = {
    message: string,
    sender: string,
    timestamp: string,
    name: string,
    _id: string
}


function Chat(atributes: { chatSelected: string | undefined, setChatSelected: React.Dispatch<React.SetStateAction<string | undefined>> }) {

    const queryClient = useQueryClient();

    const { data: chat, refetch: refreshChat } = useQuery({
        queryKey: ['chatById'],
        enabled: false,
        queryFn: () => dataFetcher.getChatById(atributes.chatSelected ?? ""),
        retry: (failureCount) => {
            return failureCount < 1;
        },
    });

    useEffect(() => {
        if (atributes.chatSelected) { refreshChat() }
    }), [atributes.chatSelected]

    const { mutate: sendNewMessage, isPending: isSendingResponseMessage } = useMutation({
        mutationFn: (payload: { message: string; chatSelected: string }) => dataFetcher.sendNewMessage(payload),
        onSuccess: () => {
            refreshChat()


        }
    });

    const { mutate: createChat, isPending: isSendingResponseCreateChat } = useMutation({
        mutationFn: (payload: { message: string }) => dataFetcher.createChat(payload),
        onSuccess: (data) => {
            atributes.setChatSelected(data.newChat._id)
            queryClient.resetQueries({ queryKey: ["getsChats"] })
            refreshChat()

        }
    });

    const textInput = useRef<HTMLInputElement>(null);

    const inputFunction = () => {

        if (textInput.current?.value && !(isSendingResponseCreateChat || isSendingResponseMessage)) {

            if (atributes.chatSelected === undefined) {

                queryClient.resetQueries({ queryKey: ["serverStatus"] });
                createChat({ message: textInput.current?.value })

            } else {

                queryClient.resetQueries({ queryKey: ["serverStatus"] });
                sendNewMessage({ message: textInput.current?.value, chatSelected: atributes.chatSelected })

            }

            textInput.current!.value = ''
        }
    }

    const enterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter') {

            inputFunction()
        }
    };


    return (
        <div className='w-full h-screen p-4 bg-gray-950 flex flex-col justify-center items-center text-white'>
            <div className="w-full h-full flex flex-col md:max-w-3xl">
                <div className="w-full h-[72px] flex-shrink-0"></div>

                <div className={`flex  ${chat && atributes.chatSelected ? "flex-col-reverse" : "items-center"} flex-1 w-full items-center overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden`}>

                    {(isSendingResponseCreateChat || isSendingResponseMessage) ? <WaitingMessage /> : <></>}

                    <div className="w-full justify-between items-center px-2">

                        {chat && atributes.chatSelected ? (chat.messages.reverse().map((message: message) => (<Message messageData={message} key={message._id} />))) : <>


                            <div className="flex bg-gray-950 p-4 font-mono text-white">

                                <div className="w-full rounded-xl border border-gray-700/50 bg-gray-900/50 p-8 text-center shadow-2xl backdrop-blur-sm">

                                    <h1 className="text-4xl font-bold text-cyan-400">
                                        Bienvenido, {localStorage.getItem("username") || 'Invitado'}
                                    </h1>

                                    <p className="mt-6 text-base leading-relaxed text-gray-300">
                                        Esta es una <strong className="font-semibold text-gray-100">demo técnica</strong> ejecutándose sobre hardware modesto en un servidor casero.
                                    </p>
                                    <p className="mt-2 text-sm text-gray-400">
                                        Debido a la complejidad de las tareas de IA, los tiempos de respuesta pueden no ser sobresalientes. ¡Tu paciencia es muy apreciada!
                                    </p>

                                </div>

                            </div>

                        </>}

                    </div>

                </div>

                <div className="flex items-center p-2 my-6 bg-gray-800 rounded-lg ring-2 ring-gray-600 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200 md: max-w-3xl">

                    <input onKeyDown={enterHandler} autoComplete="off" type="text" id="textInput" ref={textInput} placeholder="Escribe tu mensaje..." className="flex-1 w-full px-2 bg-transparent border-none text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0" />

                    <button type="button" onClick={() => { inputFunction() }} className="ml-2 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors flex-shrink-0" aria-label="Enviar mensaje">

                        <SendIcon />

                    </button>

                </div >
            </div>
        </div >
    );


}


export default Chat