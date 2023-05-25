import {createContext, useCallback, useState} from "react";

import {ViewItem} from "@/infra/generic-type";
import postRepository from "@/domain/post/repositories";
import {useAccessKey} from "@/domain/user/hooks";
import useMySnackbar from "@/infra/hooks/useMySnackbar";
import {TagModel} from "@/domain/post/models";
import {AddChipAction, DeleteChipAction} from "@/components/chip/chip-editor"


type PostWriteContextState = {
    title: string,
    tags: string[],
    addTag: (tagId: string, tagName: string) => Promise<void>
    deleteTag: (tagId: string) => Promise<void>
}
export const PostWriteContext = createContext<PostWriteContextState>({
    title: '',
    tags: [],
    addTag: (tagId: string, tagName: string) => Promise.reject(),
    deleteTag: (tagId: string) => Promise.reject()
});

export function usePostWriteService() {
    const [tags, setTags] = useState<string[]>([])
    const [title, setTitle] = useState<string>('')

    const addTag = useCallback(async (tagId: string, tagName: string) => {
        return Promise.resolve()
    }, [setTags])

    const deleteTag = useCallback(async (tagId: string) => {
        return Promise.resolve()
    }, [setTags])


    return {tags, title, addTag, deleteTag}
}


export function useTagService() {
    const [tags, setTags] = useState<string[]>([])
    const [title, setTitle] = useState<string>('')


    const {upSnackbar} = useMySnackbar()
    const {accessKey, isValid} = useAccessKey()

    const addTag = useCallback(async (chip: ViewItem) => {
        const ret: AddChipAction = {
            type: "addChip",
            success: true,
            item: chip
        }
        if (!isValid) {
            // 로그인 반복되니까. 모듈화 시켜야겠다..
            upSnackbar("로그인 되지 않았습니다.")
            ret.success = false
            return ret
        }
        try {
            const tag: TagModel = new TagModel(chip.id)
            tag.isValid()
            const res = await postRepository.addTag(tag, accessKey)
            if (!res.ok) {
                ret.success = false
                upSnackbar(res.message!!)
            }
        } catch (e) {
            upSnackbar(e as string)
            ret.success = false
        }
        return ret
    }, [accessKey, isValid])

    const deleteTag = useCallback(async (chipId: string) => {
        const ret: DeleteChipAction = {
            success: true,
            type: "deleteChip",
            itemId: chipId
        }
        if (!isValid) {
            upSnackbar("로그인 되지 않았습니다.")
            ret.success = false
            return ret
        }
        try {
            const tag: TagModel = new TagModel(chipId)
            const res = await postRepository.deleteTag(tag, accessKey)
            if (!res.ok) {
                upSnackbar(res.message!!)
                ret.success = false
            }
        } catch (e) {
            upSnackbar(e as string)
            ret.success = false
        }
        return ret
    }, [accessKey, isValid])


    return {addTag, deleteTag}
}