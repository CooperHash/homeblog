export default function isValidate(arr, target) {
  let keys = Object.keys(arr);
  for(let i of keys) {
    if(i == target) {
      arr[i] = true;
    }
    else arr[i] = false;
  }
}