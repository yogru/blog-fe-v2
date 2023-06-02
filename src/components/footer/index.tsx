export type Props = {}


export default function Footer(props: Props) {
    return (
        <div className={"flex flex-col min-h-[80px] w-full text-center border-t-2"}>
            <div className={"m-auto"}>
                © kyb.blog, Built with <a className={"hover:underline"} href={"https://github.com/WindowMania"}
                                          target={"_blank"}> here </a>
            </div>
        </div>
    )
}