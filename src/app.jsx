import React, { Component, PropTypes } from 'react'
import ReactPagenav from './react-pagenav.jsx'

ReactPagenav.default.prevHtml = '<'

export default class App extends Component {

	state = {
		page: 1
		,total: 300
		,pageSize: 10
		,maxLink: 5
	}

	constructor(props) {
		super(props)
	}

	handleClick = (page, e) => {
		this.setState({ page: page })
	}

	handleChange(name, e) {
		this.setState({
			[name]: parseInt(e.target.value, 10)
		})
	}

	render() {
		console.log('render')
		console.log(this.state)

		var createPageUrl = function(unit) {
			return '#p?page=' + unit.page
		}

		var names = Object.keys(this.state)

		return (
			<div>
				<h1>react-pagenav</h1>
				<div>
					{
						names.map(function(name, index) {
							return (
								<div key={index} className="form-group" >
									<label>{name}</label>
									<input className="form-control" type="value" name={name} onChange={this.handleChange.bind(this, name)} value={this.state[name]} />
								</div>
							)
						}, this)
					}
				</div>
				<ReactPagenav {...this.state} onLinkClick={this.handleClick} createPageUrl={createPageUrl}></ReactPagenav>
			</div>
		)

	}
}