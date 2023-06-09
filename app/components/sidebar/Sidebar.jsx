import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'
import getCurrentUser from '@/app/actions/getCurrentUser';
import ActiveStatus from '../ActiveStatus';

const Sidebar = async ({ children }) => {
  
  const currentUser = await getCurrentUser();

  return (
    <div className='h-full'>
        <ActiveStatus/>
        <DesktopSidebar currentUser={currentUser}/>
        <MobileFooter/>
        <main className='lg:pl-20 h-full'>
            {children}
        </main>
    </div>
  )
}

export default Sidebar