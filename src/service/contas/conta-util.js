export const formatTagText = (tag) => {
    if(tag === "CARTAO_CREDITO") {
        return "Cartão Credito"
    }

    if(tag === "DINHEIRO") {
        return "Dinheiro"
    }

    if(tag === "POUPANCA") {
        return "Conta poupanca"
    }

    if(tag === "CORRENTE") {
        return "Conta corrente"
    }

    if(tag === "INVESTIMENTO") {
        return "Investimentos"
    }

    return tag
}

export const formatTagColor = (tag) => {
    if(tag === "CARTAO_CREDITO") {
        return "#f27966"
    }

    if(tag === "DINHEIRO") {
        return "#2eea8c"
    }

    if(tag === "POUPANCA") {
        return "#2ea88c"
    }

    if(tag === "CORRENTE") {
        return "#f2c3ff"
    }

    if(tag === "INVESTIMENTO") {
        return "#a560cb"
    }


    return "warning"
}

export const getAccountTypesOptions = () => {
    return  [
        {
            text: 'Cartão de credito',
            value: 'CARTAO_CREDITO'
        },
        {
            text: 'Dinheiro',
            value: 'DINHEIRO'
        },
        {
            text: 'Conta corrente',
            value: 'CORRENTE'
        },
        {
            text: 'Conta poupanca',
            value: 'POUPANCA'
        },
        {
            text: 'Investimento',
            value: 'INVESTIMENTO'
        }
    ]
}