import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    height: 100vh;
    width: 100%;
`

const Button = styled.button`
    height: 50px;
    width: 95%;
    font-size: 18px;
`

const Modal = styled.div`
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
`

const Input = styled.input`
    height: 35px;
    width: 80%;
    font-size: 16px;
`

const FormButton = styled.button`
    height: 35px;
    width: 80%;
    font-size: 16px;
`

const Dashboard = props => {
    const [battles, setBattles] = useState([]);
    const [createBattleView, setCreateBattleView] = useState(false);
    const [battleName, setBattleName] = useState('');
    const [battleType, setBattleType] = useState('');
    const [battleDuration, setBattleDuration] = useState('');

    const toggleView = () => {
        setCreateBattleView(!createBattleView)
    }

    return (
        <Container>
            <Button onClick={toggleView}>+ Create Battle</Button>
            {createBattleView
            ? (<>
                <Modal>
                    <Input />
                    <Input />
                    <Input />
                    <FormButton>Create</FormButton>
                </Modal>
               </>)
            : null
            }

        </Container>
    )
}

export default Dashboard;