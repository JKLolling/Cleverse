import React from 'react'

const NewAnnotationForm = () => {
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
