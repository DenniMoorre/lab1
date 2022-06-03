const axios = require('axios');
const {load} = require ('cheerio');


const incomes = [
    {currency: 'EUR', summ: 400, date: "2020-03-30"},
    {currency: 'EUR', summ: 500, date: "2020-02-20"},
    {currency: 'EUR', summ: 458, date: "2020-01-31"},
];

findRate();

function findRate() {
    let urls = [];
    for (let i = 0; i < incomes.length; i++)
        urls[i] = `https://bankchart.com.ua/spravochniki/arkhiv_kursov_valyut/${incomes[i].date}`

    let promise = Promise.all(urls.map(url => axios.get(url)))
        .then((response) => {
            for (let i = 0; i < response.length; i++) {
                let $ = load (response[i].data);
                incomes[i].rate = $(`div.col.col-currency-rate`).eq(18).text().split('\n')[1]
                incomes[i].rate =  incomes[i].rate.replace(/\s/g, '');
                incomes[i].rate =  incomes[i].rate.replace("\,",".");
                incomes[i].rate = Number( incomes[i].rate)
            }
            tax5Percent();
        });
}

function tax5Percent(){
    let result = {},initialValue = 0;

    result.totalEarned = incomes.reduce( (accumulator , currentValue) => accumulator  + currentValue.summ, initialValue)
    result.totalEarnedUAN = incomes.reduce( (accumulator , currentValue) => accumulator  + (currentValue.summ * currentValue.rate), initialValue)
    result.tax5percent = result.totalEarnedUAN * 0.05;
    result.rawData = incomes;
    console.log(result)
}