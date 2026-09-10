'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/client'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded bg-red-600 p-2 font-semibold text-white hover:bg-red-700"
    >
      Log Out
    </button>
  )
}