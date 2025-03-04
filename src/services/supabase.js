//npm install @supabase/supabase-js --> önce bunu terminalden yükledik. Daha sonra supabaseKeyi project settings --> API'den api keyi alıp supabaseKey'e atadık.

import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://aoyjsdiimqmcvhsoexho.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFveWpzZGlpbXFtY3Zoc29leGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzMzgzODYsImV4cCI6MjA1MTkxNDM4Nn0.N75QjvxqZFN18eggyJVR__Te8bHL7HBnS02mhyC95ZQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
