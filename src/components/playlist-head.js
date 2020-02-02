import React, { useState } from 'react'
import { useStateValue } from '../state'
import backIcon from '../img/back.png'
import urlIcon from '../img/url.png'

export default function SectionHead({ updateTitle }) {
   const [{ components, auth, channelId }, dispatch] = useStateValue()
   const [displayUrlField, toDisplayUrlField] = useState(false)
   const [value, setValue] = useState()

   const handleSubmit = (e) => {
      e.preventDefault()
      dispatch({ type: 'url', channelId: value })
      console.log(channelId);
   }
   return (
      <div className="playlist-pos">
         {components.playlistItems
            ? <div className="playlist-event" onClick={() => {
               dispatch({
                  type: 'manage', components: { ...components, playlistItems: false }
               })
               updateTitle(JSON.parse(auth.user).name)
            }}>
               <img src={backIcon} alt="" /></div>
            : <>
               <div className="playlist-url"  >
                  <img src={urlIcon} alt="" onClick={() => toDisplayUrlField(!displayUrlField)} />
                  {displayUrlField &&
                     <form onSubmit={handleSubmit}>
                        <input type="text" value={value}
                           placeholder="Default channel ID"
                           onChange={e => setValue(e.target.value)}
                           autoFocus={true} />
                     </form>
                  }
               </div>
            </>
         }
      </div>
   )
}
