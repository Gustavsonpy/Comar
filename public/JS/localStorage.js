//ARMAZENAMENTO EM LOCAL STORAGE

//SALVAR OS DADOS
export function saveData(arr){
    console.log(arr)
    JSON.stringify(arr)
    localStorage.setItem('data', JSON.stringify(arr))
}

//SALVAR O PROJETO ATUAL SENDO EXIBIDO
export function saveSelect(value){
    JSON.stringify(value)
    localStorage.setItem('select', value)
}

//PUXAR O PROJETO ATUAL
export function getSelect(){
    return JSON.parse(localStorage.getItem('select'))
}

//PUXAR OS DADOS
export function getData(){
    return JSON.parse(localStorage.getItem('data'))
}

