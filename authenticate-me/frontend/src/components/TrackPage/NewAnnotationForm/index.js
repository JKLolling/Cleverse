import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as trackActions from '../../../store/track'

import Annotation from '../Annotation'


const NewAnnotationForm = ({ sessionUser, highlightedText, setHighlightedText, setAnnotationContent }) => {
  const dispatch = useDispatch()
  const trackData = useSelector(store => store.track)

  const [errors, setErrors] = useState([])
  const [newAnnotation, setNewAnnotation] = useState()


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
        trackId: trackData.id
      }
      const res = await dispatch(trackActions.asyncSaveAnnotation(data))
      setAnnotationContent(<Annotation activeAnnotation={newAnnotation} />)
      setHighlightedText('')
    }
    setErrors(newErrors)
  }


  return (
    <div className='new_annotation_form'>
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
  )
}

export default NewAnnotationForm
