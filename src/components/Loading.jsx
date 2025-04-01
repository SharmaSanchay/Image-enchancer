import React from 'react'

function Loading() {
  return (
  <div className='flex justify-center items-center py-6 h-full'>
   <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
  </div>
)
  
}

export default Loading