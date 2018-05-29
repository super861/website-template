import DataApi from '../api/DataApi';
import * as types from './actionTypes';

export const loadData = () => {
  return function(dispatch) {
      //dispatch(loadDataProgress())
      return DataApi.getAllData().then(data => {
        console.log('in action', data)
        dispatch(loadDataSucces(data));
      }).catch(error => {
        console.log(error)
      });
  };
}

export const login = (_data) => {
  return function(dispatch) {

    return DataApi.login(_data).then(data => {
      if(data.message === "succes") {
        dispatch(loginSucces());
      }
      else {
        dispatch(loginFailure())
      }
    }).catch(error => {
      console.log(error)
    });
  };
}

const loginSucces = () => {
  return  {
    type: types.LOGIN_SUCCES,
    status: {
      logged: true
    }
  }
}

const loginFailure = () => {
  return {
    type: types.LOGIN_FAILURE,
    status: {
      logged: false
    }
  }
}

export const loadDataSucces = data => {
  console.log('loadDataScuces', data)
  return {
    type: types.LOAD_DATA_SUCCES,
    data
  }
};
