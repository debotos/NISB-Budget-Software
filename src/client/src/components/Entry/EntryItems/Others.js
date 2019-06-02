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
	Icon
} from 'antd'
import axios from 'axios'
import moment from 'moment'
import numeral from 'numeral'
import Highlighter from 'react-highlight-words'

const Option = Select.Option
const options = [
	<Option key={1} value="Coordination of the surveillance activities">
		Coordination of the surveillance activities
	</Option>,

	<Option key={3} value="Training">
		Training
	</Option>,
	<Option key={4} value="Publication of newsletter">
		Publication of newsletter
	</Option>,
	<Option key={5} value="Disemination Seminar">
		Disemination Seminar
	</Option>,
	<Option key={2} value="Transportation of Sathkira">
		Transportation of Sathkira
	</Option>,
	<Option key={7} value="Transportation of Potuakhali">
		Transportation of Potuakhali
	</Option>,
	<Option key={8} value="Transportation of Habigong">
		Transportation of Habigong
	</Option>,
	<Option key={9} value="Transportation of Naogaon">
		Transportation of Naogaon
	</Option>,
	<Option key={10} value="Transportation of Cox's Bazar">
		Transportation of Cox's Bazar
	</Option>,
	<Option key={11} value="Transportation of Thakurgaon">
		Transportation of Thakurgaon
	</Option>,
	<Option key={12} value="Transportation of Narshingdi">
		Transportation of Narshingdi
	</Option>,
	<Option key={13} value="Transportation of Joypurhat">
		Transportation of Joypurhat
	</Option>,
	<Option key={14} value="Transportation of Gazipur">
		Transportation of Gazipur
	</Option>,
	<Option key={15} value="Transportation of DMCH">
		Transportation of DMCH
	</Option>
]

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field])
}

export class Others extends Component {
	componentDidMount() {
		this.getOthers(this.props.budgetYear)
		// To disabled submit button at the beginning.
		this.props.form.validateFields()
	}

	getOthers = async budgetYear => {
		try {
			this.setState({ loading: true })
			const response = await axios.get(`/api/v1/others?budgetYear=${budgetYear}`)
			const data = response.data.map(x => ({ ...x, key: x._id })).reverse()
			this.setState({ data }, () => this.setState({ loading: false }))
		} catch (error) {
			console.log(error)
			message.error('Failed to load the others data!')
		}
	}

	state = { working: false, loading: true, data: [] }

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({ working: true })
				console.log('Received values of Others form: ', values)
				const data = {
					voucher: values.voucher,
					date: values.date.valueOf(),
					others: values.others,
					amount: values.amount,
					budgetYear: this.props.budgetYear
				}
				console.log('Others form data formated: ', data)
				axios
					.post('/api/v1/others', data)
					.then(response => {
						const data = response.data
						console.log('Others form submit response: ', data)
						/* Instant UI update */
						this.addData(data)
						this.setState({ working: false })
						message.success('Added Successfully!')
						// Clear the form
						this.props.form.resetFields()
						// To disabled submit button
						this.props.form.validateFields()
					})
					.catch(error => {
						console.log(error.message)
						message.error('Failed to add!')
						this.setState({ working: false })
					})
			}
		})
	}

	updateData = (id, data) => {
		const update = this.state.data.map(x => {
			if (x.key === id) {
				return { ...x, ...data }
			} else {
				return x
			}
		})
		this.setState({ data: update })
	}

	addData = data => {
		const current = this.state.data
		current.unshift({ ...data, key: data._id })
		this.setState({ data: current })
	}
	deleteData = id => {
		const update = this.state.data.filter(x => x.key !== id)
		this.setState({ data: update })
	}

	render() {
		const { working, loading, data } = this.state
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

		const voucherError = isFieldTouched('voucher') && getFieldError('voucher')
		const amountError = isFieldTouched('amount') && getFieldError('amount')
		const dateError = isFieldTouched('date') && getFieldError('date')
		const othersError = isFieldTouched('others') && getFieldError('others')

		return (
			<>
				<Form layout="inline" onSubmit={this.handleSubmit}>
					<Form.Item validateStatus={voucherError ? 'error' : ''} help={voucherError || ''}>
						{getFieldDecorator('voucher', {
							rules: [{ required: true, message: 'Please provide Voucher No.!' }]
						})(<Input placeholder="Voucher No." />)}
					</Form.Item>

					<Form.Item validateStatus={othersError ? 'error' : ''} help={othersError || ''}>
						{getFieldDecorator('others', {
							rules: [
								{ required: true, message: 'Please provide Others Type!' },
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
								style={{ minWidth: 400 }}
								placeholder="Others Type"
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
				<br />
				{!loading ? (
					<EditableFormTable
						data={data}
						updateData={this.updateData}
						deleteData={this.deleteData}
					/>
				) : (
					<Spin size="large" />
				)}
			</>
		)
	}
}

const OthersForm = Form.create({ name: 'others_form' })(Others)

export default OthersForm

/*
	*******************************
	Below code for Generate Table
	*******************************
*/

const EditableContext = React.createContext()

class EditableCell extends React.Component {
	getInput = field => {
		switch (field) {
			case 'amount':
				return (
					<InputNumber
						formatter={value => `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={value => value.replace(/৳\s?|(,*)/g, '')}
						min={1}
					/>
				)
			case 'date':
				return <DatePicker placeholder="Select Date" />

			default:
				return <Input />
		}
	}

	getInputValue = (record, field) => {
		switch (field) {
			case 'date':
				return moment(record[field])

			default:
				return record[field]
		}
	}

	renderDataView = (children, record, field) => {
		switch (field) {
			case 'date':
				return `${moment(record[field]).format('ddd, MMM Do YY')} (${moment(record[field]).format(
					'DD-MM-YYYY'
				)})`
			case 'amount':
				return `${numeral(record[field]).format('0,0.00')} ৳`
			default:
				return children
		}
	}

	renderCell = ({ getFieldDecorator }) => {
		const { editing, dataIndex, title, record, index, children, ...restProps } = this.props
		return (
			<td {...restProps}>
				{editing ? (
					<Form.Item style={{ margin: 0 }}>
						{dataIndex === 'others'
							? getFieldDecorator('others', {
									initialValue: record[dataIndex],
									rules: [
										{ required: true, message: 'Please provide Others Type!' },
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
										placeholder="Others Type"
										showSearch
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
									>
										{options}
									</Select>
							  )
							: getFieldDecorator(dataIndex, {
									rules: [
										{
											required: true,
											message: `Please Input ${title}!`
										}
									],
									initialValue: this.getInputValue(record, dataIndex)
							  })(this.getInput(dataIndex))}
					</Form.Item>
				) : (
					this.renderDataView(children, record, dataIndex)
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
		this.state = { editingKey: '' }
		this.columns = [
			{
				title: 'Voucher',
				dataIndex: 'voucher',
				width: '20%',
				editable: true,
				...this.getColumnSearchProps('voucher')
			},
			{
				title: 'Others Type',
				dataIndex: 'others',
				width: '20%',
				editable: true,
				...this.getColumnSearchProps('others')
			},
			{
				title: 'Date',
				dataIndex: 'date',
				width: '20%',
				editable: true,
				sorter: (a, b) => a.date - b.date
			},
			{
				title: 'Total Cost',
				dataIndex: 'amount',
				width: '20%',
				editable: true,
				// defaultSortOrder: 'descend',
				sorter: (a, b) => a.amount - b.amount
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
									// eslint-disable-next-line
									<a
										// eslint-disable-next-line
										href="javascript:;"
										onClick={() => this.save(form, record.key)}
										style={{ marginRight: 8 }}
									>
										Save
									</a>
								)}
							</EditableContext.Consumer>
							<Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
								{/* eslint-disable-next-line */}
								<a>Cancel</a>
							</Popconfirm>
						</span>
					) : (
						<span>
							{/* eslint-disable-next-line */}
							<a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
								Edit
							</a>
							<Popconfirm
								title="Sure to delete?"
								icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
								onConfirm={() => this.delete(record.key)}
							>
								{/* eslint-disable-next-line */}
								<a href="javascript:;" style={{ marginLeft: 8, color: '#e26a6a' }}>
									Delete
								</a>
							</Popconfirm>
						</span>
					)
				}
			}
		]
	}

	isEditing = record => record.key === this.state.editingKey

	cancel = () => {
		this.setState({ editingKey: '' })
	}

	delete(key) {
		/* Instant UI update */
		this.props.deleteData(key)
		axios
			.delete(`/api/v1/others/${key}`)
			.then(response => {
				console.log('Other delete response ', response.data)
				message.success('Successfully Deleted!')
			})
			.catch(error => {
				console.log(error.message)
				message.error('Failed to delete!')
			})
	}

	save(form, key) {
		form.validateFields((err, row) => {
			if (!err) {
				console.log('Received values of Others Update form: ', row)
				const data = {
					voucher: row.voucher,
					date: row.date.valueOf(),
					others: row.others,
					amount: row.amount
				}
				console.log('Others updated form data formated: ', data)
				/* Instant UI update */
				this.props.updateData(key, data)
				axios
					.post(`/api/v1/others/${key}`, data)
					.then(response => {
						const data = response.data
						console.log('Others form update response: ', data)
						// To disabled submit button
						this.props.form.validateFields()
						this.cancel(key)
						message.success('Successfully Updated!')
					})
					.catch(error => {
						console.log(error.message)
						message.error('Failed to update!')
					})
			}
		})
	}

	edit(key) {
		this.setState({ editingKey: key })
	}

	state = {
		searchText: ''
	}

	handleSearch = (selectedKeys, confirm) => {
		confirm()
		this.setState({ searchText: selectedKeys[0] })
	}

	handleReset = clearFilters => {
		clearFilters()
		this.setState({ searchText: '' })
	}

	getColumnSearchProps = dataIndex => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={node => {
						this.searchInput = node
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
					Reset
				</Button>
			</div>
		),
		filterIcon: filtered => (
			<Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => this.searchInput.select())
			}
		},
		render: text => (
			<Highlighter
				highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
				searchWords={[this.state.searchText]}
				autoEscape
				textToHighlight={text.toString()}
			/>
		)
	})

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
					dataSource={this.props.data}
					columns={columns}
					rowClassName="editable-row"
					pagination={{
						onChange: this.cancel,
						pageSize: 15
					}}
				/>
			</EditableContext.Provider>
		)
	}
}

const EditableFormTable = Form.create()(EditableTable)
