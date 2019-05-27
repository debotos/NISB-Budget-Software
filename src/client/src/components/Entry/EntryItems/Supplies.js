import React, { Component } from 'react'
import {
	Form,
	Input,
	Button,
	DatePicker,
	InputNumber,
	Select,
	Table,
	Popconfirm,
	Spin,
	message,
	Icon,
	Divider
} from 'antd'

const Option = Select.Option
const options = [
	<Option key={1} value="Swab Stick">
		Swab stick
	</Option>,
	<Option key={2} value="Lint free clean wipes">
		Lint free clean wipes
	</Option>,
	<Option key={3} value="Absolute alcohol">
		Absolute alcohol
	</Option>,
	<Option key={4} value="Aluminium foil">
		Aluminium foil
	</Option>,
	<Option key={5} value="Paraffin">
		Paraffin
	</Option>,
	<Option key={6} value="Powder free golves">
		Powder free golves
	</Option>,
	<Option key={7} value="Sample bou">
		Sample bou
	</Option>,
	<Option key={8} value="Aerosol barrier">
		Aerosol barrier
	</Option>,
	<Option key={9} value="Refil dry shipper with liquid ritrogen">
		Refil dry shipper with liquid ritrogen
	</Option>,
	<Option key={10} value="Sterile eppendorf tube">
		Sterile eppendorf tube
	</Option>,
	<Option key={11} value="24 well cooler rack">
		24 well cooler rack
	</Option>,
	<Option key={12} value="96 well cooler rack">
		96 well cooler rack
	</Option>,
	<Option key={13} value="VTm">
		VTm
	</Option>
]

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field])
}

export class Supplies extends Component {
	componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields()
	}

	state = { working: false, loading: true, data: [] }

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({ working: true })
				console.log('Received values of Supplies form: ', values)
				const data = {
					voucher: values.voucher,
					date: values.date.valueOf(),
					supplies: values.supplies,
					amount: values.amount
				}
				console.log('Supplies form data formated: ', data)
			}
		})
	}

	render() {
		const { working, loading, data } = this.state
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

		const voucherError = isFieldTouched('voucher') && getFieldError('voucher')
		const amountError = isFieldTouched('amount') && getFieldError('amount')
		const dateError = isFieldTouched('date') && getFieldError('date')
		const suppliesError = isFieldTouched('supplies') && getFieldError('supplies')

		return (
			<>
				<Form layout="inline" onSubmit={this.handleSubmit}>
					<Form.Item validateStatus={voucherError ? 'error' : ''} help={voucherError || ''}>
						{getFieldDecorator('voucher', {
							rules: [{ required: true, message: 'Please provide Voucher No.!' }]
						})(<Input placeholder="Voucher No." />)}
					</Form.Item>

					<Form.Item validateStatus={suppliesError ? 'error' : ''} help={suppliesError || ''}>
						{getFieldDecorator('supplies', {
							rules: [
								{ required: true, message: 'Please provide Supplies Type!' },
								{
									validator: (rule, value, callback) => {
										if (value) {
											if (value.length > 1) {
												callback('Select Only One Type!')
											} else if (value.length <= 1) {
												callback()
											}
										}
										return
									}
								}
							]
						})(
							<Select
								mode="tags"
								style={{ minWidth: 200 }}
								placeholder="Supplies Type"
								showSearch
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
								{options}
							</Select>
						)}
					</Form.Item>

					<Form.Item validateStatus={dateError ? 'error' : ''} help={dateError || ''}>
						{getFieldDecorator('date', {
							rules: [{ required: true, message: 'Please provide Date!' }]
						})(<DatePicker placeholder="Select Date" />)}
					</Form.Item>

					<Form.Item validateStatus={amountError ? 'error' : ''} help={amountError || ''}>
						{getFieldDecorator('amount', {
							rules: [{ required: true, message: 'Provide Amount!' }]
						})(
							<InputNumber
								formatter={value => `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={value => value.replace(/৳\s?|(,*)/g, '')}
								min={1}
							/>
						)}
					</Form.Item>

					<Form.Item>
						<Button
							loading={working}
							type="primary"
							htmlType="submit"
							disabled={hasErrors(getFieldsError())}
						>
							Add
						</Button>
					</Form.Item>
				</Form>
			</>
		)
	}
}

const SuppliesForm = Form.create({ name: 'fringes_form' })(Supplies)

export default SuppliesForm
