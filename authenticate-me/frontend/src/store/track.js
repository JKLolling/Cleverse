import { csrfFetch } from './csrf'

const GET_TRACK = 'track/GET_TRACK'
const GET_TRACKLIST = 'track/GET_TRACKLIST'

const getTrack = (trackData) => {
  return {
    type: GET_TRACK,
    trackData
  }
}

const getTrackList = (trackData) => {
  return {
    type: GET_TRACKLIST,
    trackData
  }
}

export const asyncFetchTrackList = () => async (dispatch) => {
  const res = await csrfFetch(`/api/tracks/`)
  const data = await res.json()

  dispatch(getTrackList(data.tracks))
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
    case GET_TRACKLIST:
      return {
        ...action.trackData
      }
    default:
      return state
  }
}

export default trackReducer
