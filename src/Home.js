import React, { Component } from 'react';
import Chart from 'chart.js';
import { Input, InputButton, Select } from './components/input';
import { enumTiposGraficos, tiposGraficos, url } from './util/constants';
import Axios from 'axios';
import Messages from './components/message/Messages';
import FailureMessage from './components/message/FailureMessage';

// import React f
//relatórios a serem criados.
//Quantidade de vendas ano/mês. -
//Quantidade de compras do mês.
//Vendas feitas x pagas.
//Vendas por forma de pagamento. -
//Vendas por categoria de produtos. -

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { tipoGrafico: 0, failureMessage: '', ano: '', heightCanvas: 0, currentChart: null};
        
        this.chartRef = React.createRef();
        this.montarGrafico = this.montarGrafico.bind(this);
        this.labelsMeses = this.labelsMeses.bind(this);
        this.labelsCategorias = this.labelsCategorias.bind(this);
        this.gerarRelatorio = this.gerarRelatorio.bind(this);
    }
    
    gerarRelatorio() {
        const urlRelatorio = tiposGraficos.find(el => el.codigo === this.state.tipoGrafico).url;
        console.log(urlRelatorio);
        console.log(this.state.tipoGrafico);

        Axios.get(`${url}${urlRelatorio}?ano=${this.state.ano}`).then(result => {
            console.log(result.data);
            console.log('')
            this.montarGrafico(result.data);
        }).catch(err => {
            this.setState({failureMessage: 'Erro ao exibir gráfico'});
        });
    }
    labelsMeses() {
        return ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    }
    dataDefault() {
        return Array(12).fill(0);
    }
    labelsCategorias(data) {
        return data.map(el => el.categoria);
    }
    montarGrafico(data) {
        let dados = [];
        let labels = [];
        let label = "Vendas";
        let datasets = null;
        if(this.state.tipoGrafico === enumTiposGraficos.COMPRASMENSAISNOANO ||
        this.state.tipoGrafico === enumTiposGraficos.VENDASMENSAISNOANO) {
            dados = this.dataDefault();
            
            for(let el of data)
                dados[el.mes - 1] = el.quantidade;
            labels = this.labelsMeses();
            if(this.state.tipoGrafico === enumTiposGraficos.COMPRASMENSAISNOANO)
                label = "Compras";
        }
        else
        if(this.state.tipoGrafico === enumTiposGraficos.VENDASPORCATEGORIA) {
            for(let el of data) {
                labels.push(el.categoria);
                dados.push(el.quantidade);
            }
        }
        else
        if(this.state.tipoGrafico === enumTiposGraficos.VENDASPORFORMAPAGAMENTO) {
            for(let el of data) {
                labels.push(el.formaPagamento);
                dados.push(el.quantidade);
            }
        }
        else
        if(this.state.tipoGrafico === enumTiposGraficos.VENDASFEITASPAGAS) {
            let dados1 = this.dataDefault();
            let dados2 = this.dataDefault();

            for(let el of data) {
                labels = this.labelsMeses();
                dados1[el.mes - 1] = el.quantidadePago;
                dados2[el.mes - 1] = el.quantidadeNaoPago;
                datasets = [{
                    label: "Vendas pagas",
                    data: dados1,
                    backgroundColor: "#54b6b6"
                }, {
                    label: "Vendas não pagas",
                    data: dados2,
                    backgroundColor: "#b65454"
                }]
            }
        }
        this.setState({heightCanvas: ""})
        const myChartRef = this.chartRef.current.getContext("2d");
        if(datasets === null)
            datasets = [{
                label: label,
                data: dados,
                backgroundColor: '#54b6b6'
            }];

        let chart = new Chart(myChartRef, {
            type: "line",
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            fixedStepSize: 1
                        }
                    }],
                }
            }
        });
        if(this.state.currentChart !== null)
            this.state.currentChart.destroy();
        this.setState({currentChart: chart})
    }

    componentDidMount() {
    }
    
    render() {
        return (
            <div className="container">
                <div className="card bg-light mb-6">
                    
                    <div className="card-header">Estatísticas do sistema</div>
                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <Select
                                    columnSettings="col-sm-12 col-md-4"
                                    inputId="tipografico"
                                    labelName="Tipo de gráfico"
                                    inputValue={this.state.tipoGrafico}
                                    handleChange={e => this.setState({tipoGrafico: parseInt(e.target.value)})}
                                    lista={ tiposGraficos }
                                />
                                {(
                                    this.state.tipoGrafico === enumTiposGraficos.COMPRASMENSAISNOANO ||
                                    this.state.tipoGrafico === enumTiposGraficos.VENDASFEITASPAGAS ||
                                    this.state.tipoGrafico === enumTiposGraficos.VENDASMENSAISNOANO
                                ) ? (
                                    <Input
                                        columnSettings="col-sm-12 col-md-2"
                                        handleChange={e => this.setState({ano: e.target.value})}
                                        inputName="Ano"
                                        inputValue={this.state.ano}
                                        inputId="ano"
                                    />
                                ) : ""}
                                
                            </div>
                            {/* <FailureMessage failureMessage={this.state.failureMessage}/> */}
                            <div className="botoes-form">
                                <InputButton buttonName="Gerar gráfico" estilo="btn-primary" handleClick={this.gerarRelatorio}/>
                            </div>
                            <canvas
                                id="myChart"
                                ref={this.chartRef}
                                height={this.state.heightCanvas}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;