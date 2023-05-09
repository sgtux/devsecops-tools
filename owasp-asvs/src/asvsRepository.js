const fs = require('fs')
const reader = require('read-excel-file/node')

const XLSX_PATH = './Owasp-ASVS-4.0.xlsx'
const JSON_PATH = './asvs.json'

let items = []

const compareItemsToSort = (a, b) => {
    const arrA = a.Item.split('.').map(p => Number(p))
    const arrB = b.Item.split('.').map(p => Number(p))
    if (arrA[0] > arrB[0])
        return 1
    else if (arrA[0] < arrB[0])
        return -1
    else if (arrA[1] > arrB[1])
        return 1
    else if (arrA[1] < arrB[1])
        return -1
    else if (arrA[2] > arrB[2])
        return 1
    else if (arrA[2] < arrB[2])
        return -1
    else
        return 0
}

if (!fs.existsSync(JSON_PATH)) {
    const x = reader(XLSX_PATH).then(rows => {
        for (let i = 1; i < rows.length; i++) {
            const obj = {}
            rows[0].forEach((prop, j) => obj[prop] = rows[i][j])
            items.push(obj)
            obj.L1 = !!obj.L1
            obj.L2 = !!obj.L2
            obj.L3 = !!obj.L3
        }
        fs.writeFileSync(JSON_PATH, JSON.stringify(items))
    })
} else
    items = JSON.parse(fs.readFileSync(JSON_PATH, { encoding: 'utf-8' }))

const getAll = () => items

const save = item => {
    const itemDb = items.filter(p => p.Item === item.Item)[0]
    const prepareItemToSort = p => Number(p.Item.replace(/[.]/g, ''))
    if (itemDb) {
        items = items.filter(p => p.Item !== item.Item)
        items.push(item)
    } else
        items.push(item)
    items.sort(compareItemsToSort)
    items.forEach((p, i) => p.Id = i + 1)
    fs.writeFileSync(JSON_PATH, JSON.stringify(items))
}

const remove = key => {
    items = items.filter(p => p.Item !== key)
    fs.writeFileSync(JSON_PATH, JSON.stringify(items))
}

module.exports = {
    getAll,
    save,
    remove
}