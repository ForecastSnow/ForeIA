function WaitingMessage() {

    return (
        <div className="w-full flex flex-col mb-8 items-start">

            <div className="px-4 py-3 rounded-lg w-fit max-w-md bg-gray-800">

                <div className="flex items-center gap-2">
                    <p className="text-base text-gray-300">La IA está pensando</p>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-700">
                    <p className="text-xs text-gray-400">
                        Esto corre sobre una modesta GPU de notebook. Meter un modelo de <strong className="text-gray-300">3B de parámetros</strong> en <strong className="text-gray-300">6GB de VRAM</strong> es un pequeño milagro de la cuantización. ¡Gracias por la paciencia!
                    </p>
                </div>

            </div>

        </div>
    );
}



export default WaitingMessage