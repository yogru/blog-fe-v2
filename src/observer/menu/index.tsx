import {observer} from "mobx-react-lite";

import {MenuStore} from "@/domain/menu/stores";
import Menu from "@/components/menu";

export type Props = {
    store: MenuStore
}

const MenuObserver = observer((props: Props) => {
    return (
        <Menu/>
    )
})

export default MenuObserver