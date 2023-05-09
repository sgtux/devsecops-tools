import styled from 'styled-components'

export const Overlay = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    overflow: hidden;
    display: flex;
    transition: 300ms;
    ${({ show }) => show ? 'width: 100%; opacity: 1; height: 100%;' : 'width: 0; opacity: 0; height: 0;'}
`


export const Container = styled.div`
    width: 600px;
    background-color: #3b3b3b;
    margin: 0 auto;
    border-radius: 8px;
    padding: 20px;
    & > div {
        margin-top: 10px;
    }
    & > div > textarea {
        width: 90%;
        resize: none;
        border-radius: 8px;
        border: none;
        padding: 4px;
    }
`

export const Title = styled.h2`
    margin: 0;
    background-color: white;
    color: #666;
    padding: 10px;
    box-shadow: 0 2px 5px #2c2c2c;
    display: flex;
    justify-content: space-between;
`
