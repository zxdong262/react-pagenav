import React, { Component, PropTypes } from 'react'
import ReactPagenav from './react-pagenav.jsx'

export default class App extends Component {

	state = {
		page: 1
		,total: 300
		,pageSize: 10
		,maxLink: 5
		,lang: {
			total: 't'
		}
	}

	constructor(props) {
		super(props)
	}

	handleClick = (page, url, e) => {
		this.setState({ page: page })
	}

	handleChange(name, e) {
		this.setState({
			[name]: parseInt(e.target.value, 10)
		})
	}

	render() {

		var createPageUrl = function(unit) {
			return unit.page  === 1?'':'#p=' + unit.page
		}

		var names = Object.keys(this.state)

		return (
			<div>
				<div>
					{
						names.map(function(name, index) {
							return (
								<div key={index} className="form-group" >
									<label>*{name}</label>
									<input className="form-control" type="value" name={name} onChange={this.handleChange.bind(this, name)} defaultValue={this.state[name]} />
								</div>
							)
						}, this)
					}
				</div>
				<hr />
				<ReactPagenav {...this.state} onLinkClick={this.handleClick} createPageUrl={createPageUrl}></ReactPagenav>
			</div>
		)

	}
}