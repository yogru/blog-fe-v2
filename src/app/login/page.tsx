"use client"

import {SnackbarProvider} from "notistack";
import LoginBox from "@/components/login/LoginBox";

export default function LoginPage() {
    return (
        <SnackbarProvider maxSnack={3}>
            <LoginBox/>
        </SnackbarProvider>
    )
}