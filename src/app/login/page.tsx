'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setError('Anmeldung fehlgeschlagen. Überprüfen Sie E-Mail und Passwort.')
    } else {
      router.push('/dashboard')
      router.refresh() 
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center text-white">Login</h1>
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full px-4 py-2 font-bold text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                        Einloggen
                </button>
                {error && <p className="text-sm text-center text-red-400">{error}</p>}
            </form>
        </div>
    </div>
  )
} 