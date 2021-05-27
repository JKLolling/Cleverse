import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { csrfFetch } from '../../store/csrf'
import './SplashPage.css'


function SplashPage() {
  const [trackList, setTrackList] = useState({})

  // Retrieve the tracklist
  useEffect(() => {
    (async () => {
      const res = await csrfFetch(`/api/tracks/`)
      const data = await res.json()
      setTrackList(data)
    })()
  }, [])

  return (
    <div className='splash_wrapper'>
      <div className='splash_listWrapper'>
        {Object.values(trackList).map((track, i) => {
          return <NavLink to={`/tracks/${track.id}`} key={track.title + track.band} className='splash_trackListItem'>
            <span className='splash_trackListIndex'>
              {i + 1}
            </span>
            <span className='splash_trackListAlbumCover'>
              <img src={track.albumCover} className='splash_trackListAlbumCover' />
            </span>
            <span className='splash_trackListTitle'>
              {track.title}
            </span>
            <span className='splash_trackListBand'>
              {track.band}
            </span>
            <span className='splash_trackListAlbumTitle'>
              {track.albumTitle}
            </span>
          </NavLink>
        })
        }
      </div>
    </div >
  )
}

export default SplashPage
