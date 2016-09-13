
import ReactPagenav from '../dist/react-pagenav.js'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

describe('react-pagenav', function () {

	let scope, sandboxEl

	beforeEach(function () {
		sandboxEl = $('<div>').attr('id', 'sandbox').appendTo($('body'))
	})

	afterEach(function() {
		$('#sandbox').remove()
	})

	function nextTick(run) {
		setTimeout(run, 100)
	}
	
	function prepare(_props = {}, _default = {}) {

		let mountNode = sandboxEl[0]
		$.extend(ReactPagenav.default, _default)
		class App extends Component {
			constructor(props) {
				super(props)
				this.state = $.extend({}, {
					page: 1
					,pageSize: 10
					,total: 509
					,maxLink: 5
				}, _props)
			}

			handleClick(page, e) {
				this.setState({ page: page })
			}

			render() {
				return <ReactPagenav {...this.state} onLinkClick={(this.props.handleClick || this.handleClick).bind(this)}/>
			}
		}

		ReactDOM.render(
			<App />,
			mountNode
		)

	}

	// Tests

	describe('basic', function () {

		it('init', function(done) {
			prepare({}, {})
			setTimeout(function() {
				let pts = $('#sandbox').find('.page-item')
				expect(pts.length).to.equal(8)
				done()
			}, 100)

		})

		it('only one page', function(done) {

			prepare({
				pageSize: 509
			})
			setTimeout(function() {
				let pts = $('#sandbox').find('.page-item')
				expect(pts.length).to.equal(3)
				done()
			}, 100)

		})


		it('only two page', function(done) {
			prepare({
				pageSize: 508
			})
			setTimeout(function() {
				let pts = $('#sandbox').find('.page-item')
				expect(pts.length).to.equal(4)
				done()
			}, 100)
		})

	})


	describe('options', function () {

		it('init page=4', function(done) {
			prepare({
				page: 4
			})

			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect(pts.length).to.equal(9)
				expect($('#sandbox').find('.page-item.active').text()).to.equal('4')
				expect($('#sandbox').find('.page-item').eq(1).find('a').prop('href')).to.equal('http://localhost:8078/context.html#')
				done()
			})
		})

		it('init maxLink=100', function(done) {
			prepare({
				maxLink: 100
				,total: 503
			})
			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect(pts.length).to.equal(53)
				expect($('#sandbox').find('.page-item.active').text()).to.equal('1')
				done()
			})
		})

		it('init maxLink=1(maxLink will never less than 5)', function(done) {
			prepare({
				maxLink: 1
			})
			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect(pts.length).to.equal(8)
				expect($('#sandbox').find('.page-item.active').text()).to.equal('1')
				done()
			})
		})

		it('init total=1', function(done) {
			prepare({
				total: 1
			})
			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect(pts.length).to.equal(3)
				expect($('#sandbox').find('.page-item.active').text()).to.equal('1')
				done()
			})
		})

		it('init total=0', function(done) {
			prepare({
				total: 1
			})
			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect(pts.length).to.equal(3)
				expect($('#sandbox').find('.page-item.active').text()).to.equal('1')
				done()
			})
		})

		it('init lang.total=cutsom', function(done) {
			prepare({
				lang: {
					total: 'custom'
				}
			})
			nextTick(function() {
				expect($('#sandbox').find('.pagination').eq(0).text()).to.equal('custom: 509')
				done()
			})
		})

		it('init unitRender', function(done) {
			prepare({
				unitRender: function(unit, index) {

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
							</a>
						</li>
					)

				}
			})
			nextTick(function() {
				expect($('#sandbox').find('.sr-only').length).to.equal(0)
				done()
			})
		})

	})

	describe('event', function () {

		it('trigger event', function(done) {
			prepare()

			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect(pts.length).to.equal(8)
				$('#sandbox .page-item').eq(2).trigger('click')
				nextTick(function() {
					let pts = $('#sandbox').find('.page-item')
					expect(pts.length).to.equal(8)
					expect($('#sandbox').find('.page-item.active').text()).to.equal('2')
					done()
				})

			})
		})

		it('click link page=2', function(done) {
			prepare()

			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect(pts.length).to.equal(8)
				$('#sandbox .page-item').eq(2).trigger('click')
				nextTick(function() {
					let pts = $('#sandbox').find('.page-item')
					expect(pts.length).to.equal(8)
					expect($('#sandbox').find('.page-item.active').text()).to.equal('2')
					done()
				})

			})
		})

		it('click link pagenext', function(done) {
			prepare()

			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect(pts.length).to.equal(8)
				$('#sandbox .page-item:last').trigger('click')
				nextTick(function() {
					let pts = $('#sandbox').find('.page-item')
					expect(pts.length).to.equal(8)
					expect($('#sandbox').find('.page-item.active').text()).to.equal('2')
					done()
				})

			})
		})

		it('click link page=51', function(done) {
			prepare()

			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect(pts.length).to.equal(8)
				$('#sandbox .page-item').eq(6).trigger('click')
				nextTick(function() {
					let pts = $('#sandbox').find('.page-item')
					expect(pts.length).to.equal(8)
					expect($('#sandbox').find('.page-item.active').text()).to.equal('51')
					done()
				})

			})
		})

	})

	describe('glob default', function () {

		it('prev text', function(done) {
			prepare({}, {
				prevHtml: 'prev'
			})
			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect($('#sandbox').find('.page-item').eq(0).find('span').eq(0).text()).to.equal('prev')
				done()
			})
		})

		it('next text', function(done) {

			prepare({}, {
				nextHtml: 'next'
			})
			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect($('#sandbox').find('.page-item').eq(7).find('span').eq(0).text()).to.equal('next')
				done()
			})
		})

		it('prev screen reader text', function(done) {

			prepare({}, {
				prevSrHtml: 'prev0'
			})
			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect($('#sandbox').find('.page-item').eq(0).find('.sr-only').html()).to.equal('prev0')
				done()
			})
		})

		it('next screen reader text', function(done) {

			prepare({}, {
				nextSrHtml: 'next0'
			})
			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect($('#sandbox').find('.page-item').eq(7).find('.sr-only').html()).to.equal('next0')
				done()
			})
		})

		it('lang.total', function(done) {

			prepare({

			}, {
				lang: {
					total: 'total page'
				}
			})
			nextTick(function() {
				let pts = $('#sandbox').find('.page-item')
				expect($('#sandbox').find('.pagination').eq(0).text()).to.equal('total page: 509')
				done()
			})
		})

	})

	//end
})
