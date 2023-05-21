"use client";

import PostWriter from "@/components/post/writer";
import {useTagService} from "@/domain/post/hooks";

export default function PostWriterContainer() {
    const {addTag,deleteTag} = useTagService();
    return (
        <PostWriter onAddChip={addTag} onDeleteChip={deleteTag}/>
    )
}