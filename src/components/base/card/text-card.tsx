export type Props = {
    cardId: string
    title: string
    subTitle: string
    onClickTitle: (id: string) => Promise<void>
}


export default function TextCard(props: Props) {
    async function onClickTitle() {
        await props.onClickTitle(props.cardId)
    }

    return (
        <div className={"flex flex-col p-2 pb-10 border-b-2"}>
            <div onClick={async () => await onClickTitle()}
                 className={"hover:cursor-pointer line-clamp-1 text-3xl font-bold"}>
                {props.title}
            </div>

            <div className={"line-clamp-1 mt-2 text-xs"}>
                {props.subTitle}
            </div>
        </div>
    )
}


