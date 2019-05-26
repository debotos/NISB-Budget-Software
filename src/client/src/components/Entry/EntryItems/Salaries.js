import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, InputNumber, Table, Popconfirm } from 'antd'
import axios from 'axios'

const { MonthPicker } = DatePicker

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field])
}

export class Salaries extends Component {
	componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields()
	}

	state = { loading: false }

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({ loading: true })
				console.log('Received values of Salaries form: ', values)
				const data = {
					voucher: values.voucher,
					month: values.month.format('MMMM YYYY'),
					date: values.date.valueOf(),
					name: values.name,
					designation: values.designation,
					amount: values.amount
				}
				console.log('Salaries form data formated: ', data)
				axios
					.post('/api/v1/salaries', data)
					.then(response => {
						const data = response.data
						console.log('Salaries form submit response: ', data)
						// Clear the form
						this.props.form.resetFields()
						// To disabled submit button
						this.props.form.validateFields()
						this.setState({ loading: false })
					})
					.catch(error => {
						console.log(error.message)
						this.setState({ loading: false })
					})
			}
		})
	}

	onDateChange = (date, dateString) => {
		console.log(date, dateString)
	}

	render() {
		const { loading } = this.state
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
		// Only show error after a field is touched.
		const voucherError = isFieldTouched('voucher') && getFieldError('voucher')
		const dateError = isFieldTouched('date') && getFieldError('date')
		const monthError = isFieldTouched('month') && getFieldError('month')
		const nameError = isFieldTouched('name') && getFieldError('name')
		const designationError = isFieldTouched('designation') && getFieldError('designation')
		const amountError = isFieldTouched('amount') && getFieldError('amount')

		return (
			<>
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
								parser={value => value.replace(/৳\s?|(,*)/g, '')}
								min={1}
							/>
						)}
					</Form.Item>

					<Form.Item>
						<Button
							loading={loading}
							type="primary"
							htmlType="submit"
							disabled={hasErrors(getFieldsError())}
						>
							Add
						</Button>
					</Form.Item>
				</Form>
				<EditableFormTable />
			</>
		)
	}
}

const SalariesForm = Form.create({ name: 'salaries_form' })(Salaries)

export default SalariesForm

/*
	*******************************
	Below code for Generate Table
	*******************************
*/

const data = []
for (let i = 0; i < 100; i++) {
	data.push({
		key: i.toString(),
		name: `Edrward ${i}`,
		age: 32,
		address: `London Park no. ${i}`
	})
}
const EditableContext = React.createContext()

class EditableCell extends React.Component {
	getInput = () => {
		if (this.props.inputType === 'number') {
			return <InputNumber />
		}
		return <Input />
	}

	renderCell = ({ getFieldDecorator }) => {
		const {
			editing,
			dataIndex,
			title,
			inputType,
			record,
			index,
			children,
			...restProps
		} = this.props
		return (
			<td {...restProps}>
				{editing ? (
					<Form.Item style={{ margin: 0 }}>
						{getFieldDecorator(dataIndex, {
							rules: [
								{
									required: true,
									message: `Please Input ${title}!`
								}
							],
							initialValue: record[dataIndex]
						})(this.getInput())}
					</Form.Item>
				) : (
					children
				)}
			</td>
		)
	}

	render() {
		return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
	}
}

class EditableTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = { data, editingKey: '' }
		this.columns = [
			{
				title: 'Voucher',
				dataIndex: 'voucher',
				width: '10%',
				editable: true
			},
			{
				title: 'Date',
				dataIndex: 'date',
				width: '20%',
				editable: true
			},
			{
				title: 'Month',
				dataIndex: 'month',
				width: '20%',
				editable: true
			},
			{
				title: 'Name',
				dataIndex: 'name',
				width: '20%',
				editable: true
			},
			{
				title: 'Designation',
				dataIndex: 'designation',
				width: '20%',
				editable: true
			},
			{
				title: 'operation',
				dataIndex: 'operation',
				render: (text, record) => {
					const { editingKey } = this.state
					const editable = this.isEditing(record)
					return editable ? (
						<span>
							<EditableContext.Consumer>
								{form => (
									<a
										href="javascript:;"
										onClick={() => this.save(form, record.key)}
										style={{ marginRight: 8 }}
									>
										Save
									</a>
								)}
							</EditableContext.Consumer>
							<Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
								<a>Cancel</a>
							</Popconfirm>
						</span>
					) : (
						<a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
							Edit
						</a>
					)
				}
			}
		]
	}

	isEditing = record => record.key === this.state.editingKey

	cancel = () => {
		this.setState({ editingKey: '' })
	}

	save(form, key) {
		form.validateFields((error, row) => {
			if (error) {
				return
			}
			const newData = [...this.state.data]
			const index = newData.findIndex(item => key === item.key)
			if (index > -1) {
				const item = newData[index]
				newData.splice(index, 1, {
					...item,
					...row
				})
				this.setState({ data: newData, editingKey: '' })
			} else {
				newData.push(row)
				this.setState({ data: newData, editingKey: '' })
			}
		})
	}

	edit(key) {
		this.setState({ editingKey: key })
	}

	render() {
		const components = {
			body: {
				cell: EditableCell
			}
		}

		const columns = this.columns.map(col => {
			if (!col.editable) {
				return col
			}
			return {
				...col,
				onCell: record => ({
					record,
					inputType: col.dataIndex === 'age' ? 'number' : 'text',
					dataIndex: col.dataIndex,
					title: col.title,
					editing: this.isEditing(record)
				})
			}
		})

		return (
			<EditableContext.Provider value={this.props.form}>
				<Table
					size="small"
					components={components}
					bordered
					dataSource={this.state.data}
					columns={columns}
					rowClassName="editable-row"
					pagination={{
						onChange: this.cancel
					}}
				/>
			</EditableContext.Provider>
		)
	}
}

const EditableFormTable = Form.create()(EditableTable)
