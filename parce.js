const fs = require('fs');

async function get_html(url) {
    const response = await fetch(url);
    const html = await response.text();
    // fs.writeFileSync('index.html', html, 'utf-8');
    return html
};

async function get_state_json(html) {
    const match = html.match(/<script[^>]*id=["']vike_pageContext["'][^>]*>([\s\S]*?)<\/script>/);
    const state_json_string = match[1].trim();
    const jsonObj = JSON.parse(state_json_string);
    const prettyJson = JSON.stringify(jsonObj, null, 2);
    // fs.writeFileSync('state.json', prettyJson, 'utf-8');

    return jsonObj;
};

async function parce_json(state_json) {
    const menu = state_json.initialStoreState.products.all.map(product => { 
        return {
            name: product.name,
            price: product.parameters[0].cost
        };
    });
    const menuJsonString = JSON.stringify(menu, null, 2);
    // fs.writeFileSync('menu.json', menuJsonString, 'utf-8');
    return menuJsonString;
};

async function run() {
    html = await get_html("https://djari.ru/");
    state_json = await get_state_json(html);
    menu = await parce_json(state_json);
    fs.writeFileSync('menu.json', menu, 'utf-8');

}

run();