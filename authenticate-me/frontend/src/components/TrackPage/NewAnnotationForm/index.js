import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as trackActions from '../../../store/track'

import Annotation from '../Annotation'


const NewAnnotationForm = ({ sessionUser, highlightedText, setHighlightedText, setAnnotationContent, newAnnoCords }) => {
  const dispatch = useDispatch()
  const trackData = useSelector(store => store.track)

  const [errors, setErrors] = useState([])
  const [newAnnotation, setNewAnnotation] = useState()
  const [loading, setLoading] = useState(false)


  const submitNewAnnotation = async (e) => {
    e.preventDefault()

    const newErrors = []
    if (!highlightedText.length) {
      newErrors.push('You must highlight a lyric to annotate')
    } else if (!newAnnotation?.length) {
      newErrors.push('You cannot submit an empty annotation')
    }
    else {
      setErrors([])
      console.log(newAnnoCords.current)
      return
      // newAnnoCords.current.forEach(tuple => {
      // console.log(tuple)
      // let data = {
      //   annotation: newAnnotation,
      //   lyric: highlightedText,
      //   userId: sessionUser.id,
      //   trackId: trackData.id,

      // }
      // await dispatch(trackActions.asyncSaveAnnotation(data))
      // });
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
            onChange={() => {
              setLoading(true)
              setTimeout(() => {
                setLoading(false)
              }, 1400)
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
