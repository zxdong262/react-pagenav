# react-pagenav

[![Travis][build-badge]][build] [![Codecov][codecov-badge]][codecov]

react pagenav component

## doc/demo
visit [http://html5beta.com/apps/react-pagenav.html](http://html5beta.com/apps/react-pagenav.html)

## get
```bash
npm install react-pagenav

#or
bower install react-pagenav

```

## use
```jsx

//baisc es6+
import React, { Component, PropTypes } from 'react'
import ReactPagenav from 'react-pagenav'

export default class App extends Component {

    state = {
        page: 1
        ,total: 300
        ,pageSize: 10
        ,maxLink: 5

        //optional pagenav unit render, must not be arrow function
        ,unitRender: function(unit, index) { ... }

        //optional pagenav render, replace default render function
        //fully customize your pagenav html and function
        ,render: (units, props) => { ... }
    }

    constructor(props) {
        super(props)
    }

    handleClick = (page, url, e) => {
        this.setState({ page: page })
    }
    
    render() {

        var createPageUrl = function(unit) {
            return return unit.page  === 1?'':'#p=' + unit.page
        }

        return (
            <div>
                <ReactPagenav {...this.state} onLinkClick={this.handleClick.bind(this)} />
            </div>
        )

    }
}

//in a global or commonjs/amd env, might need use exports.default
var ReactPagenav = window.ReactPagenav.default

//or
var ReactPagenav = require('react-pagenv').default
```


## settings
```javascript

//ReactPagenav default
static default = {
    page: 1
    ,total: 0
    ,pageSize: 10
    ,prevHtml: '«'
    ,nextHtml: '»'
    ,prevSrHtml: 'Previous' //for screen reader
    ,nextSrHtml: 'Next' //for screen reader
    ,dotsHtml: '...'
    ,createPageUrl: function(unit) {
        return unit.page  === 1?'':'#p=' + unit.page
    }
    ,lang: {
			total: 'total'
		}
}

import ReactPagenav from 'react-pagenav'
//change default
ReactPagenav.default.prevHtml = '<'

```

### style it, these example css is from bootstrap4 for default render
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.sr-only-focusable:active, .sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
.m-r-1 {
    margin-right: 1rem!important;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: .25rem;
}

.page-item {
  display: inline;
}

.page-item:first-child .page-link {
  margin-left: 0;
  border-top-left-radius: .25rem;
  border-bottom-left-radius: .25rem;
}

.page-item:last-child .page-link {
  border-top-right-radius: .25rem;
  border-bottom-right-radius: .25rem;
}

.page-item.active .page-link, .page-item.active .page-link:focus, .page-item.active .page-link:hover {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: #0275d8;
  border-color: #0275d8;
}

.page-item.disabled .page-link, .page-item.disabled .page-link:focus, .page-item.disabled .page-link:hover {
  color: #818a91;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}

.page-link {
  position: relative;
  float: left;
  padding: .5rem .75rem;
  margin-left: -1px;
  line-height: 1.5;
  color: #0275d8;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}

.page-link:focus, .page-link:hover {
  color: #014c8c;
  background-color: #eceeef;
  border-color: #ddd;
}

.pagination-lg .page-link {
  padding: .75rem 1.5rem;
  font-size: 1.25rem;
  line-height: 1.333333;
}

.pagination-lg .page-item:first-child .page-link {
  border-top-left-radius: .3rem;
  border-bottom-left-radius: .3rem;
}

.pagination-lg .page-item:last-child .page-link {
  border-top-right-radius: .3rem;
  border-bottom-right-radius: .3rem;
}

.pagination-sm .page-link {
  padding: .275rem .75rem;
  font-size: .875rem;
  line-height: 1.5;
}

.pagination-sm .page-item:first-child .page-link {
  border-top-left-radius: .2rem;
  border-bottom-left-radius: .2rem;
}

.pagination-sm .page-item:last-child .page-link {
  border-top-right-radius: .2rem;
  border-bottom-right-radius: .2rem;
}

.pager {
  padding-left: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  list-style: none;
}

.pager::after {
  display: table;
  clear: both;
  content: "";
}

.pager li {
  display: inline;
}

.pager li > a,
.pager li > span {
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
}

.pager li > a:focus, .pager li > a:hover {
  text-decoration: none;
  background-color: #eceeef;
}

.pager .disabled > a, .pager .disabled > a:focus, .pager .disabled > a:hover {
  color: #818a91;
  cursor: not-allowed;
  background-color: #fff;
}

.pager .disabled > span {
  color: #818a91;
  cursor: not-allowed;
  background-color: #fff;
}

.pager-next > a,
.pager-next > span {
  float: right;
}

.pager-prev > a,
.pager-prev > span {
  float: left;
}
```

## test/dev
```bash
git clone https://github.com/zxdong262/react-pagenav.git
cd react-pagenav
npm install

# develop
npm start

# test
npm run test

```

## License
MIT

[build-badge]: https://img.shields.io/travis/zxdong262/react-pagenav/master.svg?style=flat-square
[build]: https://travis-ci.org/zxdong262/react-pagenav
[codecov-badge]: https://img.shields.io/codecov/c/github/zxdong262/react-pagenav/dev.svg?style=flat-square
[codecov]: https://codecov.io/gh/zxdong262/react-pagenav