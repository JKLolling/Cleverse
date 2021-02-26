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
  const [annotations, setAnnotations] = useState({})
  const [activeAnnotation, setActiveAnnotation] = useState('')
  const [defaultAnnotation, setDefaultAnnotation] = useState('')
  const [annotationPosition, setannotationPosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const history = useHistory()
  const dispatch = useDispatch()
  const id = useParams().trackId
  const trackData = useSelector(state => state.track)
  const colorThief = new ColorThief()

  // Get lyrics from the store
  useEffect(() => {
    dispatch(trackActions.asyncFetchTrack(id))
      .then(() => setIsLoaded(true))
  }, [dispatch])

  // Color the banner
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

  // Retrieve the lyrics and set the lyrics state
  useEffect(() => {
    if (trackData.track) {
      let temp = (trackData.track.lyrics.split('\n'))
      temp = temp.map(string => string.trimLeft())
      temp = temp.join('\n')

      setLyrics(temp)
    }
  }, [isLoaded])

  // Add existing annotations to the page
  useEffect(() => {
    if (trackData.track && isLoaded) {
      let annotations = trackData.track.Annotations
      const coordinateArray = []
      const annotationsObj = {}

      // Get the start and end indices for every lyric that is annotated
      for (let i = 0; i < annotations.length; i++) {
        let annotatedLyric = annotations[i].lyric

        // Set the default annotation
        if (!annotatedLyric) {
          let temp = annotations[i].annotation
          temp = temp.replaceAll('          ', '')
          temp = temp.replaceAll('        ', '')
          setDefaultAnnotation(temp)
          setActiveAnnotation(temp)
          continue
        }

        annotatedLyric = annotatedLyric.replaceAll('          ', '')
        annotatedLyric = annotatedLyric.replaceAll('        ', '')

        // Link the actual annotations to their lyrics through an object
        annotationsObj[annotatedLyric] = annotations[i]

        // If the lyric occurs multiple times, add the same annotatedLyric to the applicable lines
        let index = 0
        while (index > -1) {
          let start = lyrics.indexOf(annotatedLyric, index)
          let end = start + annotatedLyric.length

          // If we actually find the lyric, start searching from the last found location (end) and push the coordinates to the coordinateArray
          if (start > -1) {
            coordinateArray.push([start, end])
            index = end
          } else {
            index = -1
          }
        }
      }

      coordinateArray.sort((a, b) => {
        if (a[0] > b[0]) return -1
        return 1
      })

      // Wrap all the annotated lyrics in individual spans
      let node = document.getElementsByClassName('track_lyric_wrapper')[0]
      let textNode = document.createTextNode(lyrics)
      node.appendChild(textNode)

      coordinateArray.forEach(value => {
        let range = document.createRange()
        range.setStart(textNode, value[0])
        range.setEnd(textNode, value[1])

        const span = document.createElement('span')
        span.addEventListener('click', retrieveAnnotation)
        span.classList.add('highlight')
        range.surroundContents(span)
      })
      setAnnotations(annotationsObj)
    }
  }, [lyrics, isLoaded])


  useEffect(() => {
    if (trackData.track && isLoaded) {
      displayDefaultAnnotation()
    }
  }, [isLoaded])

  const highlightLyric = () => {
    const selection = window.getSelection()
    let start = selection.anchorNode
    let startOffset = selection.anchorOffset
    let end = selection.focusNode
    let endOffset = selection.focusOffset

    if (startOffset === endOffset) return

    if (startOffset > endOffset) {
      let temp = [start, startOffset]
      start = end
      startOffset = endOffset
      end = temp[0]
      endOffset = temp[1]
    }

    // Check if this lyric has already been annotated or contains lyrics that have been annotated
    if (start.parentElement.className === 'highlight' || end.parentElement.className === 'highlight') {
      return
    }

    selection.removeAllRanges();
    let range = document.createRange()
    range.setStart(start, startOffset)
    range.setEnd(end, endOffset)
    selection.addRange(range)

    const span = document.createElement('span')
    span.classList.add('highlight-yellow')
    try {
      range.surroundContents(span)
    } catch (error) {
      // console.log('Can\'t wrap an existing annotation')
    }
  }

  const displayDefaultAnnotation = () => {
    const wrapper = document.getElementsByClassName('track_anno_wrapper')[0]
    wrapper.classList.add('display')
    setannotationPosition({ x: 0, y: 0 })
    setMousePosition({ x: 0, y: 10000 })
    setActiveAnnotation(defaultAnnotation)
  }

  const retrieveAnnotation = (e) => {
    e.stopPropagation()
    const lyric = e.target.innerText
    const annotationObj = annotations[lyric]
    if (!annotationObj) {
      return displayDefaultAnnotation()
    }

    let annotation = annotationObj.annotation

    annotation = annotation.replaceAll('          ', '')
    annotation = annotation.replaceAll('        ', '')
    annotation.trimLeft()

    setActiveAnnotation(annotation)

    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    yPosition -= 300
    if (yPosition < 0) yPosition = 0


    let temp = (e.clientY - 1000)
    let offset = window.pageYOffset || document.documentElement.scrollTop;

    if (offset <= 300) {
      temp = temp - 300 + offset
    }

    setMousePosition({ x: 0, y: temp })
    setannotationPosition({ x: 0, y: yPosition })

    const wrapper = document.getElementsByClassName('track_anno_wrapper')[0]
    wrapper.classList.remove('display')
    setTimeout(() => {
      wrapper.classList.add('display')
    }, 1);
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
          <div className='track_lyric_anno_wrapper'>
            <div className='track_lyric_wrapper' onMouseUp={highlightLyric} onClick={retrieveAnnotation}>
            </div>
            <div className='track_anno_wrapper' style={{ top: annotationPosition.y }}>
              <div className='anno_arrow_wrapper'>
                <img src='/images/arrow.png' className='anno_arrow' style={{ top: mousePosition.y }} />
              </div>
              <div className='annotation'>
                <div className='annotation_header'>Cleverse Annotation:</div>
                {activeAnnotation}
              </div>
            </div>
          </div>
        </div >
      )
      }
    </>
  )
}

export default TrackPage


// {{ top: mousePosition.y - 400 }}
