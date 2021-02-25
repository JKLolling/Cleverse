import { csrfFetch } from './csrf'

const GET_TRACK = 'track/GET_TRACK'

const getTrack = (trackData) => {
  return {
    type: GET_TRACK,
    trackData
  }
}

export const asyncFetchTrack = (trackId) => async (dispatch) => {
  let found = true
  const res = await csrfFetch(`/api/tracks/${trackId}`)
    .catch(err => {
      found = false
    })

  let data
  if (found) {
    data = await res.json()
  } else {
    data = { track: null }
  }
  // console.log(data.track.Annotations)
  dispatch(getTrack(data))
  return data
}

const trackReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TRACK:
      return {
        ...action.trackData
      }
    default:
      return state
  }
}

export default trackReducer
