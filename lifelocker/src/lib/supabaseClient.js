/**
 * lib/supabaseClient.js
 * Helper to initialize the Supabase client.
 */

import { createClient } from '@supabase/supabase-js' // client-creation function

// Reads environment variables stored
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Creates configured Supabase client
export const supabase = createClient(supabaseUrl, supabasePublishableKey,
    {
        // specifies to Supabase to use this token for requests
        accessToken: async() => {
            const claims = await getIdTokenClaims();
            const idToken = claims?.__raw; // retrives ID token. '.?' returns undefined instead of throwing an error

            // Reports error if user is missing authenticated claim
            if (!idToken) {
                throw new Error("Missing Auth0 ID token")
            }
            return idToken;
        }
    }
)