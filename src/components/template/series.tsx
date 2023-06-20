"use client"


import MenuObserver from "@/components/observing/menu";
import {useLoginStore} from "@/domain/user/hooks";

export  type Props = {}


export default function SeriesTemplate(props: Props) {
    const {loginStore} = useLoginStore()

    return (
        <>
            <div>
                <MenuObserver loginStore={loginStore}/>
            </div>

            <div className={"flex mt-8 text-5xl justify-center"}>
                시리즈 목록
            </div>

            <div className={"flex mt-8 mb-4 justify-center"}>
                ...
            </div>

        </>
    )
}