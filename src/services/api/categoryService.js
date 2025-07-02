import mockCategories from '@/services/mockData/categories.json'

class CategoryService {
  constructor() {
    this.categories = [...mockCategories]
  }
  
  // Simulate API delay
  delay(ms = 250) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  async getAll() {
    await this.delay()
    return [...this.categories]
  }
  
  async getById(id) {
    await this.delay()
    const category = this.categories.find(cat => cat.Id === parseInt(id))
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  }
  
  async create(categoryData) {
    await this.delay()
    
    const newCategory = {
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      name: categoryData.name,
      color: categoryData.color,
      taskCount: 0,
    }
    
    this.categories.push(newCategory)
    return { ...newCategory }
  }
  
  async update(id, updates) {
    await this.delay()
    
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    this.categories[index] = {
      ...this.categories[index],
      ...updates,
    }
    
    return { ...this.categories[index] }
  }
  
  async delete(id) {
    await this.delay()
    
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    this.categories.splice(index, 1)
    return true
  }
}

export const categoryService = new CategoryService()