import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataFetcher } from '../services/DataFetcher';
import { errorApi } from '../utils/apiErrorHandler';
import Swal from 'sweetalert2';
import logo from "/ForeIAIconV2.png"


function Login() {

    const [isLoginMode, setIsLoginMode] = useState(true);

    const [isFailLogin, setIsFailLogin] = useState(false)

    const [isRegistereded, setIsRegistereded] = useState(false)

    const [passwordMatch, setPasswordMatch] = useState(false)

    const username = useRef<HTMLInputElement>(null);

    const email = useRef<HTMLInputElement>(null);

    const plainPassword = useRef<HTMLInputElement>(null);

    const confirmPlainPassword = useRef<HTMLInputElement>(null);

    const navigate = useNavigate()

    const queryClient = useQueryClient();

    const { mutate: login } = useMutation({
        mutationFn: (credentials: { email: string; plainPassword: string }) => dataFetcher.login(credentials),
        onSuccess: (data) => {
            if (data && data.username && data.idUser) {
                localStorage.setItem('username', data.username);
                localStorage.setItem('idUser', data.idUser);
            }
            queryClient.resetQueries({ queryKey: ["serverStatus"] });
            navigate("/");
        },
        onError: () => {
            setIsFailLogin(true);
        }
    });

    const { mutate: createUser } = useMutation({
        mutationFn: (payload: { username: string, email: string, plainPassword: string }) => dataFetcher.createUser(payload),
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Cuenta creada",
                showConfirmButton: false,
                timer: 2500
            }),
                setIsLoginMode(true)
            setIsRegistereded(false)
            setPasswordMatch(false)
        },
        onError: (error: errorApi) => {
            if (error.statusCode === 409) { setIsRegistereded(true), setPasswordMatch(false) }
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLoginMode) {

            const credentials = { email: (email.current!.value).toString(), plainPassword: (plainPassword.current!.value).toString() }

            login(credentials)

        } else {

            if (confirmPlainPassword.current!.value == plainPassword.current!.value) {

                const payload = { username: (username.current!.value).toString(), email: (email.current!.value).toString(), plainPassword: (plainPassword.current!.value).toString() }

                createUser(payload)

            } else {
                setPasswordMatch(true)
            }

        }
    };

    const switchToSignUp = () => setIsLoginMode(false);
    const switchToLogin = () => setIsLoginMode(true);

    return (

        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0">
                <h2 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">

                    <img
                        className="w-8 h-8 mr-2"
                        src={logo}

                        alt="logo"
                    />

                    ForeIA
                </h2>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {isLoginMode ? 'Inicia sesion' : 'Crear una cuenta'}
                        </h1>
                        {isFailLogin ? <p className="text-xl font-bold leading-tight tracking-tight text-orange-400 md:text-sm">Credenciales invalidos</p> : null}
                        {isRegistereded ? <p className="text-xl font-bold leading-tight tracking-tight text-orange-400 md:text-sm">El email ya tiene una cuenta asociada</p> : null}
                        {passwordMatch ? <p className="text-xl font-bold leading-tight tracking-tight text-orange-400 md:text-sm">Las contraseñas deben coincidir</p> : null}


                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                            {!isLoginMode && (
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Nombre de usuario
                                    </label>
                                    <input minLength={4} maxLength={15} type="text" name="username" id="username" placeholder="nombre" ref={username} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Email
                                </label>
                                <input type="email" name="email" id="email" ref={email} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tuemail@gmail.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Contraseña
                                </label>
                                <input minLength={5} type="password" name="password" id="plainPassword" ref={plainPassword} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>


                            {!isLoginMode && (
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Repetir contraseña
                                    </label>
                                    <input minLength={5} type="password" name="confirm-password" id="confirm-password" ref={confirmPlainPassword} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                            )}

                            <div className="flex items-center justify-between">


                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-primary-700 hover:shadow-[0_0_20px_theme(colors.primary.600)] hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary-300 active:scale-95 active:shadow-none dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {isLoginMode ? 'Ingresar' : 'Crear cuenta'}
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                {isLoginMode ? '¿aun sin una cuenta? ' : '¿ya tienes una cuenta? '}
                                <button onClick={() => {
                                    setIsFailLogin(false)
                                    isLoginMode ? switchToSignUp() : switchToLogin()
                                }} className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                                    {isLoginMode ? 'Registrarse' : 'Iniciar sesion'}
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );


}
export default Login