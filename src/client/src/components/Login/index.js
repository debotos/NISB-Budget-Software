import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button } from 'antd'

import { history } from '../../App'
import { setCurrentUser } from '../../redux/actions/authActions'

export class Login extends Component {
	state = { error: '', loading: false }

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({ loading: true, error: '' })
				console.log('Received values of Login form: ', values)
				axios
					.post(`/api/v1/users/login`, values)
					.then(response => {
						this.setState({ loading: false })
						console.log(response)
					})
					.catch(error => {
						this.setState({ loading: false })
						let msg = 'Check Network Connection!'
						if (error.response) {
							// The request was made and the server responded with a status code
							// that falls out of the range of 2xx
							const keys = Object.keys(error.response.data.message)
							msg = error.response.data.message[keys[0]]
							console.log('Error Data: ', error.response.data)
						}
						this.setState({ error: msg })
					})
			}
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form
		const { error, loading } = this.state
		console.log(error, loading)
		return (
			<div
				style={{ height: '100vh', display: 'flex', justifyContent: 'center', marginTop: '30vh' }}
			>
				<Form onSubmit={this.handleSubmit} style={{ width: '300px' }}>
					<Form.Item hasFeedback style={{ marginBottom: '5px' }}>
						{getFieldDecorator('email', {
							rules: [
								{
									type: 'email',
									message: 'The input is not valid E-mail!'
								},
								{
									required: true,
									message: 'Please input your E-mail!'
								}
							]
						})(
							<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Email"
							/>
						)}
					</Form.Item>
					<Form.Item hasFeedback style={{ marginBottom: '10px' }}>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }]
						})(
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="Password"
							/>
						)}
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
							Log in
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	setUser: user => dispatch(setCurrentUser(user))
})

const LoginForm = Form.create({ name: 'login_form' })(Login)

export default connect(
	null,
	mapDispatchToProps
)(LoginForm)
