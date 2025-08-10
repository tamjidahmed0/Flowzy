
import React from 'react'
import GoogleSheet from './googleSheet/GoogleSheet'
import Telegram from './Telegram'





const NodeSettingsPanel = ({ nodeType }) => {

  switch (nodeType) {
      case 'sheet' :
          return <GoogleSheet />
      case 'telegram' :
          return <Telegram />
      default :
         return null
  }





}

export default NodeSettingsPanel