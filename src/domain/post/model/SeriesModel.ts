import {PostUserValue} from "@/domain/post/model/PostUserValue";

export default interface SeriesModel {
    id: string
    title: string
    writer: PostUserValue,
    body: string | null
    postIds: string[]
}