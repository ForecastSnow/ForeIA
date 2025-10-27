import { useContext, useEffect, useState } from 'react';
import { NewChat, HamburgerIcon, LogoutIcon } from "../../assets/SVGS.tsx"
import { ChatsContext } from "../contexts/ChatContext.tsx"
import { dataFetcher } from "../../services/DataFetcher.ts";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { Chat } from './navbarComponents/ConversationButton.tsx';
import ConversationButton from './navbarComponents/ConversationButton.tsx';
import UseMediaQuery from '../../utils/useMediaQuery.ts';



function ChatNavMenu(atributes: { setChatSelected: React.Dispatch<React.SetStateAction<string | undefined>> }) {

  const chats = useContext(ChatsContext)

  const [isOpen, setIsOpen] = useState<boolean>(window.innerWidth > 640);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  const useMediaQuery = UseMediaQuery

  const isDesktop = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    setIsMobile(isDesktop);
  }, [isDesktop]);

  const navigate = useNavigate()

  const { mutate: logout } = useMutation({
    mutationFn: () => dataFetcher.logout(),
    onSuccess: () => { localStorage.clear(), navigate(0); },

  });


  return (
    <aside className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'w-72' : 'w-20'} ${isMobile ? 'fixed z-10' : ''} ${(!isOpen && isMobile) ? 'w-[66] bg-gray-950' : 'h-screen'}`}>

      <div className={`flex justify-between items-center ${(!isOpen && isMobile) ? '' : ' border-b border-gray-700'} p-4 flex-shrink-0`}>

        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-700 focus:outline-none ring-2 ring-gray-600" aria-label="Toggle menu"> <HamburgerIcon /></button>

        <h1 className={`ml-4 mr-4 text-xl font-bold whitespace-nowrap transition-opacity duration-400 ${isOpen ? 'opacity-100' : 'opacity-0 text-gray-900'} `}>ForeIA</h1>

      </div>

      <nav className={`flex-grow p-2 overflow-y-auto  ${(!isOpen && isMobile) ? 'hidden' : ''} [&::-webkit-scrollbar]:w-2
                                 [&::-webkit-scrollbar-track]:bg-gray-900
                                 [&::-webkit-scrollbar-track]:rounded-full
                                    
                                 // Estilos del THUMB (la barra que se mueve)
                                 [&::-webkit-scrollbar-thumb]:bg-gray-400
                                 [&::-webkit-scrollbar-thumb]:rounded-full
                                    
                                 // Estilo del THUMB en estado HOVER
                                 hover:[&::-webkit-scrollbar-thumb]:bg-gray-500`}>

        <ul className='flex flex-col-reverse'>


          {Array.isArray(chats) && chats.map((chat: Chat) => (<ConversationButton setChatSelected={atributes.setChatSelected} key={chat._id} chat={chat} isOpen={isOpen} />))}

          <li onClick={() => { atributes.setChatSelected(undefined) }} className='flex justify-center cursor-pointer p-3 my-1 rounded-md bg-gray-700 hover:bg-gray-800 transition-colors duration-200' key={0}>

            <a>

              <span className={`cursor-pointer whitespace-nowrap truncate transition-opacity duration-300`}>{!isOpen ? <NewChat /> : 'Nuevo chat'}</span>

            </a>

          </li>

        </ul>

      </nav>

      <div className={`${(!isOpen && isMobile) ? 'hidden' : ''} p-4 border-t border-gray-700 flex-shrink-0`}>

        <div className="flex items-center">

          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold flex-shrink-0">
            {localStorage.getItem("username")?.charAt(0).toUpperCase()}
          </div>

          <div className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <p className="font-semibold w-20 truncate text-sm">{localStorage.getItem("username")}</p>
            <p className="text-xs w-20 truncate text-gray-400">ID: {localStorage.getItem("idUser")}</p>
          </div>

          <div className="flex-shrink-0 ml-6 mb-2">

            <button onClick={() => logout()} className={`flex items-center  rounded-md text-red-400 hover:text-red-800/50 transition-colors duration-200 cursor-pointer ${isOpen ? 'opacity-100' : 'hidden'}`}> <LogoutIcon />
              <span className={"ml-2 not-[]:font-semibold whitespace-nowrap transition-opacity duration-300"}>Logout</span>
            </button>

          </div>

        </div>

      </div>

    </aside>
  );
};

export default ChatNavMenu;