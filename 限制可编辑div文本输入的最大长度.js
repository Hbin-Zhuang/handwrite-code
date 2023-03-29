/**
 * @desc Litmited the contenteditable div maxlength
 * @param {number} targetLength
 * @param {number} maxLength
 * @returns {undefined}
 */
 export function onCompositionend(targetLength, maxLength) {
  const diff = targetLength - maxLength
  if (diff > 0) {
    const range = document.createRange()
    const sel = window.getSelection()
    const offset = sel.anchorOffset
    const node = sel.anchorNode
    const text = node.textContent
    range.selectNodeContents(node)
    sel.removeAllRanges()
    setTimeout(() => {
      sel.addRange(range)
      sel.extend(node, offset)
      document.execCommand('delete', false)
      document.execCommand('insertText', false, text.substring(0, offset - diff))
    }, 0)
  }
}