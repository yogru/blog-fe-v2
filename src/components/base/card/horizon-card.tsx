import ChipList from "@/components/base/chip/chip-list";
import {ViewItem} from "@/infra/generic-type";

export type Props = {
    imgSrc: string
    title: string
    body: string
    createdAt: string
    updatedAt: string
    tags: string[]
    onClick: () => Promise<void>
}
export default function HorizonCard(props: Props) {

    const viewItems = props.tags.map((tag: string) => (new ViewItem(tag, tag)))

    return (
        <a
            onClick={async () => await props.onClick()}
            className="w-full hover:cursor-pointer flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-[24rem] md:rounded-none md:rounded-l-lg"
                src={props.imgSrc} alt="post"/>

            <div className="flex min-w-[48rem] max-w-[48rem] flex-col p-4 leading-normal">
                <div>
                    <h5 className="line-clamp-1 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {props.title}
                    </h5>
                </div>

                <div>
                    <p className="line-clamp-3 mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {props.body}
                    </p>
                </div>

                <div className={"mt-auto"}>
                    <ChipList chips={viewItems}/>
                </div>

            </div>

        </a>
    )
}