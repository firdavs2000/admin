
import StatsGrid from './StatsGrid'
import ChartSection from './ChartSection'
import TableSection from './TableSection'
import ActivityFedd from './ActivityFedd'

function Dashboard() {
  return (
    <div className='space-y-6'>
      <StatsGrid/>
      {/* Chart Section */}
      <ChartSection />
      
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
       <div className='xl:col-span-2'>
      <TableSection />
       </div>
       <div>
        <ActivityFedd />
       </div>
      </div>
    </div>
  )
}

export default Dashboard
