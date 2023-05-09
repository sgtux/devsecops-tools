import styled from 'styled-components'
import { FaWindowClose } from 'react-icons/fa'

export const AsvsNewItemContainer = styled.div`
    margin: 10px;
`

export const Table = styled.table`
    margin-left: 20px;
    width: 95%;
    & > tbody > tr > td, & > thead > tr > th {
            text-align: center;
            padding: 8px;
            color: #d0d0d0;
        }
    }
    & > tbody > tr:nth-child(odd) {
        background-color: #555;
    }
`

const Button = styled.button`
    border-radius: 6px;
    padding: 8px;
    font-size: 12px;
    box-shadow: 1px ​1px 6px black;
    border: none;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        opacity: .8;
    }
    &:disabled {
        opacity: .7;
        cursor: default;
    }
`

export const SuccessButton = styled(Button)`
    color: white;
    background-color: #28a745;
`

export const InfoButton = styled(Button)`
    color: white;
    background-color: #17a2b8;
`

export const PrimaryButton = styled(Button)`
    color: white;
    background-color: #007bff;
`

export const DangerButton = styled(Button)`
    color: white;
    background-color: #dc3545;
`

export const LightButton = styled(Button)`
    color: #666;
    background-color: #f8f9fa;
`

export const CloseButton = styled(FaWindowClose)`
    cursor: pointer;
    opacity: .8;
    color: red;
    transition: 200ms;
    &:hover {
        opacity: .5;
    }
`