"use client"

import {SnackbarProvider} from "notistack";
import LoginBoxObserver from "@/observer/login/login-box";
import {loginStore} from "@/domain/user/stores";

export default function LoginPage() {
    return (
        <SnackbarProvider maxSnack={3}>
            <LoginBoxObserver loginService={loginStore}/>
        </SnackbarProvider>
    )
}