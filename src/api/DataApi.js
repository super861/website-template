class DataApi {
  static getAllData() {
    return fetch('http://192.168.1.203/api/projectsApi/view/1').then(response => {
      return response.json();
    }).catch(error => {
      console.log(error)
    });
  };

  static login(data) {
    return fetch('http://192.168.1.203/api/usersApi/login/', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => {
      return res.json();
    }).catch(err => {
      console.log(err)
    });
  };
}

export default DataApi;
