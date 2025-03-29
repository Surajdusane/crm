import SignUpCard from '@/fetures/auth/components/sign-up-card'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getSession()
  if (session) redirect('/dashboard')
  return (
    <div>
      <SignUpCard />
    </div>
  )
}

export default page