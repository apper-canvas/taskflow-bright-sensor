import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const Sidebar = ({ 
  categories = [], 
  isOpen, 
  onClose, 
  onAddCategory, 
  taskCounts = {} 
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleCategorySelect = (categoryId) => {
    if (categoryId) {
      navigate(`/category/${categoryId}`)
    } else {
      navigate('/')
    }
    onClose()
  }
  
  const getCurrentPath = () => {
    if (location.pathname === '/') return 'all'
    if (location.pathname.startsWith('/category/')) {
      return parseInt(location.pathname.split('/')[2])
    }
    return 'all'
  }
  
  const currentPath = getCurrentPath()
  
  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 font-display">
            Categories
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="lg:hidden p-2"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <motion.button
          onClick={() => handleCategorySelect(null)}
          className={`
            w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200
            ${currentPath === 'all'
              ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border border-primary-200'
              : 'text-gray-700 hover:bg-gray-50 border border-transparent'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3">
            <ApperIcon name="List" className="w-5 h-5" />
            <span className="font-medium">All Tasks</span>
          </div>
          {taskCounts.all > 0 && (
            <Badge variant={currentPath === 'all' ? 'primary' : 'default'}>
              {taskCounts.all}
            </Badge>
          )}
        </motion.button>
        
        {categories.map((category) => (
          <motion.button
            key={category.Id}
            onClick={() => handleCategorySelect(category.Id)}
            className={`
              w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 border
              ${currentPath === category.Id
                ? 'text-gray-900 border border-gray-300 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 border-transparent'
              }
            `}
            style={{
              backgroundColor: currentPath === category.Id ? `${category.color}10` : undefined,
              borderColor: currentPath === category.Id ? `${category.color}40` : undefined,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium">{category.name}</span>
            </div>
            {category.taskCount > 0 && (
              <Badge color={category.color}>
                {category.taskCount}
              </Badge>
            )}
          </motion.button>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <Button
          onClick={onAddCategory}
          variant="outline"
          icon="Plus"
          className="w-full justify-center"
        >
          Add Category
        </Button>
      </div>
    </div>
  )
  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 h-full">
        <SidebarContent />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-80 z-50"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar