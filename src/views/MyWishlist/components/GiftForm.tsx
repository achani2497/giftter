import { useForm } from "react-hook-form";
import { IGift } from "utils/types";
import { Validations } from "../../../utils/Validations";

export function GiftForm({ gift, isEditing, isEmbeded = true }: { gift?: IGift | null, isEditing: boolean, isEmbeded?: boolean }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IGift>({
        defaultValues: {
            id: gift?.id || -1,
            title: gift?.title || '',
            url: gift?.url || ''
        }
    })

    function onSubmit(values: any) {
        console.log(values)
        console.log(gift, isEditing)
        reset()
        // const notif = toast.loading('Realizando donación...', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        // })

        // shelterService.createComment(values.name, values.comment, shelterId)
        //     .then(() => {
        //         toast.update(notif, { render: 'Muchas Gracias por dejarnos tu comentario ❤️', type: "success", isLoading: false })
        //         const lastComment = comments[comments.length - 1]
        //         setComments([...comments, { id: lastComment!.id + 1, person_name: values.name, comment: values.comment }])
        //         reset()
        //     })
        //     .catch(e => {
        //         console.log(e)
        //         toast.update(notif, { render: 'No pudimos registrar tu comentario, por favor intenta mas tarde', type: "error", isLoading: false })
        //     })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`bg-white rounded-md flex flex-col text-lg gap-8 w-full ${!isEmbeded ? 'shadow-xl' : ''}`}
            noValidate
        >
            <h2 className='font-bold text-xl'>{isEditing ? 'Edita tu regalo ✏️' : 'Agrega tu regalo 🎁'}</h2>

            {/* Form Content */}
            <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="title">Nombre del regalo</label>
                <input type="text" id="title" {...register('title', Validations.gift.title)} className={`border-2 border-solid rounded-lg px-2 py-1  ${errors?.title?.message?.toString() ? 'border-red-500' : ''}`} />
                {errors?.title?.message?.toString() && (
                    <span className="text-red-500 -mt-2"> {errors?.title?.message?.toString()} </span>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="url">URL del regalo</label>
                <input type="url" id="url" {...register('url', Validations.gift.url)} className={`border-2 border-solid rounded-lg px-2 py-1  ${errors?.url?.message?.toString() ? 'border-red-500' : ''}`} />
                {errors?.url?.message?.toString() && (
                    <span className="text-red-500 -mt-2"> {errors?.url?.message?.toString()} </span>
                )}
            </div>
            {/* FormButtons */}
            <button className="rounded-lg shadow-xl bg-yellow-200 p-1" type="submit">Enviar</button>
        </form>
    )

}