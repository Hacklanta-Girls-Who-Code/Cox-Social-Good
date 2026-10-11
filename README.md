# LifeLocker - Cox-Social-Good

A secure digital document vault designed for unhoused individuals. Your important documents, anywhere!

LifeLocker is built by Girls Who Code, which is comprised of Alaina Bastien, Benevolence Ed-Malik, and J'adore Jn-Charles. The concept is inspired by **Cox's track** at the Hacklanta Hackathon, **Social Good**. We also aim to contend for the two side challenges:
- MLH: Best Use of Auth0
- MLH: Best Use of Gemini API

# Project Overview
Girls Who Code is a team of three that developed a web-based application called LifeLocker in alignment with the Social Good track at the Hacklanta 26 hackathon.

We developed a React.js w/ Vite project that can take PDF forms of documents or photos of important documents that a user uploaded, store these photos in a Supabase database, allow the user to access them online, and have the Gemini model we implemented using the Gemini API pull text from the files and print it onto a formatted JSON file.

This project was made, primarily, with victims of homelessness in mind. In the US, about "40% of people" who are "experiencing homelessness live in unsheltered locations" (cdc.gov). Given this, it is very likely that an unhoused person will have nowhere safe to store important documents like an ID, their passport, or other necessities. This could possibly result in stolen or otherwise lost documents, leaving an unhoused person stranded with no way to prove their identity. 

We find LifeLocker to be solution to this problem. With our service, users can access digital copies of their most important documents at any time, ensuring that they stay visible to all of the right organizations. 
**Problem:**
People experiencing homelessness often lose access to physical documents required for housing, employment, healthcare, and social services.

**Solution:**
LifeLocker allows users to upload, store, and access important documents in one secure place that isn't so easy to lose. Additionally, the service integrates the Gemini API and utilizes the gemini-3.8-flash model to process the text on the images and take off important data that could be used by social workers to more easily process clients.

## Tech Stack:
- React
- Vite
- Tailwind CSS
- Tesseract.js
- Supabase
- Auth0
- Gemini API's gemini-3.8-flash multimodal-capable model 

## Mission Statement
To empower individuals with a digital sanctuary, ensuring their most critical documents are securely stored, instantly accessible, and preserved to **protect them against real-world loss**.

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
_This ReadMe was written with the help of Gemini._
## Problem Research -
- https://www.cdc.gov/homelessness-and-health/about/index.html
- https://endhomelessness.org/people-with-unaddressed-health-conditions/
- https://regenbrampton.com/unknown-challenges-the-homeless-face/
- Google Gemini

### Similar Product References
- My Digital Data Locker (MDDL): https://d1y8sb8igg2f8e.cloudfront.net/documents/CAPSULE_My_Digital_Data_Locker.pdf
- National Homeless Registry: https://www.nationalhomelessregistry.org/
- Homeless ID Project: https://www.homelessidproject.org/

## Programming Aids -
- Google Gemini
- https://medium.com/@EverusLainus/building-an-ai-chatbot-57035fcf1cb4
- https://dev.to/tahrim_bilal/how-to-integrate-gemini-api-with-reactjs-a-step-by-step-guide-341b
- https://www.youtube.com/watch?v=qe3mrBmeno8
- https://www.youtube.com/watch?v=6KbXE-HgXqI


