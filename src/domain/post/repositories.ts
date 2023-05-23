import Repository from "@/domain/infra/repository";
import restCall from "@/infra/rest-call";
import {PostModel, TagModel} from "@/domain/post/models";

export class PostRepository extends Repository {
    public async loadPost(id: string, opt = {next: {revalidate: 3 * 60}}): Promise<PostModel> {
        const url = this.getBaseUrl() + "/post/" + id;
        const res = await restCall.get(url, opt)
        if (res.ok) {
            return res.data['post'] as PostModel
        }
        throw new Error("존재 하지 않는 게시물")
    }

    public async addTag(tag: TagModel, accessKey: string) {
        const url = this.getBaseUrl() + "/post/tag";
        return restCall.post(url, {tag: tag.id}, {accessKey})
    }

    public async deleteTag(tag: TagModel, accessKey: string) {
        const url = this.getBaseUrl() + "/post/tag/" + tag.id;
        return restCall.delete(url, {accessKey})
    }

}

const postRepository = new PostRepository()
export default postRepository