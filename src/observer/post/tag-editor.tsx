import {observer} from "mobx-react-lite";

import {PostService} from "@/domain/post/services";
import ChipEditor from "@/components/chip/chip-editor";
import {ViewItem} from "@/infra/generic-type";


type Props = {
    postService: PostService
}

const TagEditorObserver = observer((props: Props) => {
    const postService = props.postService

    async function addChip(item: ViewItem) {
        await postService.addTag(item.id)
    }

    async function deleteChip(id: string) {
        await postService.deleteTag(id)
    }

    return (
        <ChipEditor
            chips={postService.tags.map(t => new ViewItem(t, t))}
            deleteChip={deleteChip}
            addChip={addChip}
        />
    )
})


export default TagEditorObserver