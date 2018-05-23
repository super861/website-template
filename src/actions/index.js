import DataApi from '../api/DataApi';
import * as types from './actionTypes';

export const loadData = () => {
  return function(dispatch) {
      //dispatch(loadDataProgress())
      return DataApi.getAllData().then(data => {
        dispatch(loadDataSucces(data));
      }).catch(error => {
        throw(error);
      });
  };
}

// export function loadDataSucces(data) {
//   return {type: types.LOAD_DATA_SUCCES, data}
// }

export const loadDataSucces = data => {
  return {
    type: types.LOAD_DATA_SUCCES,
    data
  }
};
