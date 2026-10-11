/**
 * lib/supabaseClient.js
 * Helper to initialize the Supabase client.
 */

import { createClient } from '@supabase/supabase-js' // client-creation function

// Reads environment variables stored
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Creates configured Supabase client
export const createSupabaseClient = (getAccessTokenSilently) =>
  createClient(supabaseUrl, supabasePublishableKey, {
    accessToken: async () => {
      return await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://lifelocker-api",
        },
      })
    },
  })