"use client"

import Image from 'next/image';
import {MyTheme} from "@/infra/hooks/useMyTheme";
import {ThemeToggleIcon, TagIcon, SeriesIcon} from "@/components/menu/head-icon";


export type Props = {
    logoString: string
    theme: MyTheme
    onToggleTheme: (myTheme: MyTheme) => void,
    onClickTagIcon: () => Promise<void>,
    onClickSeriesIcon: () => Promise<void>
}

const rootCls: string = "sticky flex w-full h-20 border-b-2"
const itemCls: string = "flex hover:cursor-pointer text-2xl rounded mt-auto mb-auto"
const logoItemCls = itemCls + " " + "font-extrabold ml-4"
const themeItemCls = itemCls + " " + "ml-auto mr-4"
const tagItemCls = itemCls + " " + "mr-4"
const seriesItemCls = itemCls + " " + "mr-4"

export default function Menu(props: Props) {
    const logoString = props.logoString || "blog.kyb"

    return (
        <div className={rootCls}>
            <div className={logoItemCls}>
                <Image src={"/images/pizza-48.png"} alt={"blog-logo"} width={48} height={48}/>
                <div className={"mt-1 ml-1 text-4xl"}>{logoString}</div>
            </div>

            <div className={themeItemCls}>
                <ThemeToggleIcon theme={props.theme} onClick={props.onToggleTheme}/>
            </div>

            <div className={tagItemCls}>
                <TagIcon onClick={props.onClickTagIcon}/>
            </div>

            <div className={seriesItemCls}>
                <SeriesIcon onClick={props.onClickSeriesIcon}/>
            </div>

        </div>
    )
}






