export class XHR {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(url = '') {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.baseUrl}/${url}`);
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          resolve(res);
        } else if (xhr.status !== 200) {
          reject(xhr.status);
        }
      });
      xhr.send();
    });
  }
}
