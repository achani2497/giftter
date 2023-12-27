import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FriendsService } from "../../services/Friends";

export function Friends() {
    const userData = useSelector((store: any) => store.user.data);
    const [friends, setFriends] = useState([])

    useEffect(() => {
        // FriendLyrics()
        async function fetch() {
            const { data, error } = await FriendsService.fetchFriends(userData.id)
            if (error) {
                throw new Error(error.message)
            }
            return data

        }

        fetch()
            .then((data: any) => {
                setFriends(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <h1>Amigos</h1>
            <ul>
                {
                    friends.map((friend: any, index: number) => {
                        return (
                            <li key={index} className="flex flex-col w-full bg-slate-200 rounded-lg shadow-lg p-4">
                                <span>
                                    {`${friend.to.first_name + ' ' + friend.to.last_name}`}
                                </span>
                                <span>
                                    {friend.to.email}
                                </span>
                                <span>
                                    {friend.to.birth_date}
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}