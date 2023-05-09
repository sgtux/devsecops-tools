import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'

import { EditAsvsItemModal } from './EditAsvsItemModal/EditAsvsItemModal'
import { Table, InfoButton } from './styles'

const _ALL = 'Todos'

export function AsvsTable() {

    const [items, setItems] = useState([])
    const [filtered, setFiltered] = useState([])
    const [names, setNames] = useState([])
    const [l123, setL123] = useState(_ALL)
    const [name, setName] = useState(_ALL)
    const [editItem, setEditItem] = useState(null)

    useEffect(() => {
        refresh()
    }, [])

    useEffect(() => {
        let arr = items.filter(p => ((p.L1 && l123 === 'L1') || (p.L2 && !p.L1 && l123 === 'L2') || (p.L3 && !p.L2 && l123 === 'L3') || l123 === _ALL)
            && (name === _ALL || name === p.Name))
        arr.sort((a, b) => a.Id > b.Id ? 1 : a.Id < b.Id ? -1 : 0)
        setFiltered(arr)
    }, [l123, items, name])

    useEffect(() => {
        const v = [_ALL].concat(items.map(p => p.Name).filter((p, i, a) => i === a.indexOf(p)))
        console.log(v)
        setNames(v)
    }, [items])

    function refresh() {
        axios.get('/api/items')
            .then(res => setItems(res.data))
            .catch(err => console.log(err))
    }

    function joinLevel(item) {
        const arr = []
        if (item.L1)
            arr.push('L1')
        if (item.L2)
            arr.push('L2')
        if (item.L3)
            arr.push('L3')
        return arr.join(', ')
    }

    function saveItem(item) {
        axios.post('/api/items', item)
            .then(res => { setEditItem(null); refresh() })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <EditAsvsItemModal onClose={() => setEditItem(null)}
                item={editItem}
                onSave={item => saveItem(item)} />

            <div>
                <span>Sessão: </span>
                <select style={{ marginRight: '10px' }} onChange={e => setName(e.target.value)}>
                    {names.map((p, i) =>
                        <option key={'' + i}>{p}</option>
                    )}
                </select>
            </div>
            <br />

            <div>
                <span>Nível: </span>
                <select style={{ marginRight: '10px' }} onChange={e => setL123(e.target.value)}>
                    {[_ALL, 'L1', 'L2', 'L3'].map((p, i) =>
                        <option key={'' + i}>{p}</option>
                    )}
                </select>
            </div>
            <br />

            <InfoButton>Export as MD</InfoButton>

            <div style={{ margin: 20 }}>
                <span>Count: {filtered.length}</span>
            </div>
            <Table border="1">
                <thead>
                    <tr>
                        <th>Sessão</th>
                        <th>Item</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Nível</th>
                        <th>CWE</th>
                        <th>NIST</th>
                        <th>Como estamos?</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((p, i) =>
                        <tr key={'' + i} >
                            <td>{p.Section}</td>
                            <td>{p.Item}</td>
                            <td>{p.Name}</td>
                            <td>
                                <div style={{ marginTop: 20 }}>
                                    {p.Translate || p.Description}
                                </div>
                                <hr />
                                {
                                    p.Why &&
                                    <div style={{ fontSize: 12 }}>
                                        <span style={{ fontWeight: 'bold' }}>Por que?</span> {p.Why}
                                    </div>
                                }
                                {
                                    p.HowWeAre &&
                                    <div style={{ marginBottom: 20, fontSize: 12 }}>
                                        <span style={{ fontWeight: 'bold' }}>Como estamos?</span> {p.HowWeAre}
                                    </div>
                                }
                                {
                                    p.Recommendation &&
                                    <div style={{ marginBottom: 20, fontSize: 12 }}>
                                        <span style={{ fontWeight: 'bold' }}>Recomendação:</span> {p.Recommendation}
                                    </div>
                                }
                            </td>
                            <td>{joinLevel(p)}</td>
                            <td>{p.CWE}</td>
                            <td>{p.NIST}</td>
                            <td>{p.Ok}</td>
                            <td>
                                <InfoButton onClick={() => setEditItem(p)}>
                                    <FaEdit />
                                </InfoButton>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <span>Count: {filtered.length}</span>
        </div>
    )
}