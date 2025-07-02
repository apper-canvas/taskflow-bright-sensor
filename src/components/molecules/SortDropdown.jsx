import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SortDropdown = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  
  const sortOptions = [
    { value: 'dueDate', label: 'Due Date', icon: 'Calendar' },
    { value: 'priority', label: 'Priority', icon: 'AlertTriangle' },
    { value: 'created', label: 'Created Date', icon: 'Clock' },
    { value: 'title', label: 'Title', icon: 'Type' },
  ]
  
  const activeSortOption = sortOptions.find(option => option.value === sortBy) || sortOptions[0]
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const handleSortSelect = (value) => {
    onSortChange(value)
    setIsOpen(false)
  }
  
  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ApperIcon name={activeSortOption.icon} className="w-4 h-4" />
        <span>Sort by {activeSortOption.label}</span>
        <ApperIcon 
          name="ChevronDown" 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
          >
            {sortOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-150
                  ${sortBy === option.value
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
                whileHover={{ backgroundColor: sortBy === option.value ? undefined : '#F9FAFB' }}
              >
                <ApperIcon name={option.icon} className="w-4 h-4" />
                <span>Sort by {option.label}</span>
                {sortBy === option.value && (
                  <ApperIcon name="Check" className="w-4 h-4 ml-auto text-primary-600" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SortDropdown