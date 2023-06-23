"use client"

import {observer} from "mobx-react-lite";

import Menu from "../../base/menu";
import useMyTheme, {MyTheme} from "@/infra/hooks/useMyTheme";
import {LoginStore} from "@/domain/user/stores";
import {useBlogRouter} from "@/infra/hooks/useBlogRouter";

export type Props = {
    loginStore: LoginStore
}

const MenuObserver = observer((props: Props) => {
    const {theme, setTheme} = useMyTheme()
    const {gotoHome, gotoWritePost, gotoLogin, gotoPostListTag, gotoSeriesList} = useBlogRouter()
    const loginStore = props.loginStore

    function toggleTheme(t: MyTheme) {
        if (t === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    async function onClickTag(): Promise<void> {
        await gotoPostListTag()

    }

    async function onClickSeries(): Promise<void> {
        await gotoSeriesList()

    }

    async function onClickLogo() {
        await gotoHome()
    }

    async function onClickWritePost() {
        await gotoWritePost()
    }

    async function onClickLoginIcon() {
        await gotoLogin()
    }

    async function onClickLogout() {
        await loginStore.logout()
        await gotoHome()
    }

    return (
        <Menu
            theme={theme}
            isLogin={loginStore.isLogin}
            logoString={"blog.kyb"}
            onClickWriteIcon={onClickWritePost}
            onToggleTheme={toggleTheme}
            onClickLogo={onClickLogo}
            onClickTagIcon={onClickTag}
            onClickSeriesIcon={onClickSeries}
            onClickUserIcon={onClickLoginIcon}
            onClickLogout={onClickLogout}
        />
    )
})

export default MenuObserver