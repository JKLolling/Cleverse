import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import * as trackActions from '../../store/track'

function PageNotFound() {
  return (
    <div>
      Lil Bo Peep says page not found
    </div>
  )
}

export default PageNotFound
