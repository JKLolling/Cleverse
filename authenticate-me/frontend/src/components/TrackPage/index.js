import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import * as trackActions from '../../store/track'

// Other pages
import PageNotFound from '../PageNotFound'
import SongBanner from './SongBanner'
import AnnotationContainer from './AnnotationContainer'
import NewAnnotationForm from './NewAnnotationForm'
import Annotation from './Annotation'

// Styling
import './TrackPage.css'

const DEFAULT_ANNO = 'Looks like this track doesn\'t have a default annotation'

function TrackPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [lyrics, setLyrics] = useState('')

  const [annotationMap, setAnnotationMap] = useState({})
  const [defaultAnnotation, setDefaultAnnotation] = useState(DEFAULT_ANNO)
  const [annotationCoordinates, setAnnotationCoordinates] = useState([])
  const [clientY, setClientY] = useState(null)

  const [highlightedText, setHighlightedText] = useState('')

  const [annotationContent, setAnnotationContent] = useState(null)

  const dispatch = useDispatch()
  const trackData = useSelector(state => state.track)
  const sessionUser = useSelector(state => state.session.user);

  const id = useParams().trackId

  const lyricRef = useRef()
  const newAnnoCords = useRef()

  // Get lyrics from the database
  useEffect(() => {
    dispatch(trackActions.asyncFetchTrack(id))
      .then(() => setIsLoaded(true))
  }, [dispatch])

  // Retrieve the lyrics from our store variable and set the local state
  useEffect(() => {
    if (trackData?.lyrics && isLoaded) {
      setLyrics(trackData.lyrics)
    }
    setDefaultAnnotation(DEFAULT_ANNO)
  }, [trackData, isLoaded])

  useEffect(() => {
    setAnnotationContent(<Annotation activeAnnotation={defaultAnnotation} />)
  }, [defaultAnnotation])



  const isSafeToAdd = (tuple, bank) => {
    let safeToAdd = true
    bank.forEach(annotation_tuple => {
      // Does the highlight start in the middle of an existing annotation?
      if (tuple[0] >= annotation_tuple[0] && tuple[0] <= annotation_tuple[1]) {
        safeToAdd = false
        console.log('not safe', annotation_tuple)
      }
      // Does the highlight end in the middle of an existing annotation?
      else if (tuple[1] >= annotation_tuple[0] && tuple[1] <= annotation_tuple[1]) {
        safeToAdd = false
        console.log('not safe', annotation_tuple)
      }
      // Does the highlight wrap an existing annotation?
      else if (tuple[0] <= annotation_tuple[0] && tuple[1] >= annotation_tuple[1]) {
        safeToAdd = false
        console.log('not safe', annotation_tuple)
      }
    })
    return safeToAdd
  }

  /*
    Highlight coordinates gets called whenever a user highlights new text or when the lyrics change
    This calculates the indices of where the annotation wrappers should go
  */
  // Calculate where the existing annotations should go
  // NB THIS IS ALSO THE FUNCTION THAT DETERMINES WHAT THE DEFAULT ANNO IS
  const createAnnotationCoordinates = () => {
    if (trackData?.Annotations) {

      let storeAnnotations = trackData.Annotations
      const coordinateArray = []
      const annotationsObj = {}

      // Get the start and end indices for every lyric that is annotated
      for (let i = 0; i < storeAnnotations.length; i++) {
        let annotatedLyric = storeAnnotations[i].lyric

        // If the annotaed lyric is null, that means this is the 'default' or 'general' annotation.
        if (!annotatedLyric) {
          setDefaultAnnotation(storeAnnotations[i].annotation)
          continue
        }

        // Link the actual annotations to their lyrics through an object
        // This makes it easier to search for an annotation when you click on a lyric
        annotationsObj[annotatedLyric] = storeAnnotations[i]

        // Adds multiple start/end coordinates if the lyric shows up multiple times
        let index = 0
        while (index > -1) {
          let start = lyrics.indexOf(annotatedLyric, index)
          let end = start + annotatedLyric.length

          // If we actually find the lyric, start searching from the last found location (end) and push the coordinates to the coordinateArray
          if (start > -1) {
            // console.log(annotatedLyric, [start, end])
            coordinateArray.push([start, end])
            index = end
          } else {
            index = -1
          }
        }
      }

      // User highlighted text is handled the same way exisiting annotations are, so this function pulls double duty
      const highlightedTextCoordinates = []
      if (highlightedText) {
        // Find all the occurences of the highlighted lyric
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

        // highlightedTextCoordinates is temporary storage.
        // It holds all the indices of the highlighted lyric, but we need to do other checks before adding this indices to the the Coordinate array
        // NAMELY we need to check iif any of the highlighted indices overlap with prexesting annotation indices
        highlightedTextCoordinates.forEach(highlighted_tuple => {
          if (isSafeToAdd(highlighted_tuple, coordinateArray)) {
            newAnnoCords.current = newAnnoCords.current.push(highlighted_tuple)
            coordinateArray.push(highlighted_tuple)
            presentAnnotationForm()
          }
        })
      }

      // Annotations need to be added from the end to the beginning, so we have to sort all the start indices
      //  we sort it from largest to smallest
      coordinateArray.sort((a, b) => {
        if (a[0] > b[0]) return -1
        return 1
      })
      // used to wrap the appropriate lyrics in annotation-colored spans
      setAnnotationCoordinates(coordinateArray)
      // Used to lookup annotations really quickly
      setAnnotationMap(annotationsObj)
    }
  }
  useEffect(() => {
    createAnnotationCoordinates()
  }, [lyrics, highlightedText])
  // if (trackData?.Annotations?.length && numAnnotations !== trackData.Annotations.length) {
  //   setNumAnnotations(trackData.Annotations.length)
  //   createAnnotationCoordinates()
  // }

  const presentAnnotationForm = () => {
    if (sessionUser) {
      setAnnotationContent(
        <NewAnnotationForm
          highlightedText={highlightedText}
          sessionUser={sessionUser}
          setAnnotationContent={setAnnotationContent}
          setHighlightedText={setHighlightedText}
          newAnnoCords={newAnnoCords}
        >
        </NewAnnotationForm>
      )

      let oldActive = document.querySelector('.active')
      while (oldActive) {
        oldActive.classList.remove('active')
        oldActive = document.querySelector('.active')
      }
    } else {
      setAnnotationContent(<Annotation activeAnnotation={'Please sign in to annotate'} />)
    }
  }

  // Wrap each annotated lyric in a span (aka highlight that lyric)
  const wrapAnnotations = () => {
    // console.log('hi', isLoaded, trackData?.lyrics)
    if (isLoaded && trackData?.lyrics) {

      let node = lyricRef.current

      // The entire lyric div is made as a unit.
      //You can't modify it, you can only delete it and recreate a new one

      // delete the old lyric node if there is one
      while (node.firstChild) node.removeChild(node.firstChild)

      // Create a new node and populate it with the lyrics
      let textNode = document.createTextNode(lyrics)
      node.appendChild(textNode)

      // This is where the span wrapping occurs
      annotationCoordinates.forEach(value => {
        try {

          // Create a range that starts and ends in the lyric node with the start and end indices from
          //   the annotationCoordinates
          let range = document.createRange()
          range.setStart(textNode, value[0])
          range.setEnd(textNode, value[1])

          // if the range is equal to the currently highlighted text, then style the range as 'active'
          // if it's not, then style it as 'highlight'
          const span = document.createElement('span')
          if (range.toString() === highlightedText) {
            span.classList.add('active')
          } else {
            // TEMP
            // span.addEventListener('click', retrieveAnnotation)
            span.classList.add('inactive')
          }

          range.surroundContents(span)
        } catch (error) {

        }
      })
    }
  }
  useEffect(() => {
    wrapAnnotations()
  }, [annotationCoordinates, isLoaded, highlightedText])



  const highlightLyric = (e) => {
    newAnnoCords.current = []

    // Find the last clicked lyric and remove the 'active' class from that lyric's span
    let oldActive = e.target.parentElement.querySelector('.active')
    while (oldActive) {
      oldActive.classList.remove('active')
      oldActive = e.target.parentElement.querySelector('.active')
    }

    if (annotationMap[e.target.innerText]) return clickAnnotatedLyric(e)

    let text = window.getSelection().toString().trim()
    setHighlightedText(text)
    setClientY(e.clientY)

    if (!text) return setAnnotationContent(<Annotation activeAnnotation={defaultAnnotation} />)
  }


  const clickAnnotatedLyric = (e) => {
    e.stopPropagation()

    const lyric = e.target.innerText
    const annotationObj = annotationMap[lyric]
    if (!annotationObj) return


    // Add the active class to all the spans that have the same lyrics
    e.target.classList.add('active')
    let children = e.target.parentElement.children
    for (let index = 0; index < children.length; index++) {
      if (children[index].innerText === e.target.innerText) {
        children[index].classList.add('active')
      }
    }

    setAnnotationContent(<Annotation activeAnnotation={annotationObj.annotation} />)
    setClientY(e.clientY)
  }


  const trackIsValid = !!trackData
  if (isLoaded && !trackIsValid) {
    return <PageNotFound />
  }

  return (
    <>
      {(isLoaded && trackIsValid) && (
        <div>
          <SongBanner isLoaded={isLoaded}></SongBanner>
          <div className='track_lyric_anno_wrapper'>
            <div
              className='track_lyric_wrapper'
              ref={lyricRef}
              onMouseUp={highlightLyric}
            >
            </div>
            <AnnotationContainer
              defaultAnnotation={defaultAnnotation}
              isLoaded={isLoaded}
              clientY={clientY}
              annotationContent={annotationContent}
            />
          </div>
        </div >
      )
      }
    </>
  )
}

export default TrackPage
