export default interface CreatePostRequest {
    title: string
    body: string
    tags: string[]
    deleted?: boolean
}