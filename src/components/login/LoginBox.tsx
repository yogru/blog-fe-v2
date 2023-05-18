"use client"

import {useState} from "react";
import {useLogin} from "@/domain/user/hooks";

export default function LoginBox() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const login = useLogin()

    function onChangeEmail(e: any) {
        setEmail(e.target.value)
    }

    function onChangePassword(e: any) {
        setPassword(e.target.value)
    }

    async function onClickSignIn() {
        await login(email, password)
    }

    return (
        <div className={"flex flex-col  m-auto w-96 h-96 bg-white rounded-md"}>
            <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login
                    </h2>
                </div>

                <div className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email
                                address
                            </label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email" required
                                       onChange={onChangeEmail}
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                {/*<div className="text-sm">*/}
                                {/*    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot*/}
                                {/*        password?</a>*/}
                                {/*</div>*/}
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password"
                                       required
                                       onChange={onChangePassword}
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div className={"mt-4"}>
                            <button type="submit"
                                    onClick={onClickSignIn}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}