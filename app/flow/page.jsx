'use client'
import React from 'react'
import Header from '@/components/atom/Header'
import Sidebar from '@/components/atom/Sidebar'
import FlowBuilder from '../example/page'
import NodeSetting from '@/components/atom/NodeSetting'
import { useNodeSettings } from '@/store/useNodeSettings'





const Flow = () => {

  const isOpen = useNodeSettings((s) => s.isNodeSettingOpen);



  return (
    <div className="flex flex-col h-dvh">
      <Header />

      <div className="flex overflow-hidden">

        <div className='hidden lg:block'>
          <Sidebar />
        </div>



        <div className="flex-1">
          <FlowBuilder />
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'}`}>
          <NodeSetting />
        </div>
      </div>
    </div>

  )
}

export default Flow