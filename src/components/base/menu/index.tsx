"use client"

import Image from 'next/image';
import {MyTheme} from "@/infra/hooks/useMyTheme";
import {
    ThemeToggleIcon,
    TagIcon,
    SeriesListIcon,
    WritePostIcon,
    UserIcon,
    LogoutIcon, SeriesWriteIcon
} from "@/components/base/menu/head-icon";
import NanumMyeongjoFont from "@/components/base/font/nanum-myeongjo";


export type Props = {
    isLogin: boolean
    logoString: string
    theme: MyTheme
    onToggleTheme: (myTheme: MyTheme) => void,
    onClickTagIcon: () => Promise<void>,
    onClickSeriesIcon: () => Promise<void>
    onClickLogo: () => Promise<void>
    onClickWriteIcon: () => Promise<void>
    onClickUserIcon: () => Promise<void>
    onClickLogout: () => Promise<void>
    onClickSeriesWriteIcon: () => Promise<void>
}

const rootCls: string = "sticky flex w-full h-20 border-b-2"
const itemCls: string = "flex hover:cursor-pointer text-2xl rounded mt-auto mb-auto"
const logoItemCls: string = itemCls + " " + "font-extrabold ml-4"
const themeItemCls: string = itemCls + " " + "ml-auto mr-4"
const tagItemCls: string = itemCls + " " + "mr-4"
const seriesItemCls: string = itemCls + " " + "mr-4"
const writeItemCls: string = itemCls + " " + "ml-4"
const userItemCls: string = itemCls + " " + "ml-4"
const logoutItemCls: string = itemCls + " " + "mr-4"
const seriesWriteCls: string = itemCls + " " + "ml-2"

export default function Menu(props: Props) {
    const logoString = props.logoString || "blog.kyb"

    return (
        <div className={rootCls}>
            <div className={logoItemCls} onClick={props.onClickLogo}>
                <Image src={"/images/pizza-48.png"} alt={"blog-logo"} width={48} height={48}/>
                <NanumMyeongjoFont>
                    <div className={"mt-1 ml-1 text-4xl"}>{logoString}</div>
                </NanumMyeongjoFont>
            </div>

            {
                !props.isLogin &&
                <div className={userItemCls}>
                    <UserIcon onClick={props.onClickUserIcon}/>
                </div>

            }

            {
                props.isLogin &&
                <div className={writeItemCls}>
                    <WritePostIcon onClick={props.onClickWriteIcon}/>
                </div>
            }

            {
                props.isLogin &&
                <div className={seriesWriteCls}>
                    <SeriesWriteIcon onClick={props.onClickSeriesWriteIcon}/>
                </div>
            }

            <div className={themeItemCls}>
                <ThemeToggleIcon theme={props.theme} onClick={props.onToggleTheme}/>
            </div>

            <div className={tagItemCls}>
                <TagIcon onClick={props.onClickTagIcon}/>
            </div>

            <div className={seriesItemCls}>
                <SeriesListIcon onClick={props.onClickSeriesIcon}/>
            </div>
            {
                props.isLogin &&
                <div className={logoutItemCls}>
                    <LogoutIcon onClick={props.onClickLogout}/>
                </div>
            }
        </div>
    )
}






