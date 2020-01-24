import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: #E0F3E8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-bottom: 70px;
`

export const H3 = styled.h3`
    font-size: 28px;
    font-weight: bold;
`

export const Input = styled.input`
    height: 35px;
    width: 80%;
    font-size: 16px;
    background-color: #E0F3E8;
    box-sizing: border-box;
    border: 1px solid gray;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 5px;
`

export const Select = styled.select`
    height: 35px;
    width: 80%;
    font-size: 16px;
    background-color: #E0F3E8;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 5px;
`

export const Button = styled.button`
    height: 35px;
    width: 80%;
    font-size: 16px;
    background-color: #289B4A;
    color: white;
    border-radius: 5px;
    border: none;
    margin-bottom: 5px;
`