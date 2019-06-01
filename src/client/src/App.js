import React from 'react'
import { Layout, Menu, Select } from 'antd'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'

import Admin from './components/Admin'
import Entry from './components/Entry'
import Summary from './components/Summary'
import MenuItem from 'antd/lib/menu/MenuItem'

const { Header, Content, Footer } = Layout
const { Option } = Select

class App extends React.Component {
	state = { budgetYear: `${new Date().getFullYear() - 1} - ${new Date().getFullYear()}` }
	handleChange = value => {
		this.setState({ budgetYear: value })
	}
	render() {
		const { budgetYear } = this.state

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

		return (
			<Router>
				<Layout style={{ minHeight: '100vh' }}>
					<Header className="header">
						<div className="logo">
							<h1 style={{ color: '#fff', margin: 0 }}>NISB</h1>
						</div>
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
							<MenuItem key="4">
								<Select
									defaultValue={budgetYear}
									style={{ minWidth: 130 }}
									onChange={this.handleChange}
								>
									{YearOptions}
								</Select>
							</MenuItem>
						</Menu>
					</Header>
					<Content style={{ padding: '0 50px' }}>
						<Switch>
							<Route
								path="/summary"
								render={props => <Summary {...props} budgetYear={budgetYear} />}
							/>
							<Route path="/entry" render={props => <Entry {...props} budgetYear={budgetYear} />} />
							<Route path="/admin" render={props => <Admin {...props} budgetYear={budgetYear} />} />
							<Redirect to="/summary" />
						</Switch>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						©{new Date().getFullYear()} Created by Touhidur Rahman
					</Footer>
				</Layout>
			</Router>
		)
	}
}

export default App
