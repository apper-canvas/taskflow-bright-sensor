import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const FilterTabs = ({ activeFilter, onFilterChange, taskCounts = {} }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', icon: 'List', count: taskCounts.all || 0 },
    { key: 'active', label: 'Active', icon: 'Clock', count: taskCounts.active || 0 },
    { key: 'completed', label: 'Completed', icon: 'CheckCircle', count: taskCounts.completed || 0 },
  ]
  
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {filters.map((filter) => (
        <motion.button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`
            relative flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${activeFilter === filter.key
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name={filter.icon} className="w-4 h-4" />
          <span>{filter.label}</span>
          {filter.count > 0 && (
            <span className={`
              ml-1 px-2 py-0.5 text-xs rounded-full
              ${activeFilter === filter.key
                ? 'bg-primary-100 text-primary-600'
                : 'bg-gray-200 text-gray-600'
              }
            `}>
              {filter.count}
            </span>
          )}
          
          {activeFilter === filter.key && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-white rounded-md shadow-sm -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}

export default FilterTabs