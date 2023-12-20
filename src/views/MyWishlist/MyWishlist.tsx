import { ArrowRightStartOnRectangleIcon, BookmarkIcon, Cog6ToothIcon, GiftIcon, PencilSquareIcon, UserCircleIcon, UserPlusIcon } from "@heroicons/react/16/solid";

export function MyWishlist() {
    const gifts = [
        {
            title: 'Zapatos',
            url: 'https://www.mercadolibre.com.ar/samsung-galaxy-a34-128gb-6gb-ram-awesome-silver/p/MLA22385547?pdp_filters=deal%3AMLA779357-1#polycard_client=homes-korribanSearchTodayPromotions&searchVariation=MLA22385547&position=5&search_layout=grid&type=product&tracking_id=0d0dd26a-b541-4392-ad21-edae9ffb3b1e'
        }, {
            title: 'Auriculares',
            url: 'https://www.mercadolibre.com.ar/luz-de-emergencia-led-220v-potente-con-bateria-recargable-4w/p/MLA19847827#polycard_client=recommendations_home_second-trend-function-recommendations&reco_backend=second_trend_function&reco_client=home_second-trend-function-recommendations&reco_item_pos=1&reco_backend_type=function&reco_id=ad3682a6-3b62-4f9b-944a-0cf7810d0b15&wid=MLA1394483883&sid=recos'
        },
        {
            title: 'Zapatos',
            url: 'https://www.mercadolibre.com.ar/samsung-galaxy-a34-128gb-6gb-ram-awesome-silver/p/MLA22385547?pdp_filters=deal%3AMLA779357-1#polycard_client=homes-korribanSearchTodayPromotions&searchVariation=MLA22385547&position=5&search_layout=grid&type=product&tracking_id=0d0dd26a-b541-4392-ad21-edae9ffb3b1e'
        }, {
            title: 'Auriculares',
            url: 'https://www.mercadolibre.com.ar/luz-de-emergencia-led-220v-potente-con-bateria-recargable-4w/p/MLA19847827#polycard_client=recommendations_home_second-trend-function-recommendations&reco_backend=second_trend_function&reco_client=home_second-trend-function-recommendations&reco_item_pos=1&reco_backend_type=function&reco_id=ad3682a6-3b62-4f9b-944a-0cf7810d0b15&wid=MLA1394483883&sid=recos'
        },
        {
            title: 'Zapatos',
            url: 'https://www.mercadolibre.com.ar/samsung-galaxy-a34-128gb-6gb-ram-awesome-silver/p/MLA22385547?pdp_filters=deal%3AMLA779357-1#polycard_client=homes-korribanSearchTodayPromotions&searchVariation=MLA22385547&position=5&search_layout=grid&type=product&tracking_id=0d0dd26a-b541-4392-ad21-edae9ffb3b1e'
        }, {
            title: 'Auriculares',
            url: 'https://www.mercadolibre.com.ar/luz-de-emergencia-led-220v-potente-con-bateria-recargable-4w/p/MLA19847827#polycard_client=recommendations_home_second-trend-function-recommendations&reco_backend=second_trend_function&reco_client=home_second-trend-function-recommendations&reco_item_pos=1&reco_backend_type=function&reco_id=ad3682a6-3b62-4f9b-944a-0cf7810d0b15&wid=MLA1394483883&sid=recos'
        },
    ]

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="flex justify-center items-center rounded-lg shadow-lg p-4 bg-gradient-to-b from-white via-transparent to-neutral-100">
                        <Cog6ToothIcon className="h-6 w-6 text-black" />
                    </div>
                    <UserCircleIcon className="h-16 w-16 text-black" />
                    <div className="flex justify-center items-center rounded-lg shadow-lg p-4 bg-gradient-to-b from-white via-transparent to-neutral-100">
                        <UserPlusIcon className="h-6 w-6 text-black" />
                    </div>
                </div>
                <div className="text-center">
                    <p>Buscá y encontrá tus regalos favoritos</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl">Mis estadísticas</h3>
                <div className="flex justify-between">
                    <div className="flex flex-col items-center">
                        <BookmarkIcon className="h-8 w-8 text-black" />
                        <h4 className="font-semibold">Regalos guardados</h4>
                    </div>
                    <div className="flex flex-col items-center">
                        <GiftIcon className="h-8 w-8 text-black" />
                        <h4 className="font-semibold">Regalos recibidos</h4>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl">Mi lista de deseados</h3>
                    <button className="rounded-lg shadow-lg p-2 text-blue-500 flex gap-1 text-lg items-center">
                        Editar
                        <PencilSquareIcon className="h-6 w-6" />
                    </button>
                </div>
                <ul className="flex flex-col gap-6">
                    {gifts.map((gift, index): any => (
                        <li key={index} className="flex items-center bg-white shadow-lg rounded-lg p-2 gap-4">
                            <GiftIcon className="h-16 w-16 text-slate-500" />
                            <div className="flex flex-col gap-2">
                                <h4 className="font-semibold text-lg">{gift.title}</h4>
                                <a href={gift.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600">
                                    <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                                    Ver publicación del regalo
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}