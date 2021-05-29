import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AnnotationContainer = ({ isLoaded, defaultAnnotation, setActiveAnnotation, activeAnnotation, clientY, annotationContent }) => {
  const [annotationPosition, setannotationPosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [newAnnotation, setNewAnnotation] = useState('')
  const [errors, setErrors] = useState([])

  const trackData = useSelector(state => state.track);
  const sessionUser = useSelector(state => state.session.user);


  // Load the default annotation at the beginning
  useEffect(() => {
    if (trackData && isLoaded) {
      displayDefaultAnnotation()
    }
  }, [isLoaded])

  const displayDefaultAnnotation = () => {
    const wrapper = document.getElementsByClassName('track_anno_wrapper')[0]
    wrapper.classList.add('display')
    setannotationPosition({ x: 0, y: 0 })
    setMousePosition({ x: 0, y: 10000 })
    setActiveAnnotation(defaultAnnotation)

    let oldActive = document.querySelector('.active')
    while (oldActive) {
      oldActive.classList.remove('active')
      oldActive = document.querySelector('.active')
    }
  }



  // Set the position of the box that contains the annotations and retrigger the annomation to bring it into view
  useEffect(() => {
    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    yPosition -= 300
    if (yPosition < 0) yPosition = 0

    let temp = (clientY - 975)
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
  }, [clientY])

  return (
    <div className='track_anno_wrapper' style={{ top: annotationPosition.y }}>
      <div className='anno_arrow_wrapper'>
        <img src='/images/arrow.png' className='anno_arrow' style={{ top: mousePosition.y }} />
      </div>
      <div className='annotation'>
        {annotationContent}
      </div>
    </div>
  )
}

export default AnnotationContainer
