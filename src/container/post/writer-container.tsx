"use client";

import PostWriter from "@/components/post/writer";
import {useTagRepository} from "@/domain/post/hooks";

export default function PostWriterContainer() {
    const {addTag,deleteTag} = useTagRepository();
    return (
        <PostWriter onAddChip={addTag} onDeleteChip={deleteTag}/>
    )
}