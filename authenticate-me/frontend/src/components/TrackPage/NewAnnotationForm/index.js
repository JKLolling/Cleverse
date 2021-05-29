import React from 'react'

const NewAnnotationForm = () => {

  // const submitNewAnnotation = async (e) => {
  //   e.preventDefault()

  //   e.target.value = 'hello'

  //   const newErrors = []
  //   if (!highlightedText.length) {
  //     newErrors.push('You must highlight a lyric to annotate')
  //   } else if (!newAnnotation?.length) {
  //     newErrors.push('You cannot submit an empty annotation')
  //   }
  //   else {
  //     setErrors([])
  //     let data = {
  //       annotation: newAnnotation,
  //       lyric: highlightedText,
  //       userId: sessionUser.id,
  //       trackId: trackData.id
  //     }
  //     const res = await dispatch(trackActions.asyncSaveAnnotation(data))
  //   }
  //   setErrors(newErrors)
  //   setActiveAnnotation(newAnnotation)

  //   let form = document.getElementsByClassName('new_annotation_form')[0]
  //   form.classList.add('hidden')

  //   let header = document.getElementsByClassName('annotation_header')[0]
  //   header.classList.remove('hidden')

  //   let contents = document.getElementsByClassName('annotation_contents')[0]
  //   contents.classList.remove('hidden')

  //   setHighlightedText('')
  // }


  return (
    <div className='new_annotation_form'>
      <form
        // value={newAnnotation}
        // onSubmit={submitNewAnnotation}
        className='new_annotation_form_innerDiv'>
        <ul className='new_annotation_errors'>
          {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        </ul>
        <div >
          <textarea
            className='new_annotation_input'
            defaultValue='Drop some sweet knowledge bombs'
            onBlur={e => {
              // setNewAnnotation(e.target.value)
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
