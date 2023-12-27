import { useForm } from "react-hook-form";
import { Input } from "../../../components/Form/Input/Input";
import { supabase } from "../../../utils/Supabase";
import { Validations } from "../../../utils/Validations";
import { IGift } from "../../../utils/types";

export function GiftForm({ gift, isEditing, isEmbeded = true }: { gift?: IGift | null, isEditing: boolean, isEmbeded?: boolean }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IGift>({
        defaultValues: {
            id: gift?.id || -1,
            title: gift?.title || '',
            url: gift?.url || '',
            date: gift?.date || null
        }
    })

    async function onSubmit(values: any) {
        console.log(values)
        // console.log(gift, isEditing)
        const { data, error } = await supabase.from('gifts').insert(values).select('*')
        // reset()
        console.log(data)
        console.log(error)
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
            <Input label="Nombre del regalo" fieldName="title" register={register} errorObj={errors?.title} validations={Validations.gift.title} />
            <Input label="URL del regalo" fieldName="url" register={register} validations={Validations.gift.url} errorObj={errors?.url} type="url" />
            <Input label="Date" fieldName="date" register={register} validations={{}} errorObj={errors?.date} type="date" />
            {/* FormButtons */}
            <button className="rounded-lg shadow-xl bg-yellow-400 text-slate-700 p-1" type="submit">Enviar</button>
        </form>
    )

}