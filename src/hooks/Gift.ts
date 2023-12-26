import { useEffect, useState } from "react";
import { IGift } from "utils/types";
import { GiftService } from "../services/Gift";

export function useFetchGifts(user_id: string): { gifts: IGift[], isLoading: boolean } {
    const [gifts, setGifts] = useState<IGift[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetch() {
            const { data, error } = await GiftService.fetchGifts(user_id)
            if (error) {
                throw new Error(error.message)
            }
            return data

        }

        fetch()
            .then((data: IGift[]) => {
                setGifts(data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })

    }, [])

    return { gifts, isLoading }
}