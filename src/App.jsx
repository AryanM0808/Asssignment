import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { supabase } from './config/supabase'
import Auth from './components/Auth'
import ContentInput from './components/ContentInput'
import OutputDisplay from './components/OutputDisplay'

export default function App() {
  const [session, setSession] = useState(null)
  const [outputs, setOutputs] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initializeAuth() {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting session:', error.message)
          return
        }
        console.log('Session data:', data)
        setSession(data.session)
      } catch (err) {
        console.error('Unexpected error:', err)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session)
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleContentSubmit = (processedOutputs) => {
    setOutputs(processedOutputs)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {!session ? (
          <Auth />
        ) : (
          <div className="space-y-8">
            <div className="flex justify-end">
              <button
                onClick={() => supabase.auth.signOut()}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
            <ContentInput onSubmit={handleContentSubmit} />
            <OutputDisplay outputs={outputs} />
          </div>
        )}
      </div>
    </div>
  )
}
