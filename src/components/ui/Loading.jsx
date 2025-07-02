import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" 
                     style={{ width: `${60 + Math.random() * 30}%` }} />
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" 
                     style={{ width: `${40 + Math.random() * 40}%` }} />
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Loading