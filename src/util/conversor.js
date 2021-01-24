const toRealFormat = value => {
    // value = addColon(value);
    return !value ? '' : value.toFixed(2).replace('.', ',');
}

const toRealMask = value => {
    value = addColon(value);
    return !value ? '' : value.toFixed(2).replace('.', ',');
}

const addColon = value => {
    return value / 100;
}

const pointToColon = value => {
    if(value)
        return value.toString().replace('.', ',');
}

const colonToPoint = value => {
    if(value)
        return value.toString().replace(',', '.');
}

const toCpfFormat = value => {
    if(value === '')
        return '';
    
    let espacos = 11 - value.length;
    let pontos = 0;
    let strResultante = '';

    for(let i = 1; i <= 11; i++) {
        if(i % 3 === 0) {
            if(pontos < 2) {
                strResultante+='.';
                pontos++;
            }
            else
                strResultante+='-';
            if(espacos > 0)
                strResultante+=' ';
            else
                value = value.slice(0, 0 - (value.length - 1))
        }
    }
    return strResultante;
}

const conteudoAExportar = { toRealFormat, toRealMask, addColon, toCpfFormat, pointToColon, colonToPoint };

export { toRealFormat, toRealMask, addColon, toCpfFormat, pointToColon, colonToPoint };
export default conteudoAExportar;
