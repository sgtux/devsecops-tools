import { useState, useEffect } from 'react'

import { Overlay, Container, Title } from './styles'
import { LightButton, SuccessButton, CloseButton } from '../../components'

export function EditAsvsItemModal({ item, onClose, onSave }) {
    const [translate, setTranslate] = useState('')
    const [why, setWhy] = useState('')
    const [howWeAre, setHowWeAre] = useState('')
    const [ok, setOk] = useState('')
    const [recommendation, setRecommendation] = useState('')

    useEffect(() => {
        if (item) {
            setTranslate(item.Translate || '')
            setWhy(item.Why || '')
            setHowWeAre(item.HowWeAre || '')
            setOk(item.Ok || '')
            setRecommendation(item.Recommendation || '')
        }
    }, [item])

    function save() {
        onSave({
            ...item,
            Translate: translate,
            Why: why,
            HowWeAre: howWeAre,
            Ok: ok,
            Recommendation: recommendation
        })
    }

    return (
        <Overlay show={item}>
            <Container>
                <Title>Editar Item<CloseButton onClick={() => onClose()} /></Title>
                <div>
                    <span>{(item || {}).Item}</span> - <span>{(item || {}).Name}</span>
                </div>
                <div>
                    <span>{(item || {}).Description}</span>
                </div>
                <div>
                    <span>Descrição: </span><br />
                    <textarea value={translate} onChange={e => setTranslate(e.target.value)}></textarea>
                </div>
                <div>
                    <span>Por que? </span><br />
                    <textarea value={why} onChange={e => setWhy(e.target.value)}></textarea>
                </div>
                <div>
                    <span>Estamos de acordo? </span>
                    <input checked={ok === 'ok'} type="radio" name="howWeAre" onChange={e => setOk('ok')} />Sim
                    <input checked={ok === 'nok'} type="radio" name="howWeAre" onChange={e => setOk('nok')} />Não
                    {ok && <LightButton style={{ marginLeft: 10, marginBottom: 10 }} onClick={() => setOk('')}>Limpar</LightButton>}
                    <br />
                    {ok === 'nok' && <textarea value={howWeAre} onChange={e => setHowWeAre(e.target.value)}></textarea>}
                </div>
                <div>
                    <span>Recomendação: </span><br />
                    <textarea value={recommendation} onChange={e => setRecommendation(e.target.value)}></textarea>
                </div>
                <div>
                    <LightButton onClick={() => onClose()}>Cancelar</LightButton>
                    <SuccessButton style={{ marginLeft: 10 }} onClick={() => save()}>Salvar</SuccessButton>
                </div>
            </Container>
        </Overlay>
    )
}