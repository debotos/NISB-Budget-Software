import React, { Component } from 'react'
import { Layout, Typography } from 'antd'

import Budget from './Budget'
import Bank from './Bank'

const { Content } = Layout
const { Title } = Typography
export class Admin extends Component {
	render() {
		const { budgetYear } = this.props
		return (
			<>
				<Layout style={{ padding: '24px 0', margin: '50px 0', background: '#fff' }}>
					<Content
						style={{
							padding: '20px 24px',
							minHeight: 280,
							display: 'flex',
							justifyContent: 'space-around'
						}}
					>
						<div>
							<Title level={4} mark>
								Original Budget
							</Title>
							<Budget budgetYear={budgetYear} />
						</div>
						<div>
							<Title level={4} mark>
								Bank Issued
							</Title>
							<Bank budgetYear={budgetYear} />
						</div>
					</Content>
				</Layout>
			</>
		)
	}
}

export default Admin
