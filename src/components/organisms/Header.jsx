import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import ApperIcon from '@/components/ApperIcon'

const Header = ({ onSearch, onAddTask, onToggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute
    
    return () => clearInterval(timer)
  }, [])
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric' 
    })
  }
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onToggleSidebar}
            className="lg:hidden p-2"
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-display bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <SearchBar 
            onSearch={onSearch}
            placeholder="Search tasks..."
            className="hidden sm:block w-80"
          />
          
          <Button
            onClick={onAddTask}
            icon="Plus"
            className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="sm:hidden mt-4">
        <SearchBar 
          onSearch={onSearch}
          placeholder="Search tasks..."
        />
      </div>
    </motion.header>
  )
}

export default Header