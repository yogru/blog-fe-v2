import {observer} from "mobx-react-lite";

export type Props = {
    isEnd: boolean
}



const Footer = observer((props:Props)=>{
    if (!props.isEnd) return null
    return (
        <div className={"flex flex-col min-h-[80px] w-full text-center border-t-2"}>
            <div className={"m-auto"}>
                © kyb.blog, Built with <a className={"hover:underline"} href={"https://github.com/WindowMania"}
                                          target={"_blank"}> here </a>
            </div>
        </div>
    )
})

export default Footer

// export default function Footer(props: Props) {
//     if (!props.isEnd) return null
//     return (
//         <div className={"flex flex-col min-h-[80px] w-full text-center border-t-2"}>
//             <div className={"m-auto"}>
//                 © kyb.blog, Built with <a className={"hover:underline"} href={"https://github.com/WindowMania"}
//                                           target={"_blank"}> here </a>
//             </div>
//         </div>
//     )
// }