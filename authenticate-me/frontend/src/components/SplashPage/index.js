import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as trackActions from '../../store/track'
import './SplashPage.css'

function SplashPage() {
  const dispatch = useDispatch()
  const tracksObj = useSelector(state => state.track)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(trackActions.asyncFetchTrackList()).then(() => setIsLoaded(true))

  }, [dispatch])

  let array = []
  for (let key in tracksObj) {
    tracksObj[key].imgSrc = tracksObj[key].title?.split(' ').join('_')
    array.push(tracksObj[key])
  }

  const handleClick = (e) => {
    console.log(e.currentTarget.children[2].innerText)
    // const title = e.currentTarget.children[2].innerText
    // (e.currentTarget.children[2].innerText
  }
  return (
    <div className='splash_wrapper'>
      <div className='splash_listWrapper'>
        {array.map((track, i) => {
          return <NavLink to={`/tracks/${track.id}`} key={track.title + track.band} className='splash_trackListItem' onClick={handleClick}>
            <span className='splash_trackListIndex'>
              {i + 1}
            </span>
            <span className='splash_trackListAlbumCover'>
              <img src={`/images/seedPhotos/${track.imgSrc}.jpg`} className='splash_trackListAlbumCover' />
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
