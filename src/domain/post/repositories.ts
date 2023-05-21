import Repository from "@/domain/infra/repository";
import restCall from "@/infra/rest-call";

export class PostRepository extends Repository {

    public async loadPost(id: string, opt = {next: {revalidate: 3 * 60}}): Promise<PostModel> {
        const url = this.getBaseUrl() + "/post/" + id;
        const res = await restCall.get(url, opt)
        if (res.ok) {
            return res.data['post'] as PostModel
        }
        throw new Error("존재 하지 않는 게시물")
    }
}

const postRepository = new PostRepository()
export default postRepository