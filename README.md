# react-copy-button-wrapper

Component Wrapper for Copy to Clipboard Button with React

## Usage

`npm install react-copy-button-wrapper`

### Example

Please look at `/example` directory.

Demo page is here: http://pastak.github.io/react-copy-button-wrapper/example/example.html

## How works

### Modern Browsers

Firefox, Chrome, Opera, IE9+ works with [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) and [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)

### Safari

It works with [react-zeroclipboard](https://github.com/brigand/react-zeroclipboard) which is relies on [zeroclipboard](https://github.com/zeroclipboard/zeroclipboard).

It depends on Flash!!!!!!!!!!!!

### < IE9

It works with [`window.clipboardData.setData`](https://msdn.microsoft.com/en-us/library/ms535220(v=vs.85).aspx)

## Motivation

Clipboard API was comming to modern browsers and [clipboard.js](http://zenorocha.github.io/clipboard.js/) is great solution. However Safari and old browsers don't support yet.

Zeroclipboard is solution for all browsers but it's not better because depends on flash...

And some react components for copy buttons ( for example [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard) [react-clipboard](https://github.com/nihey/react-clipboard) ) have only support for modern browsers.

This component's goal is that works with modern browsers and safari and old-IE.
