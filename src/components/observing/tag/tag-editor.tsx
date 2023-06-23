import {observer} from "mobx-react-lite";

import {PostWriteStore} from "@/domain/post/store/PostWriteStore";
import ChipEditor from "@/components/base/chip/chip-editor";
import {ViewItem} from "@/infra/generic-type";
import useMySnackbar from "@/infra/hooks/useMySnackbar";


type Props = {
    postService: PostWriteStore
}

const TagEditorObserver = observer((props: Props) => {
    const {upErrorSnackbar,} = useMySnackbar()

    const postService = props.postService

    async function addChip(item: ViewItem) {
        const res = await postService.addTag(item.id)
        upErrorSnackbar(res)
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