import Excel from 'exceljs/modern.browser'

export default (data, type) => {
	console.log(data)
	/* Set Workbook Properties */
	const workbook = new Excel.Workbook()
	workbook.creator = 'NISB'
	workbook.lastModifiedBy = 'Touhidur Rahman'
	workbook.created = new Date()
	workbook.modified = new Date()
	/* Workbook Views */
	workbook.views = [
		{
			x: 0,
			y: 0,
			width: 10000,
			height: 20000,
			firstSheet: 0,
			activeTab: 1,
			visibility: 'visible'
		}
	]
	/* Add a Worksheet */
	const sheet = workbook.addWorksheet(type)
}
