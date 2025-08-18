import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = 'https://qafzzzchtpdonlslvgka.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhZnp6emNodHBkb25sc2x2Z2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzOTc0MTksImV4cCI6MjA3MDk3MzQxOX0.lg86KXeCauY-rxkzk-bj1mREri9IBdRUubJXv1ZP614'

export const supabase = createClient(PROJECT_URL, API_KEY )




