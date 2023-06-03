import {observer} from "mobx-react-lite";
import {PostListStore} from "@/domain/post/store/post-list-store";
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
            <div>태그 리스트</div>
            <ChipList
                onClickChip={onClickTag}
                chips={props.postListStore.statisticsTagChipList}/>
        </div>
    )
})


export default TagViewerObserver