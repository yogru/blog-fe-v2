export type Props = {
    href: string
    imgSrc: string
    title: string
    body: string
    createdAt: string
    updatedAt: string
    tags: string[]
}
export default function HorizonCard(props: Props) {

    return (
        <a href={props.href}
           className="w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-[24rem] md:rounded-none md:rounded-l-lg"
                src={props.imgSrc} alt="post"/>

            <div className="flex min-w-[48rem] max-w-[48rem] flex-col justify-between p-4 leading-normal">
                <h5 className="line-clamp-1 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {props.title}
                </h5>
                <p className="line-clamp-3 mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {props.body}
                </p>
            </div>
        </a>
    )
}