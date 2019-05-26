import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { Route, Link } from 'react-router-dom'

import Salaries from './EntryItems/Salaries'
import Fringe from './EntryItems/Fringe'
import Consultant from './EntryItems/Consultant'
import Equipment from './EntryItems/Equipment'
import Supplies from './EntryItems/Supplies'
import Travel from './EntryItems/Travel'
import Others from './EntryItems/Others'
import Contractual from './EntryItems/Contractual'

const { SubMenu } = Menu
const { Content, Sider } = Layout

export class Entry extends Component {
	render() {
		const { match } = this.props
		const pathArray = window.location.pathname.split('/')
		const option = pathArray[pathArray.length - 1]
		return (
			<>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Entry</Breadcrumb.Item>
					<Breadcrumb.Item style={{ textTransform: 'capitalize' }}>{option}</Breadcrumb.Item>
				</Breadcrumb>
				<Layout style={{ padding: '24px 0', background: '#fff' }}>
					<Sider width={200} style={{ background: '#fff' }}>
						<Menu mode="inline" defaultOpenKeys={['subMenu1']} style={{ height: '100%' }}>
							<SubMenu
								key="subMenu1"
								title={
									<span>
										<Icon type="folder-open" />
										Entry Options
									</span>
								}
							>
								{MenuItems.map((x, i) => (
									<Menu.Item key={`entry_option_${i}`}>
										{x.label}
										<Link to={`${match.path}/${x.route}`} />
									</Menu.Item>
								))}
							</SubMenu>
						</Menu>
					</Sider>
					<Content style={{ padding: '0 24px', minHeight: 280 }}>
						<Route exact path={`${match.path}/`} component={Intro} />
						<Route path={`${match.path}/salaries`} component={Salaries} />
						<Route path={`${match.path}/fringe`} component={Fringe} />
						<Route path={`${match.path}/consultant`} component={Consultant} />
						<Route path={`${match.path}/equipment`} component={Equipment} />
						<Route path={`${match.path}/supplies`} component={Supplies} />
						<Route path={`${match.path}/travel`} component={Travel} />
						<Route path={`${match.path}/contractual`} component={Contractual} />
						<Route path={`${match.path}/others`} component={Others} />
					</Content>
				</Layout>
			</>
		)
	}
}

export default Entry

const Intro = () => <h1>Please select an option!</h1>

const MenuItems = [
	{
		label: 'Salaries And Wages',
		route: 'salaries'
	},
	{
		label: 'Fringe',
		route: 'fringe'
	},
	{
		label: 'Consultant',
		route: 'consultant'
	},
	{
		label: 'Equipment',
		route: 'equipment'
	},
	{
		label: 'Supplies',
		route: 'supplies'
	},
	{
		label: 'Travel',
		route: 'travel'
	},
	{
		label: 'Contractual',
		route: 'contractual'
	},
	{
		label: 'Others',
		route: 'others'
	}
]
