import { AlertTriangleIcon } from "../assets/SVGS";
import { useQueryClient } from "@tanstack/react-query";
import type { errorApi } from "../utils/apiErrorHandler";


function ErrorLayout(errorData: {error: errorApi}) {

    const queryClient = useQueryClient();

    if (!errorData.error) { queryClient.resetQueries({ queryKey: ["serverStatus"] }); }



    return (

        <div className="flex items-center justify-center w-screen h-screen p-4 bg-gray-900 text-white font-mono">

            <div className="w-full max-w-md p-8 space-y-6 text-center bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-2xl shadow-2xl shadow-red-900/20">

                <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center bg-gray-700/30 rounded-lg border-2 border-dashed border-gray-600 animate-pulse">

                    <span className="text-sm text-gray-500">{errorData.error?.statusCode === 503 ? <img src="./theServerIsDown.jpg" alt="the server is down" /> : <img src="./theServerIsLiterallyDown.jpg" alt="the server is literally down" />}</span>
                </div>

                <h1 className="text-8xl font-extrabold text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                    {errorData.error?.statusCode}
                </h1>

                <p className="text-xl text-gray-300">
                    {errorData.error?.responseData?.message ?? "El Backend esta durmiendo. Shhhh"}
                </p>

                <div className="flex items-center justify-center pt-4 text-yellow-400/80">

                    {errorData.error?.statusCode === 503 ? <p className="text-sm">Esta es una aplicación de demostración. El micro servicio de backend no opera 24/7 para conservar recursos. Es altamente probable que vuelva a estar disponible al rato.</p> : <><AlertTriangleIcon /> <p className="text-sm">Bueno... parece que algo no salio como debia.</p></>}

                </div>

            </div>
        </div>
    );



}


export default ErrorLayout

