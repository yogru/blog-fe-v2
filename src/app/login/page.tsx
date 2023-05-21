"use client"

import {SnackbarProvider} from "notistack";
import LoginContainer from "@/container/login/login-container";

export default function LoginPage() {
    return (
        <SnackbarProvider maxSnack={3}>
            <LoginContainer/>
        </SnackbarProvider>
    )
}