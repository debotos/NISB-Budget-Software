import React, { Component } from 'react'
import { Menu, Select } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const { Option } = Select

class Navigation extends Component {
	render() {
		let YearOptions = []
		const currentYear = new Date().getFullYear()
		const tillYear = currentYear - 10

		for (let year = currentYear; year !== tillYear; year--) {
			const ItemYear = `${year - 1} - ${year}`
			YearOptions.push(
				<Option key={`item_${year}`} value={ItemYear}>
					{ItemYear}
				</Option>
			)
		}

		const { isAuthenticated } = this.props

		if (isAuthenticated) {
			return (
				/* Authenticate */
				<Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
					<Menu.Item key="1">
						Summary
						<Link to="/" />
					</Menu.Item>
					<Menu.Item key="2">
						Entry
						<Link to="/entry" />
					</Menu.Item>
					<Menu.Item key="3">
						Admin
						<Link to="/admin" />
					</Menu.Item>
					<Menu.Item key="4">
						<Select
							defaultValue={this.props.budgetYear}
							style={{ minWidth: 130 }}
							onChange={this.props.handleChange}
						>
							{YearOptions}
						</Select>
					</Menu.Item>
				</Menu>
			)
		} else {
			/* Non-Authenticate */
			return <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} />
		}
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(
	mapStateToProps,
	null
)(Navigation)
