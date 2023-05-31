import Card, {CardData} from "@/components/card/card";

export type Props = {
    dataList: CardData[]
    onClick: (id: string) => Promise<void>
}


export default function CardList(props: Props) {
    return (
        <div className={"flex w-full flex-wrap"}>
            {props.dataList.map(data =>
                <div key={data.id} className={"mr-16 mb-16"}>
                    <Card key={data.id} data={data} onClick={props.onClick}/>
                </div>
            )
            }
        </div>
    )
}