export const url = "https://deswebfullstack-server.herokuapp.com";

// export const url = Object.freeze("http://192.168.0.10:5000");
export const formTypes = Object.freeze({
    LOGIN: 1,
    BASICO: 2
});
export const tiposGraficos = Object.freeze([
    { codigo: 1, descricao: 'Vendas mensais no ano', url: "/vendas/relatorioVendasPorAno", filtroPorAno: true },
    { codigo: 2, descricao: 'Compras mensais no ano', url: "/compras/relatorioComprasPorAno", filtroPorAno: true },
    { codigo: 3, descricao: 'Vendas feitas/pagas', url: "/vendas/relatorioPagosNaoPagosPorMesAno", filtroPorAno: true },
    { codigo: 4, descricao: 'Vendas por categoria', url: "/vendas/relatorioVendasPorCategoria", filtroPorAno: false},
    { codigo: 5, descricao: 'Vendas por formas de pagamento', url: "/vendas/relatorioVendasPorFormaDePagamento", filtroPorAno: false }
]);
export const enumTiposGraficos = Object.freeze({
    VENDASMENSAISNOANO: 1,
    COMPRASMENSAISNOANO: 2,
    VENDASFEITASPAGAS: 3,
    VENDASPORCATEGORIA: 4,
    VENDASPORFORMAPAGAMENTO: 5
});