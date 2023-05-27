'use client'

import MenuObserver from "@/observer/menu";
import menuStore from "@/domain/menu/stores";

export default function Home() {
    return (
        <>
            <MenuObserver store={menuStore}/>
        </>
    )
}
