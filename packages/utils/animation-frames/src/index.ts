let requestAnimationFrame: ((callback: FrameRequestCallback) => number) &
  ((callback: FrameRequestCallback) => number) = callback => window.setTimeout(callback, 1000 / 60)
let cancelAnimationFrame: ((handle: number) => void) & ((handle: number) => void) = id =>
  clearTimeout(id)

if (window.requestAnimationFrame) {
  requestAnimationFrame = window.requestAnimationFrame
  cancelAnimationFrame = window.cancelAnimationFrame
}

export default {
  requestAnimationFrame,
  cancelAnimationFrame,
}
