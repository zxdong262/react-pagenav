
import React, { Component, PropTypes } from 'react'

class ReactPagenav extends Component {

	static propTypes = {
		page: PropTypes.number
		,total: PropTypes.number
		,pageSize: PropTypes.number
		,maxLink: PropTypes.number
		,onLinkClick: PropTypes.func
		,unitRender: PropTypes.func
		,render: PropTypes.func
		,lang: PropTypes.object
		,createPageUrl: PropTypes.func
	}

	static default = {
		page: 1
		,total: 0
		,pageSize: 10
		,prevHtml: '«'
		,nextHtml: '»'
		,prevSrHtml: 'Previous'
		,nextSrHtml: 'Next'
		,dotsHtml: '...'
		,createPageUrl: function(unit) {
			return unit.page  === 1?'#':'#p=' + unit.page
		}
		,lang: {
			total: 'total'
		}
		,buildUnits(props) {

			let option = ReactPagenav.default
			let page = props.page || option.page
			let pageSize = props.pageSize || option.pageSize
			let total = props.total || option.total
			let maxLink = props.maxLink > 5 ? props.maxLink : 5

			let linksCount = Math.ceil(total/pageSize)

			if(page > linksCount) page = linksCount + 0

			let hasPrev = page > 1
			let hasNext = page < linksCount
			let realMaxLink = maxLink > linksCount?linksCount:maxLink
			let len1, len2, len3, shouldInsertDots12, shouldInsertDots23
			let len2Start, len3Start

			let units = []
			let arr = computeLens()

			units.push({
				class: hasPrev?'':'disabled'
				,page: hasPrev?page - 1:page
				,isPager: true
				,isPrev: true
				,isNext: false
				,html: option.prevHtml
				,srHtml: option.prevSrHtml
				,ariaLabel: option.prevSrHtml
			})

			let dotUnit = {
				class: 'disabled'
				,page: page
				,isPager: false
				,isPrev: false
				,isNext: true
				,html: option.dotsHtml
			}

			for(let i = 0, len = arr.length;i < len;i ++) {
				pushUnit(arr[i])
			}

			units.push({
				class: hasNext?'':'disabled'
				,page: hasNext?page + 1:page
				,isPager: true
				,isPrev: false
				,isNext: true
				,html: option.nextHtml
				,srHtml: option.nextSrHtml
				,ariaLabel: option.nextSrHtml
			})

			function pushUnit(i) {
				if(typeof i === 'number') {
					units.push({
						page: i
						,isPrev: false
						,isPager: false
						,disabled: false
						,class: i === page?'active':''
						,isNext: false
						,html: i
					})	
				} else units.push(dotUnit)
			}

			function computeLens() {
				let a4 = Math.floor((realMaxLink - 2) / 2)
				let a5 = realMaxLink - 3 - a4
				let s2 = page - a4
				let s3 = page + a5
				if(s2 < 2) {
					s2 = 2
				}
				else if(s3 > linksCount) {
					s2 = linksCount - (realMaxLink - 2)
				}
				let arr = [1]
				if(s2 > 2) arr.push('dot')
				let it
				for(let i = 0, len = realMaxLink - 2 < 1?realMaxLink - 1:realMaxLink - 2;i < len;i ++) {
					it = i + s2
					arr.push(it)
				}
				if(it < linksCount - 1) arr.push('dot')
				if(it < linksCount) arr.push(linksCount)
				return arr
			}

			return units
			//end unit
		}
	}

	constructor(props) {
		super(props)
	}

	handleClick(page, url, e) {
		if (this.props.onLinkClick) {
			this.props.onLinkClick(page, url, e)
		}
	}

	unitRender = (unit, index) => {

		let stats = {
			...ReactPagenav.default
			,...this.props
		}
		let span = unit.isPager
							 ?<span aria-hidden={true} dangerouslySetInnerHTML={ {__html: unit.html} } />
							 :<span dangerouslySetInnerHTML={ {__html: unit.html} } />

		let sr = unit.isPager
						 ?<span className="sr-only" dangerouslySetInnerHTML={ {__html: unit.srHtml} } />
						 :null

		let url = stats.createPageUrl(unit)

		return (
			<li key={index} onClick={this.handleClick.bind(this, unit.page, url)} className={'page-item ' + unit.class}>
				<a className="page-link" href={url} aria-label={unit.ariaLabel}>
					{span}
					{sr}
				</a>
			</li>
		)

	}

	render() {

		let {props} = this
		let units = ReactPagenav.default.buildUnits(props)
		let lang = {
			...ReactPagenav.default.lang,
			...props.lang
		}
		let opts = {
			...ReactPagenav.default,
			...props
		}
		if(props.render) return render.bind(units, props)
		return (
			<nav className="zpagenav">
				<span className="pagination page-link m-r-1">{lang.total}: {this.props.total}</span>
				<ul className="pagination">
					{units.map((props.unitRender || this.unitRender).bind(this))}
				</ul>
			</nav>
		)
	}
}

module.exports = exports.default = ReactPagenav