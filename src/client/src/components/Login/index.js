import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { history } from '../../App'
import { setCurrentUser } from '../../redux/actions/authActions'

export class Login extends Component {
	render() {
		return <div>Login</div>
	}
}

const mapDispatchToProps = dispatch => ({
	setUser: user => dispatch(setCurrentUser(user))
})

export default connect(
	null,
	mapDispatchToProps
)(Login)
