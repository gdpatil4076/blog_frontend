import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Videocall = () => {
  const Navigate = useNavigate();
  const [value , setValue] = useState();

  const handelJoinRoom = useCallback(()=>{
        Navigate(`/room/${value}`);
  },[Navigate,value]);


  return (
    <div className='container mt-4'>
      <input type="text" placeholder='Enter room ID' onChange={(e)=>setValue(e.target.value)}/>
      <button onClick={handelJoinRoom} >Join Call</button>
    </div>
  )
}

export default Videocall
