import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, InputNumber } from 'antd'

const { MonthPicker } = DatePicker

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field])
}

export class Salaries extends Component {
	componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields()
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of Salaries form: ', values)
			}
		})
	}

	onDateChange = (date, dateString) => {
		console.log(date, dateString)
	}

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
		// Only show error after a field is touched.
		const voucherError = isFieldTouched('voucher') && getFieldError('voucher')
		const dateError = isFieldTouched('date') && getFieldError('date')
		const monthError = isFieldTouched('month') && getFieldError('month')
		const nameError = isFieldTouched('name') && getFieldError('name')
		const designationError = isFieldTouched('designation') && getFieldError('designation')
		const amountError = isFieldTouched('amount') && getFieldError('amount')

		return (
			<Form layout="inline" onSubmit={this.handleSubmit}>
				<Form.Item validateStatus={voucherError ? 'error' : ''} help={voucherError || ''}>
					{getFieldDecorator('voucher', {
						rules: [{ required: true, message: 'Please provide Voucher No.!' }]
					})(<Input placeholder="Voucher No." />)}
				</Form.Item>

				<Form.Item validateStatus={dateError ? 'error' : ''} help={dateError || ''}>
					{getFieldDecorator('date', {
						rules: [{ required: true, message: 'Please provide Date!' }]
					})(<DatePicker placeholder="Select Date" />)}
				</Form.Item>

				<Form.Item validateStatus={monthError ? 'error' : ''} help={monthError || ''}>
					{getFieldDecorator('month', {
						rules: [{ required: true, message: 'Please provide Month!' }]
					})(<MonthPicker placeholder="Select month" />)}
				</Form.Item>

				<Form.Item validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'Please provide Name!' }]
					})(<Input placeholder="Name" />)}
				</Form.Item>

				<Form.Item validateStatus={designationError ? 'error' : ''} help={designationError || ''}>
					{getFieldDecorator('designation', {
						rules: [{ required: true, message: 'Provide Designation!' }]
					})(<Input placeholder="Designation" />)}
				</Form.Item>

				<Form.Item validateStatus={amountError ? 'error' : ''} help={amountError || ''}>
					{getFieldDecorator('amount', {
						rules: [{ required: true, message: 'Provide Amount!' }]
					})(
						<InputNumber
							formatter={value => `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/\৳\s?|(,*)/g, '')}
							min={1}
						/>
					)}
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
						Add
					</Button>
				</Form.Item>
			</Form>
		)
	}
}

const SalariesForm = Form.create({ name: 'salaries_form' })(Salaries)

export default SalariesForm
