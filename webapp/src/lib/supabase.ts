import { createClient } from '@supabase/supabase-js'

const backendURL = 'https://woenwfdxwwllmxwucivw.supabase.co'
const backendKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvZW53ZmR4d3dsbG14d3VjaXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNzUyOTEsImV4cCI6MjA2NDk1MTI5MX0.M0oR6EBvZdUOS7rtCf5QlzpO9k8CGZfvB5Zuj8vfGWQ'

export const supabase = createClient(backendURL, backendKey)
