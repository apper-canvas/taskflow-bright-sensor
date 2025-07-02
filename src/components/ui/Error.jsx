import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-12 text-center border border-red-100"
    >
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 font-display">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        <div className="flex items-center justify-center space-x-4">
          {onRetry && (
            <Button
              onClick={onRetry}
              icon="RefreshCw"
              className="shadow-lg hover:shadow-xl"
            >
              Try Again
            </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={() => window.location.reload()}
            icon="RotateCcw"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default Error