var React = require('react');
var ReactDOM = require('react-dom');

require('./public/style/main');

var GalleryApp = require('./components/GalleryApp');

ReactDOM.render(<GalleryApp />,document.querySelector('#content'))
