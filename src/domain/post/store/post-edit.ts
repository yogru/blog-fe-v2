import {makeAutoObservable} from "mobx";
import userRepository from "@/domain/user/repositories";
import {CustomError} from "@/infra/errors";
import {Result} from "@/infra/generic-type";
import PostModel from "@/domain/post/model/post-model";
import postRepository from "@/domain/post/repository/post-repository";

export class PostEditStore {
    postId: string
    title: string
    writerName: string
    createdAt: string
    updatedAt: string
    tags: string[]
    body: string

    constructor(postDto: PostModel) {
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