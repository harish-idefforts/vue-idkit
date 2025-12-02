import { computed } from 'vue'

/**
 * Composable for IdKit theme utilities
 */
export function useIdTheme() {
  /**
   * Get color classes for a given variant
   * @param {string} variant - The color variant
   * @param {string} type - The type of component ('button', 'text', 'bg', 'border')
   * @returns {string} - The Tailwind classes
   */
  const getColorClasses = (variant, type = 'button') => {
    const colorMap = {
      button: {
        primary: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700',
        secondary: 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200',
        success: 'text-white bg-green-700 hover:bg-green-800 focus:ring-green-300',
        danger: 'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300',
        warning: 'text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300',
        info: 'text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-cyan-300'
      },
      text: {
        primary: 'text-blue-700 dark:text-blue-500',
        secondary: 'text-gray-700 dark:text-gray-300',
        success: 'text-green-700 dark:text-green-500',
        danger: 'text-red-700 dark:text-red-500',
        warning: 'text-yellow-700 dark:text-yellow-500',
        info: 'text-cyan-700 dark:text-cyan-500'
      },
      bg: {
        primary: 'bg-blue-50 dark:bg-blue-900',
        secondary: 'bg-gray-50 dark:bg-gray-800',
        success: 'bg-green-50 dark:bg-green-900',
        danger: 'bg-red-50 dark:bg-red-900',
        warning: 'bg-yellow-50 dark:bg-yellow-900',
        info: 'bg-cyan-50 dark:bg-cyan-900'
      },
      border: {
        primary: 'border-blue-300 dark:border-blue-600',
        secondary: 'border-gray-300 dark:border-gray-600',
        success: 'border-green-300 dark:border-green-600',
        danger: 'border-red-300 dark:border-red-600',
        warning: 'border-yellow-300 dark:border-yellow-600',
        info: 'border-cyan-300 dark:border-cyan-600'
      }
    }

    return colorMap[type]?.[variant] || ''
  }

  /**
   * Get size classes for a given size
   * @param {string} size - The size variant
   * @param {string} component - The component type ('button', 'input', 'text')
   * @returns {string} - The Tailwind classes
   */
  const getSizeClasses = (size, component = 'button') => {
    const sizeMap = {
      button: {
        xs: 'text-xs px-3 py-2',
        sm: 'text-sm px-4 py-2',
        md: 'text-sm px-5 py-2.5',
        lg: 'text-base px-5 py-3',
        xl: 'text-base px-6 py-3.5'
      },
      input: {
        sm: 'p-2 text-xs',
        md: 'p-2.5 text-sm',
        lg: 'p-4 text-base'
      },
      text: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
      }
    }

    return sizeMap[component]?.[size] || sizeMap[component]?.['md'] || ''
  }

  /**
   * Common IdKit base classes
   */
  const baseClasses = {
    button: 'focus:ring-4 focus:outline-none font-medium text-center transition-colors duration-200',
    input: 'block w-full border rounded-lg focus:ring-4 focus:outline-none transition-colors duration-200',
    card: 'bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700',
    label: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
  }

  /**
   * State classes for form inputs
   */
  const inputStateClasses = {
    default: 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white',
    success: 'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500',
    error: 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-900 placeholder-yellow-700 focus:ring-yellow-500 focus:border-yellow-500'
  }

  return {
    getColorClasses,
    getSizeClasses,
    baseClasses,
    inputStateClasses
  }
}
