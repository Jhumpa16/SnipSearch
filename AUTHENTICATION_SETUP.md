# Supabase Authentication Setup

This project uses Supabase for authentication. Follow these steps to set up authentication:

## 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
# Get these values from your Supabase project dashboard
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: For server-side operations (if needed)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 2. Getting Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select an existing one
3. Go to Settings > API
4. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (optional)

## 3. Authentication Providers (Optional)

To enable social login providers (Google, GitHub), configure them in your Supabase dashboard:

1. Go to Authentication > Providers
2. Enable and configure the providers you want to use
3. The auth page will automatically show the configured providers

## 4. Access the Authentication Page

Once configured, you can access the authentication page at:
```
http://localhost:3000/auth
```

## 5. Features

- ✅ Login/Signup form using Supabase Auth UI
- ✅ Social login providers (Google, GitHub)
- ✅ User session management
- ✅ Logout functionality
- ✅ Responsive design with TailwindCSS
- ✅ Loading states
- ✅ Clean, production-ready code

## 6. Security Notes

- Never commit your `.env.local` file to version control
- The `NEXT_PUBLIC_` prefix makes variables available in the browser
- Use environment variables for all sensitive configuration 