import { redirect } from 'next/navigation'
import LogoutButton from './logout-button'
import { createClient } from '@/app/utils/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, created_at')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Full Name:</span> {profile?.full_name}</p>
          <p><span className="font-semibold">Email:</span> {profile?.email}</p>
          <p>
            <span className="font-semibold">Joined:</span>{' '}
            {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : ''}
          </p>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}