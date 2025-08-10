'use client'
import React from 'react'
import { useNodeSettings } from '@/store/useNodeSettings'
import NodeSttingsPanel from '../organisms/nodeSettings/NodeSettingsPanel'

const NodeSetting = () => {

  const nodeType = useNodeSettings((s) => s.nodeType)



  console.log(nodeType, 'nodeType in NodeSetting')



  return (
    <div className='w-full lg:w-80 bg-white border-r border-gray-200 p-3 sm:p-4 overflow-y-auto h-[calc(100vh-80px)]'>
      <span className=' text-xl font-medium text-gray-600'>Node Settings</span>
      <NodeSttingsPanel nodeType={nodeType} />
    </div>
  )
}

export default NodeSetting