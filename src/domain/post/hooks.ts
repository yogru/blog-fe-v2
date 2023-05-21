import {useCallback} from "react";
import {ViewItem, ViewResponse} from "@/infra/generic-view-type";
import postRepository from "@/domain/post/repositories";

import {useAccessKey} from "@/domain/user/hooks";

export function useTagService() {
    const {accessKey, isValid} = useAccessKey()

    const addTag = useCallback(async (chip: ViewItem) => {
        if (!isValid) return {success: false, errorMessage: "로그인 확인"} as ViewResponse
        const res = await postRepository.addTag(chip.viewValue, accessKey)
        return {
            success: res.ok,
            errorMessage: res.message
        } as ViewResponse
    }, [accessKey, isValid])

    const deleteTag = useCallback(async (chipId: string) => {
        if (!isValid) return {success: false, errorMessage: "로그인 확인"} as ViewResponse
        const res = await postRepository.deleteTag(chipId, accessKey)
        return {
            success: res.ok,
            errorMessage: res.message
        } as ViewResponse
    }, [accessKey, isValid])

    return {addTag, deleteTag}
}