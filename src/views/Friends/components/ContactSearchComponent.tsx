import { ArrowTopRightOnSquareIcon, UserPlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { debounce } from "lodash"
import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Spinner } from "../../../components/Feedback/Spinner/Spinner"
import { Modal } from "../../../components/Modal/Modal"
import { FriendsService } from "../../../services/Friends"
import { Friend } from "../Friends"

export function ContactSearchComponent({ userId, onAddFriend }: { userId: string, onAddFriend: any }) {
    const [friendsKeyWord, setFriendsKeyWord] = useState('')
    const [searchResult, setSearchResult] = useState<Friend[] | []>([])
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [contact, setContact] = useState<Friend | null>(null)
    const [contactIsFriend, setContactIsFriend] = useState<boolean | null>(false)
    const [addFriendButtonAvailable, setAddFriendButtonAvailable] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        async function addAsFriendIsAvailable() {
            if (contact) {
                const alreadyFriends = await FriendsService.usersAreFriends(userId, contact.id)
                return alreadyFriends
            } else {
                return true
            }
        }

        addAsFriendIsAvailable().then((alreadyFriends) => {
            setAddFriendButtonAvailable(!alreadyFriends)
            setContactIsFriend(alreadyFriends)
            setIsLoading(false)
        }
        )

    }, [contact])

    function handleOpenContactModal(person: Friend) {
        setContact(person)
        setOpenModal(true)
    }

    function searchFriends(event: any) {
        setIsLoading(true)
        let val = event.target.value
        setFriendsKeyWord(val)
        debounceSearch.current(event.target.value)
    }

    const debounceSearch = useRef(
        useCallback(
            debounce(async (newVal) => {
                if (newVal) {
                    try {
                        let { data, error } = await FriendsService.searchFriends(newVal, userId)
                        if (error) {
                            throw new Error(error.message)
                        }
                        setSearchResult(data as Friend[])
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    setSearchResult([])
                }
                setIsLoading(false)
            }, 1000)
            , [])
    )

    async function addFriend(idRequested: string) {
        setIsLoading(true)
        const { data, error } = await FriendsService.addFriend(userId, idRequested)

        if (data) {
            onAddFriend()
            setOpenModal(false)
            resetSearchWord()
        } else {
            console.log(error)
        }

        setIsLoading(false)
    }

    function resetSearchWord() {
        setFriendsKeyWord('')
        debounceSearch.current('')
    }


    return (
        <div className="flex flex-wrap gap-2">
            <span className="text-lg text-slate-700 text-center font-semibold">Busca a tus amigos</span>
            <div className="relative w-full">
                <input type="text" className="shadow-inner px-2 py-1 rounded-lg w-full border border-solid border-slate-300" placeholder="Nombre, nombre de usuario o email" value={friendsKeyWord} onChange={searchFriends} />
                <XMarkIcon className="flex justify-around items-center absolute right-0 text-slate-700 top-[4px] mr-2 w-7 h-7" onClick={resetSearchWord} />
                {
                    <ul className="absolute top-10 flex flex-col bg-slate-200 rounded-lg w-full overflow-hidden shadow-xl">
                        {
                            isLoading ? (
                                <span className="px-4 py-3">
                                    <Spinner text="Cargando" style={{ gap: 'sm', sizes: 'sm', textSize: 'sm', dotSize: 'md' }} />
                                </span>
                            ) : (
                                searchResult.length > 0 && (
                                    <div className="overflow-hidden animate-fade animate-once animate-duration-[200ms] animate-ease-linear">
                                        {
                                            searchResult.map(person => {
                                                return (
                                                    <li key={person.username} onClick={() => handleOpenContactModal(person)} className="flex flex-col gap-1 px-4 py-3 w-full border-b border-solid backdrop-blur-md border-b-slate-300">
                                                        <span>{`${person.first_name} ${person.last_name} (@${person.username})`}</span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            )
                        }
                    </ul>
                }
            </div>
            {/* Modal para agregar amigo */}
            <Modal open={openModal} setOpen={setOpenModal} isLoading={isLoading}>
                <div className="flex flex-col gap-2 items-center">
                    <img
                        className="h-24 w-24 rounded-full shadow-lg shadow-slate-400"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    {contactIsFriend && <span className="text-md text-slate-500 text-center w-full">Ya son amigos</span>}
                    <div className="flex w-full justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-lg text-slate-700"> {`${contact?.first_name} ${contact?.last_name}`} </span>
                            <span className="text-md text-slate-500"> {`@${contact?.username}`} </span>
                        </div>
                        {
                            addFriendButtonAvailable ?
                                (<button className="px-4 py-2 h-fit text-slate-700 font-medium bg-yellow-400 rounded-lg shadow-xl flex items-center gap-1" onClick={() => addFriend(contact!.id)}>
                                    <UserPlusIcon className="w-5 h-5" />
                                    <span>Agregar</span>
                                </button>) :
                                <Link to={`/${contact?.username}`} className="flex gap-1 text-blue-600 underline items-center">
                                    Visitar perfil
                                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                </Link>
                        }
                    </div>

                </div>
            </Modal>
        </div>
    )
}