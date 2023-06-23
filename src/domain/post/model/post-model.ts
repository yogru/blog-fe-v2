import {PostUserValue} from "@/domain/post/model/post-user-value";


export default interface PostModel {
    id: string
    title: string
    body: string
    writer: PostUserValue
    username: string
    createdAt: string
    updatedAt: string
    tags: string []
    deleted: boolean
}
