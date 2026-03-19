
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wdgrpvvsewpxrxgxuwep.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZ3JwdnZzZXdweHJ4Z3h1d2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTA4OTQsImV4cCI6MjA4OTQyNjg5NH0.gdbO17C5UvkZVzxyJK2sY8_DPU8GxLfVov5EvgUdCrw'
export const supabase = createClient(supabaseUrl, supabaseKey)