
describe('react-pagenav', function () {

	var scope, sandboxEl

	beforeEach(function () {
		sandboxEl = $('<div>').attr('id', 'sandbox').appendTo($('body'))
	})

	afterEach(function() {
		$('#sandbox').remove()
	})
	
	function prepare(_props, _default) {

		var mountNode = sandboxEl[0]

		//props
		var props = $.extend({}, {
			page: 1
			,pageSize: 10
			,total: 509
			,maxLink: 5
		}, _props)

		var AppDef = {
			getInitialState: function getInitialState() {
		    return props
		  }
			,handleClick: function(page, e) {
				this.setState({ page: page })
			}
		  ,render: function render() {
		  	return React.createElement(
		  		'Div'
		  		,null
		  		,React.createElement(
		  			ReactPagenav
		  			,{
							page: this.state.page
							,pageSize: this.state.pageSize
							,total: this.state.total
							,maxLink: this.state.maxLink
							,onLinkClick: this.handleClick
		  			}
		  		)
		  	)
		  }
		}

		if(_props.handleClick) AppDef.handleClick = _props.handleClick

		var App = React.createClass(AppDef)
		var ReactPagenav = window.ReactPagenav.default

		console.log(ReactPagenav)

		//ReactPagenav default change
		$.extend(ReactPagenav.default, _default)

		ReactDOM.render(React.createElement(App, null), mountNode)

	}

	// Tests

	describe('basic', function () {

		it('init', function(done) {
			prepare({}, {})
			setTimeout(function() {
				var pts = $('#sandbox').find('.page-item')
				console.log($('#sandbox').html())
				expect(pts.length).to.equal(8)
				done()
			}, 100)

		})

	})


	//end
})
