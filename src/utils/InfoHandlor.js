export default function handlerInfo(str) {
  if(str.length > 40) {
    return str.substring(0,20);
  }
}