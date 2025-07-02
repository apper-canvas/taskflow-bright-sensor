import React, { useState } from 'react'
import Header from '@/components/organisms/Header'
import Sidebar from '@/components/organisms/Sidebar'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }
  
  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        categories={[]}
        onAddCategory={() => {}}
        taskCounts={{}}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onSearch={() => {}}
          onAddTask={() => {}}
          onToggleSidebar={handleToggleSidebar}
        />
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout