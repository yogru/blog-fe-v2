"use client"

import {SnackbarProvider} from "notistack";

import {useLoginStore} from "@/domain/user/hook/hooks";
import LoginBoxObserver from "@/components/observing/login/login-box";


export default function LoginTemplate() {
    const {loginStore} = useLoginStore()
    return (
        <SnackbarProvider maxSnack={3}>
            <LoginBoxObserver loginService={loginStore}/>
        </SnackbarProvider>
    )
}