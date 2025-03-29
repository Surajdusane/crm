import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

const Form = async () => {
    const session = await getSession()
    if (!session) redirect('/sign-in')
  return (
    <div className='h-fit'>
        Form
    </div>
  )
}

export default Form