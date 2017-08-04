/*
 * @property {string} text - text to copy
 * @property {string} html - ** Unrecommended ** text to copy as html (support only ZeroClipboard because document.execCommand cannot specify minetype)
 * @property {string} selector - selector element has text to copy
 * @property {element} domElement - element has text to copy
 * @property {function} onAfterCopy - function triggered after copy
 * @property {function} onErrorCopy - function triggered error on copying
 */
const React = require('react')
const ReactZeroClipboard = require('react-zeroclipboard')
const select = require('select')
const browser = require('bowser')
const PropTypes = require('prop-types')

class ReactCopyButtonWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.onAfterCopy = this.props.onAfterCopy || (() => {})
    this.onErrorCopy = this.props.onErrorCopy || (() => {})
  }

  supportedClipboardApi () {
    if (browser.safari) return false
    return true
  }

  getCopyText () {
    if (this.props.text) return this.props.text
    const targetElm = this.props.domElement || document.querySelector(this.props.selector)
    return select(targetElm)
  }

  renderUsingZeroClipboard () {
    return (
      <ReactZeroClipboard
        getText={this.getCopyText.bind(this)}
        html={this.props.html}
        onAfterCopy={this.onAfterCopy.bind(this)}
        onErrorCopy={this.onErrorCopy.bind(this)}
      >
        {this.props.children}
      </ReactZeroClipboard>
    )
  }

  generateCopyEvent (data, dataType) {
    dataType = dataType || 'text/plain'
    try {
      return new window.ClipboardEvent('copy', {dataType, data})
    } catch (e) {
      // Not support ClipboardEvent
      // Generate Event Instance like ClipboardEvent
      const event = new window.Event('copy')
      Object.assign(event, {
        dataType,
        data,
        clipboardData: {
          getData: (minetype) => {
            if (minetype === dataType) {
              return data
            }
            return ''
          },
          types: [dataType]
        }
      })
      return event
    }
  }

  execCopy () {
    let selectedText = ''
    let result
    if (browser.msie && browser.version < 9) {
      try {
        selectedText = this.getCopyText()
        window.clipboardData.setData('text', selectedText)
      } catch (e) {
        window.prompt('Copy from here', selectedText)
      }
    } else {
      const fakeElement = document.createElement('textarea')
      fakeElement.style.fontSize = '12pt'
      fakeElement.style.border = '0'
      fakeElement.style.padding = '0'
      fakeElement.style.margin = '0'
      fakeElement.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px'
      fakeElement.style.position = 'fixed'
      fakeElement.style[ document.documentElement.getAttribute('dir') === 'rtl' ? 'right' : 'left' ] = '-9999px'
      fakeElement.setAttribute('readonly', '')
      fakeElement.value = this.getCopyText()
      document.body.appendChild(fakeElement)
      selectedText = select(fakeElement)
      result = document.execCommand('copy')
      window.getSelection().removeAllRanges()
      document.body.removeChild(fakeElement)
    }
    const copyEvent = this.generateCopyEvent(selectedText)
    if (result) {
      this.onAfterCopy(copyEvent)
    } else {
      this.onErrorCopy(copyEvent)
    }
  }

  render () {
    if (!this.supportedClipboardApi()) {
      return this.renderUsingZeroClipboard()
    }
    const {text, html, selector, domElement, onAfterCopy, onErrorCopy, children, ...props} = this.props
    const elem = React.Children.only(children)
    return React.cloneElement(elem, {
      ...props,
      onClick: this.execCopy.bind(this)
    })
  }
}
ReactCopyButtonWrapper.displayName = 'ReactCopyButtonWrapper'
ReactCopyButtonWrapper.propTypes = {
  text: PropTypes.string,
  html: PropTypes.string,
  selector: PropTypes.string,
  domElement: PropTypes.object,
  onAfterCopy: PropTypes.func,
  onErrorCopy: PropTypes.func,
  children: PropTypes.node
}

module.exports = ReactCopyButtonWrapper
