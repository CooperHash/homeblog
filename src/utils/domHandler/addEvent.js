export default function addEvent(dom, e, cb) {
  dom.addEventListener(e, cb, false)
}