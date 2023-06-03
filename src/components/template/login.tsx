"use client"
import {SnackbarProvider} from "notistack";

import {useLoginStore} from "@/domain/user/hooks";
import LoginBoxObserver from "@/components/observing/login/login-box";


export type Props = {}
export default function LoginTemplate(props: Props) {
    const {loginStore} = useLoginStore()
    return (
        <SnackbarProvider maxSnack={3}>
            <LoginBoxObserver loginService={loginStore}/>
        </SnackbarProvider>
    )
}