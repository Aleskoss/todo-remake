export function setLocalStorage(nameOfStoredValue,valueToStore){
    return localStorage.setItem(nameOfStoredValue,JSON.stringify(valueToStore))
  }
export function getLocalStorage(valueToGet){
    const item = localStorage.getItem(valueToGet)
    return JSON.parse(item)
}