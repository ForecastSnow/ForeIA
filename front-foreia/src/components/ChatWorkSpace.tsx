import Chat from "./chatWorkSpaceComponents/Chat"
import ChatNavMenu from "./chatWorkSpaceComponents/ChatNavMenu"
import { useQuery } from '@tanstack/react-query';
import { dataFetcher } from '../services/DataFetcher';
import { ChatsContext } from "./contexts/ChatContext"
import { useState } from "react";


function ChatWorkspace() {

    const { data: chats } = useQuery({
        queryKey: ['getsChats'],
        queryFn: () => dataFetcher.getChats(),
        retry: (failureCount) => {
            return failureCount < 1;
        },
    });

    const [chatSelected, setChatSelected] = useState<string | undefined>(undefined)

    return (

        <div className="flex">

            <ChatsContext.Provider value={chats}>

                <ChatNavMenu setChatSelected={setChatSelected} />
                <Chat chatSelected={chatSelected} setChatSelected={setChatSelected} />

            </ChatsContext.Provider>

        </div>

    )

}


export default ChatWorkspace