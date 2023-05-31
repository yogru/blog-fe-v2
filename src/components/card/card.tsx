import Image from "next/image";

export type CardData = {
    id: string
    src: string
    title: string
    content: string
    createdAt: string
}

export type Props = {
    data: CardData
    onClick: (id: string) => Promise<void>
}

const rootSty: string = "max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"

const titleSty: string = "line-clamp-1 w-full mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"

const bodySty: string = "p-5 h-44"

const contentSty: string = "line-clamp-4 mb-3 font-normal text-gray-700 dark:text-gray-400"

const divideSty: string = "divide-y-[1px]"

const footerSty: string = "h-12 p-3 pl-5 text-gray-700 text-sm"
export default function Card(props: Props) {
    const {src, title, content, createdAt} = props.data
    return (
        <div
            onClick={() => props.onClick(props.data.id)}
            className={rootSty}>
            <div>
                <Image width={382}
                       height={214.88}
                       className={"rounded-t-lg"}
                       src={src} alt={"post"}/>
            </div>
            <div className={divideSty}>
                <div className={bodySty}>
                    <a href="#">
                        <h5 className={titleSty}>{title}</h5>
                    </a>
                    <p className={contentSty}>
                        {content}
                    </p>
                </div>
                <div className={footerSty}>
                    {createdAt} 작성
                </div>
            </div>

        </div>
    )
}