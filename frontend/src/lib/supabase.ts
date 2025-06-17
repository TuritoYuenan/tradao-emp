import { createClient } from '@supabase/supabase-js'
import { type Database } from "./models";

const backendURL = import.meta.env.VITE_SUPABASE_URL
const backendKey = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient<Database>(backendURL, backendKey);

export default supabase;
