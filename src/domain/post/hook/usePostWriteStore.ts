import {PostWriteStore} from "@/domain/post/store/PostWriteStore";

export const postWriteStore = new PostWriteStore()

export function usePostWriteStore() {
    return {
        postWriteStore
    }
}
