
  export function stashLocally(name, data) {
    return window.localStorage.setItem(name, JSON.stringify(data));
  }

  export function grabFromStorage(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }
