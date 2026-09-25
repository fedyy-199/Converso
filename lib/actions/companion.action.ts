"use server"
import { auth } from "@clerk/nextjs/server";
import { CreateCompanion } from "@/types/index";
import { createSupabaseClient } from "@/types/supabase";
import { GetAllCompanions } from "@/types/index";
export const createCompanion = async (companionData: CreateCompanion) => {
    const { userId: author } = await auth();
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.from("Companion").insert({
        ...companionData,
        author

    }).select();
    if (error) {
        throw new Error(error.message);

    }
    return data[0];

}
export const fetchCompanions = async (limit = 3) => {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.from('Companion').select().limit(limit);
    if (error) {
        throw new Error(error.message);

    }
    return data;
}
const GetallCompanions = async ({
    limit = 10,
    page = 1,
    subject,
    topic
}: GetAllCompanions) => {
    const supabase = await createSupabaseClient();
    let query = supabase.from("Companion").select();
    if (subject && topic) {
        query = (await query.ilike('subject', `${subject}%`).ilike('topic', `%${topic}%`))

    }
    else if (subject) {
        query = query.ilike('subject', `%${subject}%`)
    }
    else if (topic) {
        query = query.ilike('topic', `%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);
    const { data, error } = await query;
    if (error) {
        throw new Error(error.message);
    }
    return data;

}
export const getCompanionByuser = async () => {
    const { userId } = await auth();
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.from('Companion').select().eq('author', userId).order('created_at', { ascending: false });
    if (error) {
        throw new Error(error.message);

    }
    return data

}

const getCompanion = async (id: string) => {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.from("Companion").select().eq('id', id);
    if (error) {
        throw new Error(error.message);
    }
    return data[0];

}
const saveSearchHistory = async (companion_id: string) => {
    const { userId } = await auth();
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase.from("session_history").insert({
        user_id: userId
        , companion_id
    }
    )
    if (error) {
        throw new Error(error.message);
    }
}
export const fetchSessions = async () => {
    const { userId } = await auth();
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.from('session_history').select('Companions:companion_id (*)').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) {
        throw new Error(error.message);

    }
    return data
}
export const userPlan = async () => {
    const { userId, has } = await auth();
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.from('Companion').select().eq('author', userId).order('created_at', { ascending: false });
    let limit = 0
    if (error) {
        throw new Error(error.message);

    }
    if (has({ plan: 'pro_max' })) {
        return true
    }
    else if (has({ feature: "10_comapnions" })) {
        limit = 10;

    }
    else {
        limit = 3;
    }
    if (data.length < limit) {
        return true;
    }
    return false;
}
export { GetallCompanions as GetallCompanions };
export { getCompanion as getCompanion };
export { saveSearchHistory }