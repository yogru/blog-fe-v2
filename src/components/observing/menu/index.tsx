"use client"

import {observer} from "mobx-react-lite";

import {MenuStore} from "@/domain/menu/stores";
import Menu from "../../base/menu";
import useMyTheme, {MyTheme} from "@/infra/hooks/useMyTheme";
import {UserStore} from "@/domain/user/stores";
import {useBlogRouter} from "@/infra/hooks/useBlogRouter";

export type Props = {
    userStore: UserStore
}

const MenuObserver = observer((props: Props) => {
    const {theme, setTheme} = useMyTheme()
    const {gotoHome, gotoWritePost, gotoLogin} = useBlogRouter()
    const userStore = props.userStore

    function toggleTheme(t: MyTheme) {
        if (t === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    function onClickTag(): Promise<void> {
        return Promise.resolve()
    }

    function onClickSeries(): Promise<void> {
        return Promise.resolve()
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

    return (
        <Menu
            isLogin={userStore.isLogin}
            logoString={"blog.kyb"}
            theme={theme}
            onClickWriteIcon={onClickWritePost}
            onToggleTheme={toggleTheme}
            onClickLogo={onClickLogo}
            onClickTagIcon={onClickTag}
            onClickSeriesIcon={onClickSeries}
            onClickUserIcon={onClickLoginIcon}
        />
    )
})

export default MenuObserver