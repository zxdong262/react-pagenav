
import React, { Component, PropTypes } from 'react'

export default class ReactPagenav extends Component {

	static propTypes = {
		page: PropTypes.number
		,total: PropTypes.number
		,pageSize: PropTypes.number
		,maxLink: PropTypes.number
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
			return '#p=' + unit.page
		}
	}

	constructor(props) {
		super(props)
	}

	handleClick(page, e) {
		if (this.props.onLinkClick) {
			this.props.onLinkClick(page, e)
		}
	}

	static buildUnits(props) {

		var option = ReactPagenav.default
		var page = props.page || option.page
		var pageSize = props.pageSize || option.pageSize
		var total = props.total || option.total
		var maxLink = props.maxLink >5?props.maxLink:5

		var linksCount = Math.ceil(total/pageSize)

		if(page > linksCount) page = linksCount + 0

		var hasPrev = page > 1
		var hasNext = page < linksCount
		var realMaxLink = maxLink > linksCount?linksCount:maxLink
		var len1, len2, len3, shouldInsertDots12, shouldInsertDots23
		var len2Start, len3Start

		var units = []
		var arr = computeLens()

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

		var dotUnit = {
			class: 'disabled'
			,page: page
			,isPager: false
			,isPrev: false
			,isNext: true
			,html: option.dotsHtml
		}

		for(var i = 0, len = arr.length;i < len;i ++) {
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
			var a4 = Math.floor((realMaxLink - 2) / 2)
			var a5 = realMaxLink - 3 - a4
			var s2 = page - a4
			var s3 = page + a5
			if(s2 < 2) {
				s2 = 2
			}
			else if(s3 > linksCount) {
				s2 = linksCount - (realMaxLink - 2)
			}
			var arr = [1]
			if(s2 > 2) arr.push('dot')
			var it
			for(var i = 0, len = realMaxLink - 2;i < len;i ++) {
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

	createUnit = (unit, index) => {

		var stats = {
			...ReactPagenav.default
			,...this.props
		}
		var span
		if (unit.isPager) {
			span = <span aria-hidden={true} dangerouslySetInnerHTML={ {__html: unit.html} } />
		} else {
			span = <span dangerouslySetInnerHTML={ {__html: unit.html} } />
		}
		var sr = null
		if(unit.isPager) {
			sr = <span className="sr-only" dangerouslySetInnerHTML={ {__html: unit.srHtml} } />
		}

		return (
			<li key={index} onClick={this.handleClick.bind(this, unit.page)} className={'page-item ' + unit.class}>
				<a className="page-link" href={stats.createPageUrl(unit)} aria-label={unit.ariaLabel}>
					{span}
					{sr}
				</a>
			</li>
		)

	}

	render() {

		var units = ReactPagenav.buildUnits(this.props)

		return (
			<nav className="zpagenav">
				<span className="pagination page-link m-r-1">total:{this.props.total}</span>
				<ul className="pagination">
					{units.map(this.createUnit)}
				</ul>
			</nav>
		)
	}
}