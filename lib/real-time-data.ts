"use client"

import { useEffect, useState } from "react"

// Types for real-time data
export interface RealTimeData {
  lastUpdated: Date
  onlineUsers: number
  courseEnrollments: Record<string, number>
  completedCourses: Record<string, number>
  issuedCertificates: number
}

// Mock initial data
const initialData: RealTimeData = {
  lastUpdated: new Date(),
  onlineUsers: 0,
  courseEnrollments: {},
  completedCourses: {},
  issuedCertificates: 0,
}

// Simulate real-time updates
function simulateRealTimeUpdates(callback: (data: RealTimeData) => void) {
  // Initial data
  let data = { ...initialData }

  // Update data every 30 seconds
  const interval = setInterval(() => {
    data = {
      ...data,
      lastUpdated: new Date(),
      onlineUsers: Math.floor(Math.random() * 100) + 50,
      courseEnrollments: {
        "1": Math.floor(Math.random() * 100) + 200,
        "2": Math.floor(Math.random() * 80) + 150,
        "3": Math.floor(Math.random() * 60) + 100,
      },
      completedCourses: {
        "1": Math.floor(Math.random() * 50) + 100,
        "2": Math.floor(Math.random() * 40) + 80,
        "3": Math.floor(Math.random() * 30) + 50,
      },
      issuedCertificates: Math.floor(Math.random() * 20) + 180,
    }

    callback(data)
  }, 30000)

  return () => clearInterval(interval)
}

// Hook for accessing real-time data
export function useRealTimeData() {
  const [data, setData] = useState<RealTimeData>(initialData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const loadingTimeout = setTimeout(() => {
      setData({
        lastUpdated: new Date(),
        onlineUsers: Math.floor(Math.random() * 100) + 50,
        courseEnrollments: {
          "1": Math.floor(Math.random() * 100) + 200,
          "2": Math.floor(Math.random() * 80) + 150,
          "3": Math.floor(Math.random() * 60) + 100,
        },
        completedCourses: {
          "1": Math.floor(Math.random() * 50) + 100,
          "2": Math.floor(Math.random() * 40) + 80,
          "3": Math.floor(Math.random() * 30) + 50,
        },
        issuedCertificates: Math.floor(Math.random() * 20) + 180,
      })
      setIsLoading(false)
    }, 1000)

    // Set up real-time updates
    const cleanup = simulateRealTimeUpdates(setData)

    return () => {
      clearTimeout(loadingTimeout)
      cleanup()
    }
  }, [])

  return { data, isLoading }
}

// Function to format the last updated time
export function formatLastUpdated(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date)
}

