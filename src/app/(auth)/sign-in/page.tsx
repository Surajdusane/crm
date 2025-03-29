import SignInCard from '@/fetures/auth/components/sign-in-card'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getSession()
  if (session) redirect('/dashboard')
  return (
    <div>
      <SignInCard/>
    </div>
  )
}

export default page