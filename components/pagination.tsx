import React from 'react'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded disabled:opacity-50 transition-colors duration-200 ease-in-out hover:bg-yellow-100 dark:hover:bg-yellow-700 dark:border-yellow-600 bg-white dark:bg-gray-700"
      >
        Previous
      </button>
      <span className="text-gray-700 dark:text-gray-300">{currentPage} of {Math.max(1, totalPages)}</span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages || totalPages === 0}
        className="px-4 py-2 border rounded disabled:opacity-50 transition-colors duration-200 ease-in-out hover:bg-yellow-100 dark:hover:bg-yellow-700 dark:border-yellow-600 bg-white dark:bg-gray-700"
      >
        Next
      </button>
    </div>
  )
}

