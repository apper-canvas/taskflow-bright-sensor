import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No tasks yet", 
  message = "Create your first task to get started and stay organized!",
  actionText = "Add Your First Task",
  onAction,
  icon = "CheckSquare"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-12 text-center border border-primary-100"
    >
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <ApperIcon name={icon} className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 text-lg">
          {message}
        </p>
        
        {onAction && (
          <Button
            onClick={onAction}
            icon="Plus"
            size="lg"
            className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {actionText}
          </Button>
        )}
        
        <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Zap" className="w-4 h-4 text-primary-500" />
            <span>Quick Add</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Filter" className="w-4 h-4 text-primary-500" />
            <span>Smart Filters</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Star" className="w-4 h-4 text-primary-500" />
            <span>Priority System</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Empty