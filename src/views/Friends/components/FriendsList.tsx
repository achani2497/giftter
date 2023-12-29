import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { FriendSkeleton } from "../../../components/Feedback/FriendSkeleton"
import { Friend } from "../Friends"

export function FriendsList({ friends, isLoading }: { friends: Friend[], isLoading: boolean }) {
    return (
        <>
            <span className="text-lg text-slate-700 font-semibold">Estos son tus amigos {isLoading ? '(...)' : ` (${friends.length})`} </span>
            {
                isLoading ? (<div className="flex flex-col gap-4">
                    <FriendSkeleton />
                    <FriendSkeleton />
                    <FriendSkeleton />
                </div>
                ) :
                    (
                        friends.length ?
                            (
                                <ul className="flex flex-col gap-4 animate-fade animate-once animate-duration-[600ms] animate-ease-linear">
                                    {friends.map((friend: any, index: number) => {
                                        return (
                                            <li key={index} className="flex gap-4 items-center w-full bg-slate-200 rounded-lg shadow-lg p-4">
                                                <img
                                                    className="h-12 w-12 rounded-full shadow-lg shadow-slate-400"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                                <div className="flex flex-col">
                                                    <span>
                                                        {`${friend.to.first_name + ' ' + friend.to.last_name}`}
                                                    </span>
                                                    <span>
                                                        {`@${friend.to.username}`}
                                                    </span>
                                                    <Link to="/" className="flex gap-1 text-blue-600 underline items-center">
                                                        Visitar perfil
                                                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : <div className="p-4 bg-slate-200 shadow-xl rounded-lg text-center text-slate-700 font-semibold">
                                <p> Todavía no tenes amigos 😕 </p>
                                <p> ¡Buscalos y agregalos con el buscador de arriba!</p>
                            </div>
                    )
            }
        </>
    )
}