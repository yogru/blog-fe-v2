import postRepository, {PostDto} from "@/domain/post/repositories";
import {makeAutoObservable} from "mobx";
import userRepository from "@/domain/user/repositories";
import {CustomError} from "@/infra/errors";
import {Result} from "@/infra/generic-type";


export class PostEditStore {
    postId: string
    title: string
    writerName: string
    createdAt: string
    updatedAt: string
    tags: string[]
    body: string

    constructor(postDto: PostDto) {
        this.postId = postDto.id
        this.title = postDto.title
        this.writerName = postDto.writer.writerName
        this.createdAt = postDto.createdAt
        this.updatedAt = postDto.updatedAt
        this.tags = postDto.tags
        this.body = postDto.body
        makeAutoObservable(this)
    }


    async deletePost(): Promise<Result<null>> {
        try {
            const accessKey = userRepository.getAccessKey()
            await postRepository.setDeletedPost({id: this.postId, deleted: true}, accessKey)
            return {success: true}
        } catch (e) {
            return CustomError.catchAndReturnFail(e)
        }
    }

}