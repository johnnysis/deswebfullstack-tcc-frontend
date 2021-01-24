import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

const exportToPdf = (arrColumns, data, title, fontSize, fileName) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
    var docDefinition = {
        pageOrientation: 'landscape',
        content: [
            { text: title, style: 'header'},
            {
                layout: 'lightHorizontalLines', // optional
                table: {
                    headerRows: 1,
                    // widths: [ 'auto', 'auto', 100, '*' ],
                    // widths:  ['16.6%', '16.6%', '16.6%', '16.6%', '16.6%', '16.6%'],
            
                    body: [
                        arrColumns,
                        ...data
                    ]
                },
                
                style: 'table'
            }
        ],
        styles: {
            header: {
                fontSize: 22,
                bold: true,
                alignment: 'center'
            },
            table: {
                marginTop: 20,
                fontSize: fontSize
            }
        }
    };

    let tableLayouts = {
        exampleLayout: {
          hLineWidth: function (i, node) {
            if (i === 0 || i === node.table.body.length) {
              return 0;
            }
            return (i === node.table.headerRows) ? 2 : 1;
          },
          vLineWidth: function (i) {
            return 0;
          },
          hLineColor: function (i) {
            return i === 1 ? 'blue' : '#aaa';
          },
          paddingLeft: function (i) {
            return i === 0 ? 0 : 8;
          },
          paddingRight: function (i, node) {
            return (i === node.table.widths.length - 1) ? 0 : 8;
          }
        }
      };
      
    pdfMake.createPdf(docDefinition, {tableLayouts: tableLayouts}).download(fileName);
};

export default exportToPdf;