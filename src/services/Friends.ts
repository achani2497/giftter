import { supabase } from "../utils/Supabase";

export function FriendLyrics() {
    console.log(`
        So no one told you life was gonna be this way
        Your job's a joke, you're broke
        Your love life's DOA
        It's like you're always stuck in second gear
        When it hasn't been your day, your week, your month
        Or even your year, but
        I'll be there for you
        (When the rain starts to pour)
        I'll be there for you
        (Like I've been there before)
        I'll be there for you
        ('Cause you're there for me too)
        You're still in bed at ten
        And work began at eight
        You've burned your breakfast
        So far, things are going great
        Your mother warned you there'd be days like these
        But she didn't tell you when the world has brought
        You down to your knees that
        I'll be there for you
        (When the rain starts to pour)
        I'll be there for you
        (Like I've been there before)
        I'll be there for you
        ('Cause you're there for me too)
        No one could ever know me
        No one could ever see me
        Seems you're the only one who knows
        What it's like to be me
        Someone to face the day with
        Make it through all the rest with
        Someone I'll always laugh with
        Even at my worst, I'm best with you, yeah
        It's like you're always stuck in second gear
        When it hasn't been your day, your week, your month
        Or even your year
        I'll be there for you
        (When the rain starts to pour)
        I'll be there for you
        (Like I've been there before)
        I'll be there for you
        ('Cause you're there for me too)
        I'll be there for you
        I'll be there for you
        I'll be there for you
        ('Cause you're there for me too)`)
}

export class FriendsService {
    static fetchFriends(id: string) {
        return supabase
            .from('friends')
            .select('id, from:user_request(first_name), to:user_requested(first_name, last_name, birth_date, username)')
            .eq('user_request', id)
    }

    static searchFriends(keyword: string, user_searching_id: string) {
        return supabase.from('users')
            .select('id, first_name, last_name, username')
            .or(`first_name.ilike.%${keyword}%, last_name.ilike.%${keyword}%, username.ilike.%${keyword}%`)
            .neq('id', user_searching_id)
    }

    static async usersAreFriends(idRequest: string, idRequested: string) {
        const { data, error } = await supabase.from('friends')
            .select()
            .eq('user_request', idRequest)
            .eq('user_requested', idRequested)

        if (error) {
            console.log(error)
        }

        return data && data.length > 0

    }

    static addFriend(idRequest: string, idRequested: string) {
        return supabase.from('friends').insert([{
            user_request: idRequest,
            user_requested: idRequested,
            status: 'accepted'
        }, {
            user_request: idRequested,
            user_requested: idRequest,
            status: 'accepted'
        }]).select()
    }
}