'use client'

import MenuObserver from "@/observer/menu";
import menuStore from "@/domain/menu/stores";
import CardListObserver from "@/observer/card/card-list";

export default function Home() {
    return (
        <>
            <MenuObserver store={menuStore}/>
            <div className={"pt-12 pl-48 pr-32"}>
                <CardListObserver/>
            </div>
        </>
    )
}
