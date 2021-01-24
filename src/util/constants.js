// const url = "https://deswebfullstack-server.herokuapp.com";

export const url = Object.freeze("http://localhost:5000");
export const formTypes = Object.freeze({
    LOGIN: 1,
    BASICO: 2
});
export const tiposGraficos = Object.freeze([
    { codigo: 1, descricao: 'Vendas mensais no ano', url: "/vendas/relatorioVendasPorAno"},
    { codigo: 2, descricao: 'Compras mensais no ano', url: "/compras/relatorioComprasPorAno" },
    { codigo: 3, descricao: 'Vendas feitas/pagas', url: "/vendas/relatorioPagosNaoPagosPorMesAno" },
    { codigo: 4, descricao: 'Vendas por região', url: "/" },
    { codigo: 5, descricao: 'Vendas por categoria', url: "/vendas/relatorioVendasPorCategoria" },
    { codigo: 6, descricao: 'Vendas por formas de pagamento', url: "/vendas/relatorioVendasPorFormaDePagamento" },
]);
export const enumTiposGraficos = Object.freeze({
    VENDASMENSAISNOANO: 1,
    COMPRASMENSAISNOANO: 2,
    VENDASFEITASPAGAS: 3,
    VENDASPORREGIAO: 4,
    VENDASPORCATEGORIA: 5,
    VENDASPORFORMAPAGAMENTO: 6
});