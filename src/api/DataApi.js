class DataApi {
  static getAllData() {
    return fetch('http://192.168.1.203/regg/index.php/api/projectsApi/view/1').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default DataApi;
