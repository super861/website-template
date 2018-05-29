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
        dispatch(loginSucces(data));
      }
      else {
        dispatch(loginFailure())
      }
    }).catch(error => {
      console.log(error)
    });
  };
}

export const register = (_data) => {
  return function(dispatch) {
    return DataApi.register(_data).then(data => {
      if(data.message === "success") {
        dispatch(login(_data));
      }
      else {
        console.log(data)
      }
    }).catch(error => {
      console.log(error)
    });
  };
}

const loginSucces = (_data) => {
  return  {
    type: types.LOGIN_UPDATE,
    data: {
      status: 'LOGIN_SUCCESFULL',
      error: '',
      account: {
        username: _data.username
      }
    }
  }
}

const loginFailure = () => {
  return {
    type: types.LOGIN_UPDATE,
    data: {
      status: 'LOGIN_UNSUCCESFULL',
      error: 'username and/or password are incorrect.'
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
