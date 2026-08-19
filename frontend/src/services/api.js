const API_BASE = '/api'

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Learner endpoints
  async createLearner(data) {
    return this.request('/learners', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getLearner(id) {
    return this.request(`/learners/${id}`)
  }

  // Analysis endpoints
  async analyzeLearner(data) {
    return this.request('/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async generateRoadmap(learnerId) {
    return this.request('/roadmap/generate', {
      method: 'POST',
      body: JSON.stringify({ learnerId }),
    })
  }

  async getRoadmap(learnerId) {
    return this.request(`/roadmap/${learnerId}`)
  }

  async recalculateRoadmap(learnerId) {
    return this.request('/roadmap/recalculate', {
      method: 'POST',
      body: JSON.stringify({ learnerId }),
    })
  }

  // Recommendations
  async getRecommendations(learnerId) {
    return this.request(`/recommendations/${learnerId}`)
  }

  async getProjects(learnerId) {
    return this.request(`/projects/${learnerId}`)
  }

  // Assessment
  async generateAssessment(topic, learnerId) {
    return this.request('/assessment/generate', {
      method: 'POST',
      body: JSON.stringify({ topic, learnerId }),
    })
  }

  async submitAssessment(assessmentId, answers, learnerId) {
    return this.request('/assessment/submit', {
      method: 'POST',
      body: JSON.stringify({ assessmentId, answers, learnerId }),
    })
  }

  // Progress
  async getProgress(learnerId) {
    return this.request(`/progress/${learnerId}`)
  }

  async updateProgress(learnerId, data) {
    return this.request('/progress/update', {
      method: 'POST',
      body: JSON.stringify({ learnerId, ...data }),
    })
  }

  // Chat
  async chat(message, learnerId) {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, learnerId }),
    })
  }

  // Data
  async getSkills() {
    return this.request('/skills')
  }

  async getCourses() {
    return this.request('/courses')
  }
}

export const api = new ApiService()
