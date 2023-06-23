export default interface SearchPostRequest {
    curPage: number
    perPage: number
    tags?: string[]
    title?: string
}