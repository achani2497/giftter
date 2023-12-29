import { ArrowRightStartOnRectangleIcon, BookmarkIcon, Cog6ToothIcon, GiftIcon, PencilIcon, PencilSquareIcon, TrashIcon, UserCircleIcon, UserPlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GiftSkeleton } from "../../components/Feedback/GiftSkeleton";
import { Modal } from "../../components/Modal/Modal";
import { useFetchGifts } from "../../hooks/Gift";
import { IGift } from "../../utils/types";
import { GiftForm } from "./components/GiftForm";

export function MyWishlist() {
    const [isEditing, setIsEditing] = useState(false)
    const [giftToEdit, setGiftToEdit] = useState<IGift | null>(null)
    const [openEditModal, setOpenEditModal] = useState(false)
    const userData = useSelector((store: any) => store.user.data);
    const { gifts, isLoading } = useFetchGifts(userData.id)

    return (
        <div className="flex flex-col gap-8">
            {/* Encabezado de la seccion */}
            <div className="flex flex-col gap-2">
                <h2>REHACER ESTO, NO QUEDA BIEN, QUITAR EL ICONO DEL ENGRANAJE</h2>
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
                    <p className="text-lg">Buscá y encontrá tus regalos favoritos</p>
                </div>
            </div>
            {/* Estadisticas */}
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl text-slate-600">Mis estadísticas</h3>
                <div className="flex justify-between">
                    <div className="flex flex-col items-center text-slate-600">
                        <BookmarkIcon className="h-8 w-8 text-slate-400" />
                        <h4 className="font-semibold">Regalos guardados</h4>
                    </div>
                    <div className="flex flex-col items-center text-slate-600">
                        <GiftIcon className="h-8 w-8 text-slate-400" />
                        <h4 className="font-semibold">Regalos recibidos</h4>
                    </div>
                </div>
            </div>
            {/* Regalos */}
            <div className="flex flex-col gap-4 pb-16 relative">
                {/* Encabezado */}
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl text-slate-600">Mi lista de deseados</h3>
                    {gifts.length ? (<button className=" text-blue-500 flex gap-1 text-lg items-center" onClick={() => setIsEditing(!isEditing)}>
                        <span>{isEditing ? 'Dejar de editar' : 'Editar'}</span>
                        <PencilSquareIcon className="h-6 w-6" />
                    </button>) : null}
                </div>
                {/* Lista de regalos */}
                {
                    isLoading ? (
                        <>
                            <GiftSkeleton />
                            <GiftSkeleton />
                            <GiftSkeleton />
                        </>
                    ) : (

                        <ul className={"flex flex-col gap-4 pb-4 max-h-[400px] shadow-inner overflow-y-scroll overflow-x-hidden px-2"}>
                            {gifts.length ? gifts.map((gift: IGift, index: number) => (
                                <li key={index} className={`flex min-h-[100px] items-center grow bg-white shadow-lg rounded-lg overflow-hidden ${isEditing ? '' : 'p-2'}`}>
                                    {isEditing && (
                                        <button className="flex justify-center items-center h-[100px] bg-red-400 w-12">
                                            <TrashIcon className="h-6 w-6 text-white" />
                                        </button>
                                    )}
                                    <div className="flex gap-4 items-center">
                                        <GiftIcon className="h-16 w-16 text-slate-500" />
                                        <div className="flex flex-col gap-2">
                                            <h4 className="font-semibold text-lg">{gift.title}</h4>
                                            <a href={gift.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-500">
                                                <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                                                Ver publicación del regalo
                                            </a>
                                        </div>
                                    </div>
                                    {isEditing && (
                                        <button className="flex justify-center items-center h-[100px] bg-blue-400 w-12" onClick={() => {
                                            setOpenEditModal(true)
                                            setGiftToEdit(gift)
                                        }}>
                                            <PencilIcon className="h-6 w-6 text-white" />
                                        </button>
                                    )}
                                </li>
                            )) : <h4 className="text-lg font-semibold text-slate-600 text-center"> Todavía no tenes regalos en tu lista. Agrega alguno! </h4>}
                        </ul>
                    )
                }
                <button className="absolute w-full bottom-0 py-2 px-4 rounded-lg shadow-xl text-slate-700 flex gap-2 justify-center items-center bg-yellow-400" onClick={() => {
                    setOpenEditModal(true)
                    setGiftToEdit(null)
                }}>
                    <GiftIcon className="h-8 w-8 text-slate-600" />
                    <h4 className="font-semibold">Agregar regalo</h4>
                </button>
            </div>
            <Modal open={openEditModal} setOpen={setOpenEditModal}>
                {
                    giftToEdit ? (
                        <GiftForm gift={giftToEdit} isEditing />
                    ) : (
                        <GiftForm isEditing={false} />
                    )
                }
            </Modal>
        </div>
    )
}