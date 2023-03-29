// H5 文本转 svg, svg 转图片

async function textToImg(text, id = Math.random().toString(36).substr(2)) {
  const span = document.createElement('span')
  span.innerHTML = text
  const width = span.offsetWidth + 10
  const svg = createSvg(`#${text}`, width)
  const img = await createImgBySvg(id, `#${text}`, svg, width)
  return img
}

// 使用 imgUrl的src: base64格式的图片地址
const imgUrl = await textToImg('动态标签')
console.log('imgUrl: ', imgUrl)
// <img id="w1rpgg25lxs" alt="#动态标签" src="data:image/svg+xml;chartset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJoZWlnaHQ6IDIycHgiIHZpZXdCb3g9IjAgMCAxMCAyMiI+PHRpdGxlPiPliqjmgIHmoIfnrb48L3RpdGxlPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHRleHQgZm9udC1mYW1pbHk9IlBpbmdGYW5nU0MtUmVndWxhciwgUGluZ0ZhbmcgU0MiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iIzI5YTA2MSI+PHRzcGFuIHg9IjAiIHk9IjE4LjMiPiPliqjmgIHmoIfnrb48L3RzcGFuPjwvdGV4dD48L2c+PC9zdmc+" style="width: 10px; height: 22px; margin-right: 4px;">

/**
 * @desc Dynamically create svg
 * @param {string} str 目标内容
 * @param {number} contentWidth 目标内容宽度
 * @param {number} contentHeight 目标内容高度
 * @returns {object} SVGElement
 */
function createSvg(str, contentWidth, contentHeight = 22) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('style', `height: ${contentHeight}px`)
  svg.setAttribute('viewBox', `0 0 ${contentWidth} ${contentHeight}`)

  const svg_title = document.createElementNS('http://www.w3.org/2000/svg', 'title')
  svg_title.innerHTML = str

  const svg_g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  svg_g.setAttribute('fill', 'none')
  svg_g.setAttribute('fill-rule', 'evenodd')

  const svg_text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  svg_text.setAttribute('font-family', 'PingFangSC-Regular, PingFang SC')
  svg_text.setAttribute('font-size', '14px')
  svg_text.setAttribute('fill', '#29a061')

  const svg_tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
  svg_tspan.setAttribute('x', '0')
  svg_tspan.setAttribute('y', '18.3')
  svg_tspan.innerHTML = str

  svg_text.appendChild(svg_tspan)
  svg_g.appendChild(svg_text)
  svg.appendChild(svg_title)
  svg.appendChild(svg_g)

  return svg
}

/**
 * @desc Create img tag according to a svg element
 * @param {string} str 目标内容
 * @param {string} svg 目标 svg 元素
 * @param {number} contentWidth 目标内容宽度
 * @param {number} contentHeight 目标内容高度
 * @returns {object} HTMLImageElement
 */
function createImgBySvg(id, str, svg, contentWidth, contentHeight = 22) {
  // const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) && !window.MSStream
  // contentWidth = isIOS ? contentWidth + 10 : contentWidth
  const img = document.createElement('img')
  img.id = id
  img.alt = str
  // 构建 svg DOM树 的 XML 字符串, 返回 svg DOM 元素 子树 序列化后的字符串
  const xml_svg = new XMLSerializer().serializeToString(svg)
  const svg_blob = new Blob([xml_svg], { type: 'image/svg+xml;chartset=utf-8' })
  // 这里兼容 ios H5 无法直接读取 blob 的问题 (safari安全问题, 新路由页创建Blob URL, 在返回时会给销毁)
  // 所以使用 base64编码 代替 显示图片
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = function (e) {
      img.src = e.target.result
      img.setAttribute('style', `width: ${contentWidth}px; height: ${contentHeight}px; margin-right: 4px;`)
      resolve(img)
    }
    fileReader.onerror = reject
    fileReader.readAsDataURL(svg_blob)
  }).then((img) => {
    return img
  })
}