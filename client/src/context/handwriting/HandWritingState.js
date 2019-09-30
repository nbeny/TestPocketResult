import React, { useReducer } from 'react';
import axios from 'axios';
import HandWritingContext from './HandWritingContext';
import HandWritingReducer from './HandWritingReducer';

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

const HandWritingState = props => {
  const initialState = {
    handwriting_id: null,
    handwritings: null,
    render_png: null,
    render_pdf: null
  };

  const [state, dispatch] = useReducer(HandWritingReducer, initialState);

  // get_handwriting_id
  const get_handwriting_id = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.get('/api/handwriting/id', formData, config);

      dispatch({
        type: GET_HANDWRITING_ID_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_HANDWRITING_ID_FAIL,
        payload: err
      });
    }
  };

  // get_handwritings
  const get_handwritings = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.get('/api/handwriting', formData, config);

      dispatch({
        type: GET_HANDWRITINGS_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_HANDWRITINGS_FAIL,
        payload: err
      });
    }
  };

  // get_render_png
  const get_render_png = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.get('/api/handwriting/png', formData, config);

      dispatch({
        type: GET_RENDER_PNG_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_RENDER_PNG_FAIL,
        payload: err
      });
    }
  };

  // get_render_pdf
  const get_render_pdf = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.get('/api/handwriting/pdf', formData, config);

      dispatch({
        type: GET_RENDER_PDF_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_RENDER_PDF_FAIL,
        payload: err
      });
    }
  };

  return (
    <HandWritingContext.Provider
      value={{
        handwriting_id: state.handwriting_id,
        handwritings: state.handwritings,
        render_png: state.render_png,
        render_pdf: state.render_pdf,

        get_handwriting_id,
        get_handwritings,
        get_render_png,
        get_render_pdf
      }}
    >
      {props.children}
    </HandWritingContext.Provider>
  );
};

export default HandWritingState;
