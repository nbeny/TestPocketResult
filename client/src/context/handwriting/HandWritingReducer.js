import {
  GET_HANDWRITING_ID_SUCCESS,
  GET_HANDWRITING_ID_FAIL,
  GET_HANDWRITINGS_SUCCESS,
  GET_HANDWRITINGS_FAIL,
  GET_RENDER_PNG_SUCCESS,
  GET_RENDER_PNG_FAIL,
  GET_RENDER_PDF_SUCCESS,
  GET_RENDER_PDF_FAIL
} from './Types';

export default (state, action) => {
  switch (action.type) {
    case GET_HANDWRITING_ID_SUCCESS:
      return {
        ...state
      };
    case GET_HANDWRITING_ID_FAIL:
      return {
        ...state
      };
    case GET_HANDWRITINGS_SUCCESS:
      return {
        ...state,
        handwritings: action.payload
      };
    case GET_HANDWRITINGS_FAIL:
      return {
        ...state,
        handwritings: null
      };
    case GET_RENDER_PNG_SUCCESS:
      return {
        ...state
      };
    case GET_RENDER_PNG_FAIL:
      return {
        ...state
      };
    case GET_RENDER_PDF_SUCCESS:
      return {
        ...state
      };
    case GET_RENDER_PDF_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
};
