const React = require('react')
const ReactDOM = require('react-dom')
const ReactCopyButtonWrapper = require('../src/react-copy-button-wrapper')

class ExampleApp extends React.Component {
  render () {
    return (<div>
      <h1>Copy Static Text</h1>
      <ReactCopyButtonWrapper text='test'>
        <button>Copy "test"</button>
      </ReactCopyButtonWrapper>
      <h1>Copy Text from input</h1>
      <input type='text' id='copyText' defaultValue='test text'/>
      <ReactCopyButtonWrapper selector='#copyText'>
        <button>Copy from textbox</button>
      </ReactCopyButtonWrapper>
      <h1>Alert copy text</h1>
      <input type='text' id='copyTextAlert' defaultValue='alert message'/>
      <ReactCopyButtonWrapper selector='#copyTextAlert' onAfterCopy={(event) => {
        alert(event.clipboardData.getData('text/plain'))
      }}>
        <button>Copy from textbox</button>
      </ReactCopyButtonWrapper>
    </div>)
  }
}

ReactDOM.render(<ExampleApp />, document.getElementById('main'))
