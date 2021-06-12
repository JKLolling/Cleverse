import React from 'react'

const Annotation = ({ activeAnnotation }) => {
  return (
    <>
      <div className='annotation_header'>Cleverse Annotation:</div>
      <div className='annotation_contents'>
        {activeAnnotation}
      </div>
    </>
  )
}

export default Annotation
