import {observer} from "mobx-react-lite";
import {SeriesListStore} from "@/domain/post/store/SeriesListStore";
import TextCard from "@/components/base/card/text-card";

export type Props = {
    seriesListStore: SeriesListStore
}

const SeriesListObserver = observer((props: Props) => {
    const store = props.seriesListStore

    async function onClickSeriesTitle(seriesId: string) {
        console.log(seriesId)
    }

    return (
        <div className={"flex flex-col mt-8 mb-4"}>
            {store.seriesList.map(t =>
                <div key={t.id} className={"mr-auto ml-auto mt-1 mb-4 min-w-[48rem]"}>
                    <TextCard
                        onClickTitle={onClickSeriesTitle}
                        cardId={t.id} subTitle={`Post(${t.postIds.length})`} title={t.title}/>
                </div>
            )}
        </div>
    )
})

export default SeriesListObserver
