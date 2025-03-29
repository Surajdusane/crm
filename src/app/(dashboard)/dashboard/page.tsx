import { ModeToggle } from '@/components/global/theme-button'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getSession()
  if (!session) redirect('/sign-in')

  return (
    <div className='w-full h-full'>
        <ModeToggle />
    </div>
  )
}

export default page