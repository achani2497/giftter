import { useDispatch, useSelector } from "react-redux"
import { setIsFetching } from "../../Redux/Slice/user"

export function Home() {

    const user = useSelector((state: any) => state.user.data)
    const status = useSelector((state: any) => state.user.status)
    const dispatch = useDispatch()

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