import { supabase } from "../utils/Supabase";

export class GiftService {
    static fetchGifts(user_id: string) {
        return supabase.from('gifts').select('*').eq('user_id', user_id)
    }
}