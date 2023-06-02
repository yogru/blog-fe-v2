"use client"

import {observer} from "mobx-react-lite";

import {MenuStore} from "@/domain/menu/stores";
import Menu from "../../base/menu";
import useMyTheme, {MyTheme} from "@/infra/hooks/useMyTheme";
import {UserStore} from "@/domain/user/stores";

export type Props = {
    userStore: UserStore
}

const MenuObserver = observer((props: Props) => {
    const {theme, setTheme} = useMyTheme()

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


    return (
        <Menu
            logoString={"blog.kyb"}
            theme={theme}
            onToggleTheme={toggleTheme}
            onClickTagIcon={onClickTag}
            onClickSeriesIcon={onClickSeries}
        />
    )
})

export default MenuObserver