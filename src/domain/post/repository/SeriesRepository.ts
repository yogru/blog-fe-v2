import Repository from "@/infra/repository";
import SearchSeriesRequest from "@/domain/post/repository/request/SearchSeriesRequest";
import restCall from "@/infra/rest-call";
import SearchSeriesResponse from "@/domain/post/repository/response/SearchSeriesResponse";


export class SeriesRepository extends Repository {

    async searchSeries(search: SearchSeriesRequest): Promise<SearchSeriesResponse> {
        const curPage = search.page || 1
        const perPage = search.perPage || 10
        const url = this.getBaseUrl() + `/post/series/list?page=${curPage}&perPage=${perPage}`
        const res = await restCall.get<SearchSeriesResponse>(url)
        return res.data!!
    }
}

const seriesRepository = new SeriesRepository()


export default seriesRepository