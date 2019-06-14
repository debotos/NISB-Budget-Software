import React, { Component } from 'react'
import { Form, Button, InputNumber, Spin, message } from 'antd'
import axios from 'axios'

const formItemLayout = {
	labelCol: { span: 15 },
	wrapperCol: { span: 8 }
}
const formTailLayout = {
	labelCol: { span: 15 },
	wrapperCol: { span: 8, offset: 15 }
}
function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field])
}

export class Budget extends Component {
	componentDidMount() {
		this.getBudget(this.props.budgetYear)
		// To disabled submit button at the beginning.
		this.props.form.validateFields()
	}

	componentDidUpdate(prevProps) {
		console.log(`Budget Year changed from '${prevProps.budgetYear}' to '${this.props.budgetYear}'`)
		if (this.props.budgetYear !== prevProps.budgetYear) {
			this.getBudget(this.props.budgetYear)
		}
	}

	getBudget = async budgetYear => {
		try {
			this.setState({ loading: true })
			const response = await axios.get(`/api/v1/budget?budgetYear=${budgetYear}`)
			console.log('Budget got from server ', response.data)
			this.setState({ data: response.data }, () => this.setState({ loading: false }))
		} catch (error) {
			console.log(error)
			message.error('Failed to load the Budget Data!')
		}
	}

	state = { working: false, loading: true, data: [] }

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({ working: true })
				const budgetYear = this.props.budgetYear
				console.log('Received values of Budget form: ', values)
				axios
					.post(`/api/v1/budget?budgetYear=${budgetYear}`, { ...values, budgetYear: budgetYear })
					.then(response => {
						const data = response.data
						console.log('Budget form submit response: ', data)
						/* Instant UI update */

						this.setState({ working: false })
						message.success('Budget Updated Successfully!')
						this.props.form.validateFields()
					})
					.catch(error => {
						console.log(error.message)
						message.error('Failed to Updated Budget!')
						this.setState({ working: false })
					})
			}
		})
	}

	render() {
		const { working, loading, data } = this.state
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
		const salaryError = isFieldTouched('salary') && getFieldError('salary')
		const consultantError = isFieldTouched('consultant') && getFieldError('consultant')
		const fringeError = isFieldTouched('fringe') && getFieldError('fringe')
		const otherError = isFieldTouched('other') && getFieldError('other')
		const supplyError = isFieldTouched('supply') && getFieldError('supply')
		const travelError = isFieldTouched('travel') && getFieldError('travel')

		if (loading)
			return (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '15px'
					}}
				>
					<Spin size="large" />
				</div>
			)
		const { consultant, fringe, other, salary, supply, travel } = data
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit}>
				<Form.Item
					label="Salaries And Wages Budget"
					validateStatus={salaryError ? 'error' : ''}
					help={salaryError || ''}
					{...formItemLayout}
				>
					{getFieldDecorator('salary', {
						initialValue: salary,
						rules: [{ required: true, message: 'Provide Salaries And Wages Budget!' }]
					})(
						<InputNumber
							style={{ minWidth: '200px' }}
							formatter={value => `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/৳\s?|(,*)/g, '')}
							min={0}
						/>
					)}
				</Form.Item>
				<Form.Item
					label="Fringe Budget"
					validateStatus={fringeError ? 'error' : ''}
					help={fringeError || ''}
					{...formItemLayout}
				>
					{getFieldDecorator('fringe', {
						initialValue: fringe,
						rules: [{ required: true, message: 'Provide Fringe Budget!' }]
					})(
						<InputNumber
							style={{ minWidth: '200px' }}
							formatter={value => `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/৳\s?|(,*)/g, '')}
							min={0}
						/>
					)}
				</Form.Item>
				<Form.Item
					label="Consultant Budget"
					validateStatus={consultantError ? 'error' : ''}
					help={consultantError || ''}
					{...formItemLayout}
				>
					{getFieldDecorator('consultant', {
						initialValue: consultant,
						rules: [{ required: true, message: 'Provide Consultant Budget!' }]
					})(
						<InputNumber
							style={{ minWidth: '200px' }}
							formatter={value => `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/৳\s?|(,*)/g, '')}
							min={0}
						/>
					)}
				</Form.Item>
				<Form.Item
					label="Supplies Budget"
					validateStatus={supplyError ? 'error' : ''}
					help={supplyError || ''}
					{...formItemLayout}
				>
					{getFieldDecorator('supply', {
						initialValue: supply,
						rules: [{ required: true, message: 'Provide Supplies Budget!' }]
					})(
						<InputNumber
							style={{ minWidth: '200px' }}
							formatter={value => `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/৳\s?|(,*)/g, '')}
							min={0}
						/>
					)}
				</Form.Item>
				<Form.Item
					label="Travel Budget"
					validateStatus={travelError ? 'error' : ''}
					help={travelError || ''}
					{...formItemLayout}
				>
					{getFieldDecorator('travel', {
						initialValue: travel,
						rules: [{ required: true, message: 'Provide Travel Budget!' }]
					})(
						<InputNumber
							style={{ minWidth: '200px' }}
							formatter={value => `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/৳\s?|(,*)/g, '')}
							min={0}
						/>
					)}
				</Form.Item>
				<Form.Item
					label="Others Budget"
					validateStatus={otherError ? 'error' : ''}
					help={otherError || ''}
					{...formItemLayout}
				>
					{getFieldDecorator('other', {
						initialValue: other,
						rules: [{ required: true, message: 'Provide Others Budget!' }]
					})(
						<InputNumber
							style={{ minWidth: '200px' }}
							formatter={value => `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/৳\s?|(,*)/g, '')}
							min={0}
						/>
					)}
				</Form.Item>

				<Form.Item {...formTailLayout}>
					<Button
						loading={working}
						type="primary"
						htmlType="submit"
						disabled={hasErrors(getFieldsError())}
					>
						Save
					</Button>
				</Form.Item>
			</Form>
		)
	}
}

const BudgetForm = Form.create({ name: 'Budget_form' })(Budget)

export default BudgetForm