import React from 'react'
import { Params, useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Room = () => {
  const {roomId} = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  const userName = user.name; 


  const MyMeeting = async (element)=>{


    try{
        const appID = 1851748364;
        const serverSecret = "a1f81e18a8f7abceb9b37de86de3f217";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID, serverSecret, roomId,  userId,  userName
        );
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container : element,
            sharedLinks : [
                    {
                        name : 'Copy Link',
                        url : `http://localhost:3000/room/${roomId}`
                    }
            ],
            scenario : {
                mode : ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton : true,
            
        })

      const closeButton = document.getElementById('closeButton');

      // Add click event listener to the close button
      closeButton.addEventListener('click', () => {
          // Close the video call or screen sharing session
          zc.leaveRoom();
      });
    }
    catch(error){
        console.log(error);
    }


  }
  return (
    <div>
      
      <div ref={MyMeeting}></div>
      
      <button id='closeButton'>Close Call</button>
      
    </div>
  )
}

export default Room
