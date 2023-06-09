import {observer} from "mobx-react-lite";

import LoginBox from "@/components/base/login/login-box";
import {LoginStore} from "@/domain/user/stores";
import useMySnackbar from "@/infra/hooks/useMySnackbar";
import {useBlogRouter} from "@/infra/hooks/useBlogRouter";

type Props = {
    loginService: LoginStore
}

const LoginBoxObserver = observer((props: Props) => {
    const {upSnackbar} = useMySnackbar()
    const {push} = useBlogRouter()
    const {loginService} = props

    async function onLogin() {
        const ret = await loginService.login()
        console.log("뭐지??", ret)
        ret.success && await push("HOME")
        !ret.success && upSnackbar(ret.errorMessage)
    }

    function onChangeEmail(email: string) {
        loginService.onChangeEmail(email)
    }

    function onChangePassword(password: string) {
        loginService.onChangePassword(password)
    }

    return (
        <LoginBox
            onLogin={onLogin}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
        />
    )
})

export default LoginBoxObserver