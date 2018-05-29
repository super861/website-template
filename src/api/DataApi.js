class DataApi {
  static getAllData() {
    return fetch('http://[::1]/cup/index.php/api/projectsApi/view/1').then(response => {
      return response.json();
    }).catch(error => {
      console.log(error)
    });
  };

  static login(data) {
    return fetch('http://[::1]/cup/index.php/api/usersApi/login/', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => {
      return res.json();
    }).catch(err => {
      console.log(err)
    });
  };

  static register(data) {
    return fetch('http://[::1]/cup/index.php/api/usersApi/register/', {
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
