import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ColorThief from 'colorthief'

const SongBanner = ({ isLoaded }) => {

  const colorThief = new ColorThief()

  const trackData = useSelector(state => state.track)

  useEffect(() => {

    if (isLoaded) {
      let coverImg = document.getElementById('coverPhoto')

      if (coverImg?.complete) {
        const colors = (colorThief.getPalette(coverImg));
        const temp = `rgb(${colors[4][0]},${colors[4][1]},${colors[4][2]})`
        document.body.style.setProperty('--cover-color', temp)
      } else {
        coverImg.addEventListener('load', function () {
          const colors = (colorThief.getPalette(coverImg));
          const temp = `rgb(${colors[4][0]},${colors[4][1]},${colors[4][2]})`
          document.body.style.setProperty('--cover-color', temp)
        });
      }
    }
  }, [isLoaded])

  let features = <div></div>
  if (trackData?.track?.featuring) {
    features =
      <div>Featuring
        <span className='banner_data'>
          {trackData.track.featuring}
        </span>
      </div>
  }

  return (
    <div className='track_banner'>
      <div className='track_banner_tint'>
        <div className='track_banner_totalInfo'>
          <div className='track_banner_leftInfo'>
            <div className='track_banner_leftInfo_img'>
              <img src={trackData.track.albumCover} id='coverPhoto' />
            </div>
            <div className='track_banner_leftInfo_data'>
              <div className='banner_title'>{trackData.track.title}</div>
              <div className='banner_band'>{trackData.track.band}</div>
              {features}
              <div>Album
                <span className='banner_data'>
                  {trackData.track.albumTitle}
                </span>
              </div>
            </div>
          </div>
          <div className='track_banner_rightInfo'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongBanner
