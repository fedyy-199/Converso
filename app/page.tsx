import Companioncard from '@/components/Companioncard'
import Companionlist from '@/components/Companionlist'
import Cta from '@/components/Cta'
import { recentSessions } from '@/constants'
import { fetchCompanions, fetchSessions } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'


const Page = async () => {
  const recentsession = await fetchSessions();
  const companions = await fetchCompanions();
  console.log(companions)

  return (
    <main>

      <div className='text-2xl font-semibold underline'> Popular Companions</div>

      <section className='home-section'>
        {companions.map((companion) => (
          <Companioncard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
      <section className='home-section '>
        <div className='w-2/3 max-lg:w-full'>

          <Companionlist title="Recent sessions" Companions={recentsession} />
        </div>


        <Cta />

      </section>

    </main>
  )
}

export default Page