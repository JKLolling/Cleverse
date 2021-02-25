import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, NavLink } from 'react-router-dom'
import ColorThief from 'colorthief'
import * as trackActions from '../../store/track'
import PageNotFound from '../PageNotFound'
import './TrackPage.css'

function TrackPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [lyrics, setLyrics] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()
  const id = useParams().trackId
  const trackData = useSelector(state => state.track)
  const colorThief = new ColorThief()

  useEffect(() => {

  })

  useEffect(() => {
    dispatch(trackActions.asyncFetchTrack(id))
      .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    let coverImg = document.getElementById('coverPhoto')

    if (isLoaded) {
      if (coverImg?.complete) {
        colorThief.getColor(coverImg)
      } else {
        coverImg?.addEventListener('load', function () {
          const colors = (colorThief.getPalette(coverImg));
          const temp = `rgb(${colors[0][0]},${colors[0][1]},${colors[0][2]})`
          document.body.style.setProperty('--cover-color', temp)
        });
      }
    }
  }, [isLoaded])

  useEffect(() => {
    if (trackData.track) {
      let temp = (trackData.track.lyrics.split('\n'))
      temp = temp.map(string => string.trimLeft())
      temp = temp.join('\n')

      setLyrics(temp)
    }
  }, [isLoaded])

  useEffect(() => {
    if (trackData.track) {
      let annotations = trackData.track.Annotations
      const array = []
      for (let i = 0; i < annotations.length; i++) {
        let annotation = annotations[i].lyric
        if (!annotation) continue

        annotation = annotation.replaceAll('          ', '')
        annotation = annotation.replaceAll('        ', '')

        array.push([lyrics.indexOf(annotation), lyrics.indexOf(annotation) + annotation.length])
      }

      array.sort((a, b) => {
        if (a[0] > b[0]) return -1
        return 1
      })
      console.log(array)
      let node = document.getElementsByClassName('track_lyric_wrapper')[0]

      let textNode = document.createTextNode(lyrics)
      console.log(textNode)
      node.appendChild(textNode)

      array.forEach(value => {
        let range = document.createRange()
        range.setStart(textNode, value[0])
        range.setEnd(textNode, value[1])

        const span = document.createElement('span')
        span.classList.add('highlight')
        range.surroundContents(span)
      })



      console.log(array)
    }
  }, [lyrics])

  const highlightLyric = () => {
    const selection = window.getSelection()
    let start = selection.anchorNode
    let startOffset = selection.anchorOffset
    let end = selection.focusNode
    let endOffset = selection.focusOffset

    if (startOffset > endOffset) {
      let temp = [start, startOffset]
      start = end
      startOffset = endOffset
      end = temp[0]
      endOffset = temp[1]
    }
    selection.removeAllRanges();

    let range = document.createRange()
    range.setStart(start, startOffset)
    range.setEnd(end, endOffset)
    selection.addRange(range)

    const span = document.createElement('span')
    span.classList.add('highlight')
    try {
      range.surroundContents(span)
    } catch (error) {
      console.log('Can\'t wrap an existing annotation')
    }
  }

  const trackIsValid = !!trackData.track
  if (isLoaded && !trackIsValid) {
    return <PageNotFound />
  }
  let imgSrc = ''
  if (isLoaded) {
    imgSrc = trackData.track.title.split(' ').join('_')
  }

  let features = <div></div>
  if (trackData?.track?.featuring) {
    features =
      <div>Featuring
        <span className='banner_data'>
          {trackData.track.featuring}
        </span>
      </div>
  }


  const retrieveAnnotation = (e) => {
    const selection = window.getSelection()
    let start = selection.anchorNode
    let startOffset = selection.anchorOffset

    console.log(startOffset)
  }

  return (
    <>
      {(isLoaded && trackIsValid) && (
        <div>
          <div className='track_banner'>
            <div className='track_banner_tint'>
              <div className='track_banner_totalInfo'>
                <div className='track_banner_leftInfo'>
                  <div className='track_banner_leftInfo_img'>
                    <img src={`/images/seedPhotos/${imgSrc}.jpg`} id='coverPhoto' />
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
          <div className='hhh'>
            <div className='track_lyric_anno_wrapper'>
              <div className='track_anno_wrapper'>
              </div>
              <div className='track_lyric_wrapper' onMouseUp={highlightLyric} onClick={retrieveAnnotation}>
                {/* {lyrics.split('').map(letter => letter)} */}
                {/* {lyrics} */}
              </div>
            </div>
          </div >
        </div>
      )
      }
    </>
  )
}

export default TrackPage
