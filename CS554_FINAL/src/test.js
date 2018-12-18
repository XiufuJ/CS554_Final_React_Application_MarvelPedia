import React from 'react';
import ReactDOM from 'react-dom';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

import products from './products.json';

class App extends React.Component {
    pdfExportComponent;
    grid;

    constructor(props) {
        super(props);
        this.state = {
            gridData: products
        };
    }

    render() {
        return (
            <div>
                <div className="example-config">
                    <button className="k-button" onClick={this.exportPDFWithComponent}>Export with component</button>
                    &nbsp;
                    <button className="k-button" onClick={this.exportPDFWithMethod}>Export with method</button>
                </div>

                <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4">
                    <Grid
                        ref={(grid) => this.grid = grid}
                        style={{ maxHeight: '400px' }}
                        data={this.state.gridData}
                    >
                        <Column field="ProductID" title="ID" width="40px" />
                        <Column field="ProductName" title="Name" width="250px" />
                        <Column field="Category.CategoryName" title="CategoryName" />
                        <Column field="UnitPrice" title="Price" width="80px" />
                        <Column field="UnitsInStock" title="In stock" width="80px" />
                    </Grid>
                </PDFExport>
            </div>
        );
    }

    exportPDFWithMethod = () => {
        savePDF(ReactDOM.findDOMNode(this.grid), { paperSize: 'A4' });
    }
    exportPDFWithComponent = () => {
        this.pdfExportComponent.save();
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);