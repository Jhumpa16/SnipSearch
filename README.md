🎬 SnipSearch Frontend
This is the frontend for SnipSearch, a web application that helps editors, creators, and meme-lovers discover iconic movie, anime, and video clips through smart semantic search.

Built with Next.js and styled with TailwindCSS, the app connects to a Supabase backend and uses local AI embeddings for fast, offline semantic search.

🚀 Getting Started
Install dependencies

bash
Copy
Edit
npm install
# or
yarn install
Start development server

bash
Copy
Edit
npm run dev
# or
yarn dev
Open http://localhost:3000 to view it in your browser.

⚙️ Project Structure
php
Copy
Edit
frontend/
├── app/               # Next.js App Directory
├── components/        # UI components (ClipCard, NavBar, etc.)
├── lib/               # Helper utilities (e.g., Supabase client)
├── public/            # Static assets
├── styles/            # Global styles and Tailwind config
└── .env.local         # Local environment variables (not committed)
🧠 Tech Stack
Framework: Next.js (App Router)

Styling: TailwindCSS

Backend: Supabase (Postgres + Auth)

AI Embeddings: Local FastAPI server using sentence-transformers

Hosting: Vercel (optional)

📦 Environment Variables
Create a .env.local file based on .env.example:

ini
Copy
Edit
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_EMBEDDING_API=http://localhost:8000/embedding
Do not commit .env* files.

📄 License
This project is under the MIT License./nextjs.org/docs/app/building-your-application/deploying) for more details.
