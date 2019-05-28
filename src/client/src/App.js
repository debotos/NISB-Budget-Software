import React from 'react'
import { Layout, Menu } from 'antd'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'

import Admin from './components/Admin'
import Entry from './components/Entry'
import Summary from './components/Summary'

const { Header, Content, Footer } = Layout

const App = () => (
	<Router>
		<Layout style={{ minHeight: '100vh' }}>
			<Header className="header">
				<div className="logo">
					<h1 style={{ color: '#fff', margin: 0 }}>Accounting</h1>
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
				</Menu>
			</Header>
			<Content style={{ padding: '0 50px' }}>
				<Switch>
					<Route path="/summary" component={Summary} />
					<Route path="/entry" component={Entry} />
					<Route path="/admin" component={Admin} />
					<Redirect to="/summary" />
				</Switch>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				©{new Date().getFullYear()} Created by Touhidur Rahman
			</Footer>
		</Layout>
	</Router>
)

export default App
