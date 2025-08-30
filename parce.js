const fs = require('fs');

// Чтение файла
const rawData = fs.readFileSync('data.json', 'utf8');
const products = JSON.parse(rawData);

const result = [];
for (const product of products) {
    const price = parseFloat(product.parameters[0].cost);
        result.push({
            title: product.name,
            price: price
        });
}

// Запись результата
fs.writeFileSync('products.json', JSON.stringify(result, null, 2), 'utf8');
console.log('Готово!');