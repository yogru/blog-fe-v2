"use client"

import LoginBox from "@/components/login/LoginBox";
import {useLogin} from "@/domain/user/hooks";
import {useSnackbar} from "notistack";
import {FAIL_TOP_MIDDLE_OPTION} from "@/infra/snackbar";
import {useBlogRouter} from "@/infra/hooks/useBlogRouter";


export default function LoginContainer() {
    const {enqueueSnackbar} = useSnackbar();
    const {replace} = useBlogRouter()
    const login = useLogin()

    async function onSuccessLogin() {
        await replace("HOME")
    }
    async function onFailLogin(message: string) {
        enqueueSnackbar(message, FAIL_TOP_MIDDLE_OPTION)
    }

    return (
        <LoginBox
            onLogin={login}
            onFailLogin={onFailLogin}
            onSuccessLogin={onSuccessLogin}
        />
    )
}