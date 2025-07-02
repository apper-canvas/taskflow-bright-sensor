import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = ({ 
  checked = false, 
  onChange, 
  label, 
  disabled = false,
  size = 'md',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }
  
  const checkboxClasses = `
    ${sizes[size]} rounded border-2 transition-all duration-200 cursor-pointer
    ${checked 
      ? 'bg-gradient-to-r from-success to-green-500 border-success' 
      : 'bg-white border-gray-300 hover:border-primary-500'
    }
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `
  
  return (
    <div className="flex items-center space-x-2">
      <motion.div
        className={`relative ${checkboxClasses}`}
        onClick={() => !disabled && onChange && onChange(!checked)}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <ApperIcon 
              name="Check" 
              className={`text-white ${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} 
            />
          </motion.div>
        )}
      </motion.div>
      {label && (
        <label 
          className={`text-sm text-gray-700 cursor-pointer ${disabled ? 'opacity-50' : ''}`}
          onClick={() => !disabled && onChange && onChange(!checked)}
        >
          {label}
        </label>
      )}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
    </div>
  )
}

export default Checkbox