import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIsFetching } from "../../Redux/Slice/user"
import { signOut } from "../../utils/Auth"

export function Home() {

    const user = useSelector((state: any) => state.user.data)
    const status = useSelector((state: any) => state.user.status)
    const dispatch = useDispatch()

    useEffect(() => {
        // login({ email: 'alejandro.chani24@gmail.com', password: 'asd123' })
        // supabase.auth.getSession().then(data => console.log(data))
        signOut().then()
    }, [])

    function handleClick() {
        dispatch(setIsFetching())
        console.log(status)
    }

    return (
        <>
            <h1 >Soy el home</h1>
            <button onClick={() => handleClick()}> asd </button>
        </>
    )
}