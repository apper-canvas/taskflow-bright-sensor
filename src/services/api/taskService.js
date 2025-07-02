import mockTasks from '@/services/mockData/tasks.json'

class TaskService {
  constructor() {
    this.tasks = [...mockTasks]
  }
  
  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  async getAll() {
    await this.delay()
    return [...this.tasks]
  }
  
  async getById(id) {
    await this.delay()
    const task = this.tasks.find(task => task.Id === parseInt(id))
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  }
  
  async create(taskData) {
    await this.delay()
    
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      description: taskData.description || '',
      dueDate: taskData.dueDate || null,
      priority: taskData.priority || 'medium',
      categoryId: taskData.categoryId || null,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    }
    
    this.tasks.unshift(newTask)
    return { ...newTask }
  }
  
  async update(id, updates) {
    await this.delay()
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks[index] = {
      ...this.tasks[index],
      ...updates,
    }
    
    return { ...this.tasks[index] }
  }
  
  async delete(id) {
    await this.delay()
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks.splice(index, 1)
    return true
  }
}

export const taskService = new TaskService()