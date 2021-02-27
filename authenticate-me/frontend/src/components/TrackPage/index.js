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

  const [annotationCoordinates, setAnnotationCoordinates] = useState([])
  const [annotationPosition, setannotationPosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const [newAnnotation, setNewAnnotation] = useState('')
  const [highlightedText, setHighlightedText] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()
  const id = useParams().trackId
  const trackData = useSelector(state => state.track)
  const colorThief = new ColorThief()

  // Get lyrics from the database
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

  // Retrieve the lyrics from our store variable and set the local state
  useEffect(() => {
    if (trackData.track) {
      let temp = (trackData.track.lyrics.split('\n'))
      temp = temp.map(string => string.trimLeft())
      temp = temp.join('\n')

      setLyrics(temp)
    }
  }, [isLoaded])


  const localState = Object.keys(annotations).length + 1
  // console.log('local', localState)
  // console.log('directly from the store', trackData?.track?.Annotations)
  // console.log(trackData?.track?.Annotations.length)

  // Calculate where the existing annotations should go
  const createAnnotationCoordinates = () => {
    if (trackData?.track?.Annotations) {

      let storeAnnotations = trackData.track.Annotations
      const coordinateArray = []
      const annotationsObj = {}

      // Get the start and end indices for every lyric that is annotated
      for (let i = 0; i < storeAnnotations.length; i++) {
        let annotatedLyric = storeAnnotations[i].lyric

        // Set the default annotation
        if (!annotatedLyric) {

          let defaultAnnotation = storeAnnotations[i].annotation
          defaultAnnotation = defaultAnnotation.replaceAll('          ', '')
          defaultAnnotation = defaultAnnotation.replaceAll('        ', '')
          setDefaultAnnotation(defaultAnnotation)
          setActiveAnnotation(defaultAnnotation)
          continue
        } else {

        }

        // Just helps formatting the seed values
        annotatedLyric = annotatedLyric.replaceAll('          ', '')
        annotatedLyric = annotatedLyric.replaceAll('        ', '')

        // Link the actual annotations to their lyrics through an object
        annotationsObj[annotatedLyric] = storeAnnotations[i]

        // Adds multiple start/end coordinates if the lyric shows up multiple times
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

      setAnnotationCoordinates(coordinateArray)
      setAnnotations(annotationsObj)

      // console.log('store annotations', Object.values(storeAnnotations).map(obj => obj.lyric))
    }
  }
  if (localState != trackData?.track?.Annotations.length) {
    createAnnotationCoordinates()
  }

  useEffect(() => {
    createAnnotationCoordinates()
  }, [lyrics, isLoaded])

  // Wrap each annotated lyric in a span.
  const wrapAnnotations = () => {
    if (isLoaded && annotationCoordinates.length > 0) {
      let node = document.getElementsByClassName('track_lyric_wrapper')[0]

      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }

      let textNode = document.createTextNode(lyrics)
      node.appendChild(textNode)

      annotationCoordinates.forEach(value => {
        let range = document.createRange()
        range.setStart(textNode, value[0])
        range.setEnd(textNode, value[1])

        const span = document.createElement('span')
        span.addEventListener('click', retrieveAnnotation)
        span.classList.add('highlight')

        range.surroundContents(span)
      })
    }
  }
  useEffect(() => {
    wrapAnnotations()
  }, [annotationCoordinates, isLoaded, annotations])


  // Load the default annotation at the beginning
  useEffect(() => {
    if (trackData.track && isLoaded) {
      displayDefaultAnnotation()
    }
  }, [isLoaded])

  const highlightLyric = (e) => {
    const selection = window.getSelection()
    let start = selection.anchorNode
    let startOffset = selection.anchorOffset
    let end = selection.focusNode
    let endOffset = selection.focusOffset

    if (startOffset === endOffset) {
      return retrieveAnnotation(e)
    }

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
    span.classList.add('active')
    try {
      range.surroundContents(span)
    } catch (error) {
      // console.log('Can\'t wrap an existing annotation')
    }

    setHighlightedText(range.toString())

    let form = document.getElementsByClassName('new_annotation_form')[0]
    form.classList.remove('hidden')

    let header = document.getElementsByClassName('annotation_header')[0]
    header.classList.add('hidden')

    let contents = document.getElementsByClassName('annotation_contents')[0]
    contents.classList.add('hidden')

    let oldActive = document.querySelector('.active')
    if (oldActive)
      oldActive.classList.remove('active')

    setAnnotationWrapper(e)
  }

  const submitNewAnnotation = async (e) => {
    e.preventDefault()

    if (!!newAnnotation?.length) {
      let data = {
        annotation: newAnnotation,
        lyric: highlightedText,
        userId: 52,
        trackId: trackData.track.id
      }
      const res = await dispatch(trackActions.asyncSaveAnnotation(data))
    }
  }

  const displayDefaultAnnotation = () => {
    const wrapper = document.getElementsByClassName('track_anno_wrapper')[0]
    wrapper.classList.add('display')
    setannotationPosition({ x: 0, y: 0 })
    setMousePosition({ x: 0, y: 10000 })
    setActiveAnnotation(defaultAnnotation)

    let form = document.getElementsByClassName('new_annotation_form')[0]
    form.classList.add('hidden')

    let header = document.getElementsByClassName('annotation_header')[0]
    header.classList.remove('hidden')

    let contents = document.getElementsByClassName('annotation_contents')[0]
    contents.classList.remove('hidden')

    let oldActive = document.querySelector('.active')
    if (oldActive)
      oldActive.classList.remove('active')
  }

  const retrieveAnnotation = (e) => {
    e.stopPropagation()

    let form = document.getElementsByClassName('new_annotation_form')[0]
    form.classList.add('hidden')

    let header = document.getElementsByClassName('annotation_header')[0]
    header.classList.remove('hidden')

    let contents = document.getElementsByClassName('annotation_contents')[0]
    contents.classList.remove('hidden')

    const lyric = e.target.innerText

    const annotationObj = annotations[lyric]
    if (!annotationObj) {
      return displayDefaultAnnotation()
    }

    let oldActive = e.target.parentElement.querySelector('.active')
    if (oldActive)
      oldActive.classList.remove('active')

    e.target.classList.add('active')

    let annotation = annotationObj.annotation

    annotation = annotation.replaceAll('          ', '')
    annotation = annotation.replaceAll('        ', '')
    annotation.trimLeft()

    setActiveAnnotation(annotation)
    setAnnotationWrapper(e)
  }

  const setAnnotationWrapper = (e) => {
    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    yPosition -= 300
    if (yPosition < 0) yPosition = 0

    let temp = (e.clientY - 975)
    let offset = window.pageYOffset || document.documentElement.scrollTop;

    if (offset <= 300) {
      temp = temp - 300 + offset
    }

    setMousePosition({ x: 0, y: temp })
    setannotationPosition({ x: 0, y: yPosition })


    // The css slide transition
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
            <div className='track_lyric_wrapper' onMouseUp={highlightLyric} >
            </div>
            <div className='track_anno_wrapper' style={{ top: annotationPosition.y }}>
              <div className='anno_arrow_wrapper'>
                <img src='/images/arrow.png' className='anno_arrow' style={{ top: mousePosition.y }} />
              </div>
              <div className='annotation'>
                <div className='annotation_header'>Cleverse Annotation:</div>
                <div className='annotation_contents'>
                  {activeAnnotation}
                </div>
                <div className='new_annotation_form hidden'>
                  <form
                    value={newAnnotation}
                    onSubmit={submitNewAnnotation}>
                    <div>
                      <textarea
                        defaultValue='Drop some sweet knowledge bombs'
                        onBlur={e => {
                          setNewAnnotation(e.target.value)
                        }}
                      />
                    </div>
                    <div>
                      <button type='submit'>Save</button>
                    </div>
                  </form>
                </div>
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
