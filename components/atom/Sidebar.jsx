'use client'
import React from 'react'
import { availableNodes } from '@/data/Nodes';
import { useFlowStore } from '@/store/useFlowStore';

const Sidebar = () => {

 const setNodes = useFlowStore((s) => s.setNodes);


  return (
    <div className='w-full lg:w-80 bg-white border-r border-gray-200 p-3 sm:p-4 overflow-y-auto'>
      <span className=' text-xl font-medium text-gray-600'>Integrations</span>
      {/* nodes */}
      <div className='mt-4 space-y-2'>
        {availableNodes.map((node, i) => (
          <div
          onClick={() => setNodes(node)}
           key={i} className='flex items-center border space-x-2 py-4 px-3 hover:bg-gray-100 rounded-md cursor-pointer'>
            <div className='w-6 h-6 flex items-center justify-center'>
              <span className='text-gray-600'>{node.icon}</span>
            </div>
            <div className='flex flex-col'>
              <span className=' font-medium text-gray-800'>{node.label}</span>
              <span className='text-xs text-gray-500'>{node.description}</span>
            </div>
          </div>
        ))}

      </div>


    </div>
  )
}

export default Sidebar