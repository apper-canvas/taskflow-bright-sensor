import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Header from '@/components/organisms/Header'
import Sidebar from '@/components/organisms/Sidebar'
import TaskList from '@/components/organisms/TaskList'
import TaskForm from '@/components/molecules/TaskForm'
import FilterTabs from '@/components/molecules/FilterTabs'
import SortDropdown from '@/components/molecules/SortDropdown'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'

const TaskDashboard = () => {
  const { categoryId } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Data state
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // UI state
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  
  // Load data
  useEffect(() => {
    loadData()
  }, [])
  
  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError('Failed to load data. Please try again.')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }
  
  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks]
    
    // Filter by category
    if (categoryId) {
      filtered = filtered.filter(task => task.categoryId === parseInt(categoryId))
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
      )
    }
    
    // Filter by status
    switch (activeFilter) {
      case 'active':
        filtered = filtered.filter(task => !task.completed)
        break
      case 'completed':
        filtered = filtered.filter(task => task.completed)
        break
      default:
        break
    }
    
    // Sort tasks
filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        case 'priority': {
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          return (priorityOrder[b.priority] || 1) - (priorityOrder[a.priority] || 1)
        }
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
    
    return filtered
  }, [tasks, categoryId, searchQuery, activeFilter, sortBy])
  
  // Calculate task counts
  const taskCounts = useMemo(() => {
    const all = categoryId 
      ? tasks.filter(task => task.categoryId === parseInt(categoryId)).length
      : tasks.length
    const active = categoryId
      ? tasks.filter(task => task.categoryId === parseInt(categoryId) && !task.completed).length
      : tasks.filter(task => !task.completed).length
    const completed = categoryId
      ? tasks.filter(task => task.categoryId === parseInt(categoryId) && task.completed).length
      : tasks.filter(task => task.completed).length
    
    return { all, active, completed }
  }, [tasks, categoryId])
  
  // Update categories with task counts
  const categoriesWithCounts = useMemo(() => {
    return categories.map(category => ({
      ...category,
      taskCount: tasks.filter(task => task.categoryId === category.Id && !task.completed).length
    }))
  }, [categories, tasks])
  
  // Task handlers
  const handleAddTask = () => {
    setEditingTask(null)
    setShowTaskForm(true)
  }
  
  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskForm(true)
  }
  
  const handleTaskSubmit = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await taskService.update(editingTask.Id, taskData)
        setTasks(prev => prev.map(task => 
          task.Id === editingTask.Id ? updatedTask : task
        ))
        toast.success('Task updated successfully!')
      } else {
        const newTask = await taskService.create({
          ...taskData,
          categoryId: categoryId ? parseInt(categoryId) : taskData.categoryId
        })
        setTasks(prev => [newTask, ...prev])
        toast.success('Task created successfully!')
      }
      setShowTaskForm(false)
      setEditingTask(null)
    } catch (err) {
      toast.error('Failed to save task. Please try again.')
      console.error('Error saving task:', err)
    }
  }
  
  const handleCompleteTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      })
      
      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ))
      
      toast.success(updatedTask.completed ? 'Task completed! 🎉' : 'Task marked as active')
    } catch (err) {
      toast.error('Failed to update task. Please try again.')
      console.error('Error updating task:', err)
    }
  }
  
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
      toast.success('Task deleted successfully')
    } catch (err) {
      toast.error('Failed to delete task. Please try again.')
      console.error('Error deleting task:', err)
    }
  }
  
  // Category handlers
  const handleAddCategory = async () => {
    if (!showCategoryForm) {
      setShowCategoryForm(true)
      return
    }
    
    if (!newCategoryName.trim()) {
      toast.error('Please enter a category name')
      return
    }
    
    try {
      const colors = ['#5B47E0', '#FF9800', '#4CAF50', '#F44336', '#2196F3', '#9C27B0', '#FF5722']
      const newCategory = await categoryService.create({
        name: newCategoryName.trim(),
        color: colors[Math.floor(Math.random() * colors.length)]
      })
      
      setCategories(prev => [...prev, newCategory])
      setNewCategoryName('')
      setShowCategoryForm(false)
      toast.success('Category created successfully!')
    } catch (err) {
      toast.error('Failed to create category. Please try again.')
      console.error('Error creating category:', err)
    }
  }
  
  const currentCategory = categoryId 
    ? categories.find(cat => cat.Id === parseInt(categoryId))
    : null
  
  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar 
        categories={categoriesWithCounts}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onAddCategory={handleAddCategory}
        taskCounts={{ all: tasks.length }}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onSearch={setSearchQuery}
          onAddTask={handleAddTask}
          onToggleSidebar={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-display">
                  {currentCategory ? currentCategory.name : 'All Tasks'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {taskCounts.active} active, {taskCounts.completed} completed
                </p>
              </div>
            </div>
            
            {/* Task Form */}
            {showTaskForm && (
              <TaskForm
                task={editingTask}
                categories={categories}
                onSubmit={handleTaskSubmit}
                onCancel={() => {
                  setShowTaskForm(false)
                  setEditingTask(null)
                }}
                isVisible={showTaskForm}
              />
            )}
            
            {/* Category Form */}
            {showCategoryForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-4 border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <Input
                    placeholder="Enter category name..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                    className="flex-1"
                  />
                  <Button onClick={handleAddCategory} icon="Plus">
                    Add
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setShowCategoryForm(false)
                      setNewCategoryName('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
            
            {/* Controls */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <FilterTabs
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                taskCounts={taskCounts}
              />
              
              <SortDropdown
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
            
            {/* Task List */}
            <TaskList
              tasks={filteredAndSortedTasks}
              loading={loading}
              error={error}
              onTaskComplete={handleCompleteTask}
              onTaskEdit={handleEditTask}
              onTaskDelete={handleDeleteTask}
              onRetry={loadData}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default TaskDashboard