import ExcelJS from 'exceljs/dist/es5/exceljs.browser.js';
import { saveAs } from 'file-saver';

const exportToXlsx = async (arrColumns, data, fileName) => {
    const wb = new ExcelJS.Workbook();

    const ws = wb.addWorksheet();
    const row = ws.addRow(arrColumns);
    row.font = { bold: true };
    for(let row of data)
        ws.addRow(row);

    const buf = await wb.xlsx.writeBuffer();
    new Blob([buf]);
    saveAs(new Blob([buf]), fileName);
};

export default exportToXlsx;