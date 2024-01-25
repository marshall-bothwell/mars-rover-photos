import { createSupabaseServerClient } from "@/supabase/create-supabase-server-client";

export default async function TestingPage() {
    //const { data: testData, error } = await db.from("test").select();
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from("saved_photos").select();
    console.log(data);

    return (
        <div></div>
        /*
        <div>
            <pre>{JSON.stringify(testData, null, 2)}</pre>
            <div>Errors: {JSON.stringify(error)}</div>
        </div>
        */
    )
}