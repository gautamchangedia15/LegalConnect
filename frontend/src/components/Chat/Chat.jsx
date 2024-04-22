import React from 'react'
import MessageContainer from './Messages/MessageContainer'
import Sidebar from './Sidebar/Sidebar'

function Chat() {
  return (
    <div className='mt-20'>
        <Sidebar/>
        <MessageContainer/>
    </div>
  )
}

export default Chat