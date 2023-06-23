import SeriesListTemplate from "@/components/template/series-list";
import seriesRepository from "@/domain/post/repository/SeriesRepository";

export default async function SeriesPage() {
    const page = 1
    const perPage = 10
    const seriesRes = await seriesRepository.searchSeries({
        page,
        perPage
    })
    return (
        <SeriesListTemplate seriesListInitContext={{
            perPage,
            page,
            seriesList: seriesRes.seriesList
        }}/>
    )
}