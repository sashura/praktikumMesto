export default class API {
  constructor(authorization) {
    this.authorization = authorization;
    this.group = authorization.group;
    this.serverUrl = authorization.serverUrl;
    this.token = authorization.token
  }

  getInitialCards() {
    return fetch((this.serverUrl + this.group + '/cards'), {
      headers: { 
        authorization: this.token
      },
    })
      .then(res => res.json())
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  updateUserInfoApi(username, userjob) {    //обновляет на сервере информацию о пользователе
    return fetch((this.serverUrl + this.group + '/users/me'), {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        about: userjob
      })
    })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }


  getUserInfoApi() { //берет информацию о пользователе с сервера
    return fetch((this.serverUrl + this.group + '/users/me'), {
      headers: {
        authorization: this.token
      }
    })
    .then(res => res.json())
  }


  delete(id) {
    fetch((this.serverUrl + this.group + `/cards/${id}`), {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
    })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }



  postCard(link, name) {
    return fetch((this.serverUrl + this.group + '/cards'), {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  newAvatar(avatar) {
    fetch((this.serverUrl + this.group + '/users/me/avatar'), {
      method: 'PATCH',
      headers: {
        authorization: authorization.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
  }


}