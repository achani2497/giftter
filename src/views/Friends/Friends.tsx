import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FriendLyrics, FriendsService } from "../../services/Friends";
import { ContactSearchComponent } from "./components/ContactSearchComponent";
import { FriendsList } from "./components/FriendsList";

export type Friend = {
    id: string,
    first_name: string,
    last_name: string,
    username: string
}

export function Friends() {
    const userData = useSelector((store: any) => store.user.data);
    const [friends, setFriends] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    async function fetch() {
        const { data, error } = await FriendsService.fetchFriends(userData.id)
        if (error) {
            throw new Error(error.message)
        }
        return data
    }

    function fetchAndSetFriends() {
        fetch()
            .then((data: any) => {
                setFriends(data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        FriendLyrics()
        setIsLoading(true)
        fetchAndSetFriends()
    }, [])

    return (
        <div className="flex flex-col gap-8 h-full">
            <ContactSearchComponent userId={userData.id} onAddFriend={fetchAndSetFriends} />
            <div className="flex flex-col gap-2">
                <FriendsList friends={friends} isLoading={isLoading} />
            </div>
        </div>
    )
}