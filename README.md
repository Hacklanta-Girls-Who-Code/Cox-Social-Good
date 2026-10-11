# LifeLocker - Cox-Social-Good

A secure digital document vault designed for unhoused individuals. Your important documents, anywhere!

LifeLocker is built by Alaina Bastien, Benevolence Ed-Malik, and J'adore Jn-Charles. The concept is inspired by **Cox's track** at the Hacklanta Hackathon, **Social Good**. We also aim to contend for the two side challenges:
- MLH: Best Use of Auth0
- MLH: Best Use of Gemini API

# Project Overview
**Problem:**
People experiencing homelessness often lose access to physical documents required for housing, employment, healthcare, and social services.

**Solution:**
LifeLocker allows users to upload, store, and access important documents in one secure place that isn't so easy to lose. Additionally, the service integrates the Gemini API and utilizes the gemini-3.8-flash model to process the text on the images and take off important data that could be used by social workers to more easily process clients.

Tech Stack:
- React
- Vite
- Tailwind CSS
- Tesseract.js
- Supabase
- Auth0
- Gemini API's gemini-3.8-flash multimodal-capable model 

## Mission Statement
...

---
# Local Setup Guide
## Prerequisites
Ensure you have the following installed on your device:
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn package manager. _(We used npm during development)_
## Installation and Necessary Configurations
1. Once you have cloned this repository, install the required packages and tools with your preferred package manager, i.e.:
    - npm install
    - pnpm install
    - yarn install
2. Create a new file called .env in the project's root directory. Then, copy paste the following:

!! TENTATIVE SECTION !!---------------------------------------------------
### Google Gemini API
VITE_GEMINI_API_KEY=your_gemini_api_key_here

### Auth0 Authentication
VITE_AUTH0_DOMAIN=your_auth0_domain_here
VITE_AUTH0_CLIENT_ID=your_auth0_client_id_here

### Supabase Database & Storage
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anonymous_key_here
!! TENTATIVE SECTION !! ------------------------------------------------
3. Start up the local development server:
    - npm run dev
4. Open your browser and navigate to the port shown in your terminal, which should look something like this:
    - http://localhost:<your-port>
You should now be able to register and/or log in via Auth0, upload images of your documents for Gemini 3.8 Flash to extract, and witness the data flow to Superbase.

---
# References/Resources Used
1.


