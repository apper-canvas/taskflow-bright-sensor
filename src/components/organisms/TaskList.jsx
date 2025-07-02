import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/organisms/TaskCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const TaskList = ({ 
  tasks = [], 
  loading = false, 
  error = null, 
  onTaskComplete, 
  onTaskEdit, 
  onTaskDelete,
  onRetry 
}) => {
  if (loading) {
    return <Loading />
  }
  
  if (error) {
    return <Error message={error} onRetry={onRetry} />
  }
  
  if (tasks.length === 0) {
    return <Empty />
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              onComplete={onTaskComplete}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskList