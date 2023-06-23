import {observer} from "mobx-react-lite";
import {PostListStore} from "@/domain/post/store/PostListStore";
import ChipList from "@/components/base/chip/chip-list";


export type Props = {
    postListStore: PostListStore
}


const TagViewerObserver = observer((props: Props) => {
    const {postListStore} = props

    async function onClickTag(tagId: string) {
        await postListStore.onSelectTag(tagId)
    }

    return (
        <div>

            <div className={"mb-4 text-lg font-bold"}>
                Tags
            </div>
            <ChipList
                onClickChip={onClickTag}
                chips={props.postListStore.statisticsTagChipList}/>
        </div>
    )
})


export default TagViewerObserver