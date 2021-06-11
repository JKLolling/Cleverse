import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as trackActions from '../../../store/track'

import Annotation from '../Annotation'


const NewAnnotationForm = ({ sessionUser, highlightedText, setHighlightedText, setAnnotationContent, safeHighlightedCoordinates}) => {
  const dispatch = useDispatch()
  const trackData = useSelector(store => store.track)

  const [errors, setErrors] = useState([])
  const [newAnnotation, setNewAnnotation] = useState()
  const [loading, setLoading] = useState(false)

  console.log('on the new annotation form', safeHighlightedCoordinates)
  const submitNewAnnotation = async (e) => {
    let mounted = true

    e.preventDefault()

    let newErrors = []
    if (!highlightedText.length) {
      newErrors.push('You must highlight a lyric to annotate')
    } else if (!newAnnotation?.length) {
      newErrors.push('You cannot submit an empty annotation')
    }
    else {
      let promise_arr = safeHighlightedCoordinates.map(async tuple => {
        let data = {
          annotation: newAnnotation,
          lyric: highlightedText,
          userId: sessionUser.id,
          trackId: trackData.id,
          startIndex: tuple[0],
          endIndex: tuple[1]
        }
        return dispatch(trackActions.asyncSaveAnnotation(data))
      });
      Promise.all(promise_arr).then( () => {
        dispatch(trackActions.asyncFetchTrack(trackData.id))
      })
    }

    if (mounted){
      setErrors(newErrors)
      if (newErrors.length == 0){
        setHighlightedText('')
        setAnnotationContent(<Annotation activeAnnotation={newAnnotation} />)
      }
    }


    return function cleanup() {
      mounted = false
    }
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
          {loading && (
            <div>Loading</div>
          )}
          {!loading && (
            <button
              type='submit'
              className='new_annotation_button'>
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default NewAnnotationForm
