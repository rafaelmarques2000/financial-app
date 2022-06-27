export const formatMoney = (value, currency) => {
    return value.toLocaleString("pt-BR", {style:"currency",currency})
}