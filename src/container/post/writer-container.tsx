"use client";


import PostWriter from "@/components/post/writer";
import {ViewItem, ViewResponse} from "@/domain/infra/generic-view-type";

export type Props = {}


export default function PostWriterContainer() {
    async function add(chip: ViewItem): Promise<ViewResponse> {
        return {
            success: true
        }
    }

    async function del(chipId: string): Promise<ViewResponse> {
        return {
            success: true
        }
    }

    return (
        <PostWriter onAddChip={add} onDeleteChip={del}/>
    )
}