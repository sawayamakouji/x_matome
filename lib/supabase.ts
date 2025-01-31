import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://jzyjlhilmsxepsebplcm.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6eWpsaGlsbXN4ZXBzZWJwbGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTc3MDAsImV4cCI6MjA1MzgzMzcwMH0.7oOpOHPvMIl5Gvyb1mNVU53-rDlq4EgUvSWEi4fd4JQ"

export const supabase = createClient(supabaseUrl, supabaseKey)

