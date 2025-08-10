'use client'
import React from 'react'
import { Wizard } from "react-use-wizard";

import CreateConnection from './screen/CreateConnection';
import ActionLists from './screen/ActionLists';
import AddRow from './screen/AddRow';
import WatchRows from './screen/WatchRows';



const GoogleSheet = () => {
const triggerType = 'watchRow'

  const stepMap = {
    'createConnection': 0,
    'watchRows': 2,
  }

  const startIndex = stepMap[triggerType] ?? 0 // fallback to 0 if not matched



  return (
    <Wizard startIndex={startIndex}>
      <CreateConnection />
      <ActionLists />
      <WatchRows />
    </Wizard>
  )
}

export default GoogleSheet
