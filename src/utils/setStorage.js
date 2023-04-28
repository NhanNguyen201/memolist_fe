// eslint-disable-next-line
export default (item, key, value) => {
    let storageItem = localStorage.getItem(item);
    let parseItem = JSON.parse(storageItem);
    parseItem[key] = value;
    localStorage.setItem(item, JSON.stringify(parseItem));
}