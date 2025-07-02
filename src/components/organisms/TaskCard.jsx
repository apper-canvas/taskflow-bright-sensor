import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { format, isToday, isTomorrow, isPast, isThisWeek } from 'date-fns'
import Checkbox from '@/components/atoms/Checkbox'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const TaskCard = ({ task, onComplete, onEdit, onDelete, category }) => {
  const [isCompleting, setIsCompleting] = useState(false)
  
  const handleComplete = async () => {
    setIsCompleting(true)
    try {
      await onComplete(task.Id)
    } finally {
      setIsCompleting(false)
    }
  }
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return '#4CAF50'
      case 'medium': return '#FF9800'
      case 'high': return '#F44336'
      case 'urgent': return '#F44336'
      default: return '#4CAF50'
    }
  }
  
  const getPriorityBorderClass = (priority) => {
    switch (priority) {
      case 'low': return 'priority-border-low'
      case 'medium': return 'priority-border-medium'
      case 'high': return 'priority-border-high'
      case 'urgent': return 'priority-border-urgent'
      default: return 'priority-border-low'
    }
  }
  
  const formatDueDate = (dateString) => {
    if (!dateString) return null
    
    const date = new Date(dateString)
    
    if (isToday(date)) {
      return { text: 'Today', color: 'error', urgent: true }
    }
    if (isTomorrow(date)) {
      return { text: 'Tomorrow', color: 'warning', urgent: false }
    }
    if (isPast(date)) {
      return { text: 'Overdue', color: 'error', urgent: true }
    }
    if (isThisWeek(date)) {
      return { text: format(date, 'EEEE'), color: 'info', urgent: false }
    }
    
    return { text: format(date, 'MMM d'), color: 'default', urgent: false }
  }
  
  const dueDateInfo = task.dueDate ? formatDueDate(task.dueDate) : null
  
  return (
    <motion.div
      className={`
        task-card-hover bg-white rounded-lg p-4 shadow-sm border border-gray-200
        ${getPriorityBorderClass(task.priority)}
        ${task.completed ? 'opacity-60' : ''}
      `}
      whileHover={{ scale: 1.01 }}
      animate={isCompleting ? { scale: 0.98, opacity: 0.8 } : {}}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleComplete}
            disabled={isCompleting}
            size="md"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`
                text-lg font-semibold font-display mb-1
                ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}
              `}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`
                  text-sm mb-3
                  ${task.completed ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                {dueDateInfo && (
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Calendar" className="w-4 h-4 text-gray-400" />
                    <Badge 
                      variant={dueDateInfo.color}
                      className={dueDateInfo.urgent ? 'animate-pulse' : ''}
                    >
                      {dueDateInfo.text}
                    </Badge>
                  </div>
                )}
                
                <Badge 
                  color={getPriorityColor(task.priority)}
                  className="capitalize"
                >
                  {task.priority}
                </Badge>
                
                {category && (
                  <Badge color={category.color}>
                    {category.name}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-1 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                disabled={isCompleting}
                className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ApperIcon name="Edit2" className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.Id)}
                disabled={isCompleting}
                className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-error hover:bg-red-50"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {task.completed && task.completedAt && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 flex items-center">
            <ApperIcon name="CheckCircle" className="w-3 h-3 mr-1" />
            Completed {format(new Date(task.completedAt), 'MMM d, yyyy \'at\' h:mm a')}
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default TaskCard