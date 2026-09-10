'use client'

import { useState } from 'react'
import { createClient } from '@/app/utils/supabase/client'

export default function SignupPage() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        const supabase = createClient()

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        })
        if (error) {
            setError(error.message)
        }
        setSuccess('true')
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow"
            >
                <h1 className="text-2xl font-bold text-gray-900">Sign Up</h1>

                {error && (
                    <p className="rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>
                )}

                {success && (
                    <p className="rounded bg-green-100 p-2 text-sm text-green-700">
                        Check your email to confirm your account.
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full rounded border border-gray-300 p-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded border border-gray-300 p-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded border border-gray-300 p-2"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full rounded border border-gray-300 p-2"
                />

                <button
                    type="submit"
                    className="w-full rounded bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )

}
