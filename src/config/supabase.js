import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xrodslmyikffmcsvmuer.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhyb2RzbG15aWtmZm1jc3ZtdWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxODM1NDgsImV4cCI6MjA2Mzc1OTU0OH0.ej0AQCGRWOxRdzCcax1faDb91r7kC6luroOPkwlip-E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
