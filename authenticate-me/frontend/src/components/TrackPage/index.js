import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ColorThief from 'colorthief'
import * as trackActions from '../../store/track'
import PageNotFound from '../PageNotFound'
import './TrackPage.css'

function TrackPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [lyrics, setLyrics] = useState('')
  const [annotations, setAnnotations] = useState({})
  const [activeAnnotation, setActiveAnnotation] = useState('')
  const [defaultAnnotation, setDefaultAnnotation] = useState('Looks like this track doesn\'t have a default annotation')

  const [annotationCoordinates, setAnnotationCoordinates] = useState([])
  const [annotationPosition, setannotationPosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const [newAnnotation, setNewAnnotation] = useState('')
  const [highlightedText, setHighlightedText] = useState('')

  const [numAnnotations, setNumAnnotations] = useState(0)

  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()
  const id = useParams().trackId
  const trackData = useSelector(state => state.track)
  const sessionUser = useSelector(state => state.session.user);
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


  // console.log('local', localState)
  // console.log('store', trackData?.track?.Annotations?.length)

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
          if (activeAnnotation === '') {
            setActiveAnnotation(defaultAnnotation)
          }
          continue
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

      const highlightedTextCoordinates = []
      if (highlightedText) {
        let index = 0
        while (index > -1) {
          let start = lyrics.indexOf(highlightedText, index)
          let end = start + highlightedText.length

          // If we actually find the lyric, start searching from the last found location (end) and push the coordinates to the coordinateArray
          if (start > -1) {
            highlightedTextCoordinates.push([start, end])
            index = end
          } else {
            index = -1
          }
        }

        highlightedTextCoordinates.forEach(highlighted_tuple => {
          let safeToAdd = true
          coordinateArray.forEach(annotation_tuple => {
            if (highlighted_tuple[0] >= annotation_tuple[0] && highlighted_tuple[1] <= annotation_tuple[1]) {
              // don't add it cuz it's inside something that's already annotated
              safeToAdd = false
            }
            else if (highlighted_tuple[0] <= annotation_tuple[0] && highlighted_tuple[1] >= annotation_tuple[1]) {
              // don't add it cuz it's wrapping something that's already annotated
              safeToAdd = false
            }
          })
          if (safeToAdd) coordinateArray.push(highlighted_tuple)
        })
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
  useEffect(() => {
    createAnnotationCoordinates()
  }, [lyrics, highlightedText, numAnnotations])
  if (trackData?.track?.Annotations?.length && numAnnotations !== trackData.track.Annotations.length) {
    setNumAnnotations(trackData.track.Annotations.length)
    createAnnotationCoordinates()
  }

  // Wrap each annotated lyric in a span (aka highlight that lyric)
  const wrapAnnotations = () => {
    if (isLoaded && trackData?.track) {
      let node = document.getElementsByClassName('track_lyric_wrapper')[0]

      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }

      let textNode = document.createTextNode(lyrics)
      node.appendChild(textNode)

      annotationCoordinates.forEach(value => {
        try {
          let range = document.createRange()
          range.setStart(textNode, value[0])
          range.setEnd(textNode, value[1])

          const span = document.createElement('span')

          if (range.toString() === highlightedText) {
            span.classList.add('active')
          } else {
            span.addEventListener('click', retrieveAnnotation)
            span.classList.add('highlight')
          }

          range.surroundContents(span)

        } catch (error) {

        }
      })
    }
  }
  useEffect(() => {
    wrapAnnotations()
  }, [annotationCoordinates])

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

    // Prevents any nesting of sannotations
    if (start.parentElement.className !== 'track_lyric_wrapper' || end.parentElement.className !== 'track_lyric_wrapper') {
      return
    }

    selection.removeAllRanges();
    let range = document.createRange()
    range.setStart(start, startOffset)
    range.setEnd(end, endOffset)
    selection.addRange(range)


    setHighlightedText(range.toString())
    createAnnotationCoordinates()

    // Bring up that annotation form
    if (sessionUser) {
      let form = document.getElementsByClassName('new_annotation_form')[0]
      form.classList.remove('hidden')

      let header = document.getElementsByClassName('annotation_header')[0]
      header.classList.add('hidden')

      let contents = document.getElementsByClassName('annotation_contents')[0]
      contents.classList.add('hidden')

      let oldActive = document.querySelector('.active')
      while (oldActive) {
        oldActive.classList.remove('active')
        oldActive = document.querySelector('.active')
      }
    } else {
      setActiveAnnotation('Please sign in to annotate')
    }

    setAnnotationWrapper(e)
  }

  const submitNewAnnotation = async (e) => {
    e.preventDefault()

    e.target.value = 'hello'

    const newErrors = []
    if (!highlightedText.length) {
      newErrors.push('You must highlight a lyric to annotate')
    } else if (!newAnnotation?.length) {
      newErrors.push('You cannot submit an empty annotation')
    }
    else {
      setErrors([])
      let data = {
        annotation: newAnnotation,
        lyric: highlightedText,
        userId: sessionUser.id,
        trackId: trackData.track.id
      }
      const res = await dispatch(trackActions.asyncSaveAnnotation(data))
    }
    setErrors(newErrors)
    setActiveAnnotation(newAnnotation)

    let form = document.getElementsByClassName('new_annotation_form')[0]
    form.classList.add('hidden')

    let header = document.getElementsByClassName('annotation_header')[0]
    header.classList.remove('hidden')

    let contents = document.getElementsByClassName('annotation_contents')[0]
    contents.classList.remove('hidden')

    setHighlightedText('')
  }

  const deleteAnnotation = async (e) => {
    e.preventDefault()
    console.log('delete')
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
    while (oldActive) {
      oldActive.classList.remove('active')
      oldActive = document.querySelector('.active')
    }
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
    while (oldActive) {
      oldActive.classList.remove('active')
      oldActive = e.target.parentElement.querySelector('.active')
    }

    e.target.classList.add('active')

    let children = e.target.parentElement.children
    for (let index = 0; index < children.length; index++) {
      if (children[index].innerText === e.target.innerText) {
        children[index].classList.add('active')
      }
    }


    let annotation = annotationObj.annotation

    annotation = annotation.replaceAll('          ', '')
    annotation = annotation.replaceAll('        ', '')
    annotation.trimLeft()

    setActiveAnnotation(annotation)
    setAnnotationWrapper(e)
  }

  // Set the position of the box that contains the annotations and retrigger the annomation to bring it into view
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
                    onSubmit={submitNewAnnotation}
                    className='new_annotation_form_innerDiv'>
                    <ul className='new_annotation_errors'>
                      {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div >
                      <textarea
                        className='new_annotation_input'
                        defaultValue='Drop some sweet knowledge bombs'
                        onBlur={e => {
                          setNewAnnotation(e.target.value)
                          e.target.value = 'Drop some sweet knowledge bombs'
                        }}
                        onFocus={e => e.target.value = ''}
                      />
                    </div>
                    <div>
                      <button
                        type='submit'
                        className='new_annotation_button'
                      >Save</button>
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
