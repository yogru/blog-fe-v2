import {PostWriteStore} from "@/domain/post/store/post-write";
import {useEffect} from "react";

export const postWriteStore = new PostWriteStore()


export function usePostWriteStore() {

    return {
        postWriteStore
    }
}
