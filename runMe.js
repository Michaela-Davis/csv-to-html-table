#!/usr/bin/env node
const csv = require("csvtojson");
const fs = require('fs');

csv()
.fromFile(`${__dirname}/dependencies.csv`)
.then((json)=>{
    // console.log(json);
    const html = json.map(row => {
        let repository = row.repository;
        if (row.repository.includes("ssh://")){
            repository = row.repository.replace("ssh://git@","https://www.");
        }
        // console.log(row);
        return `
        <tr>
            <td>${row.name} v${row.version}</td>
            <td>${row.summary}</td>
            <td>${repository.includes("http") ? 
                `<a href="${repository}">${repository}</a>` :
                `none`
            }</td>
        </tr>
            `
    }).join('');
    const htmlWrapped = `
    <table id="dependencies">
    <tbody>
        <thead>
            <tr>
                <th>Name v#</th>
                <th>License</th>
                <th>Respository</th>
            </tr>
        </thead>
        ${html}
    </tbody>
    </table>`
    fs.writeFileSync('./index.html', htmlWrapped);
})