import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Input, Select, FormButton} from './CreateBattleModalStyles';

const CreateBattleModal = props => {
    const [challengers, setChallengers] = useState([]);
    const [filteredChallengers, setFilteredChallengers] = useState([]);
    const [selectedChallenger, setSelectedChallenger] = useState(null);
    const [battleName, setBattleName] = useState('');
    const [battleType, setBattleType] = useState('Cycling');
    const [battleDuration, setBattleDuration] = useState('Monthly');
    const [userSearch, setUserSearch] = useState('');

    useEffect(() => {
        axios.get('/api/users').then(res => {
            setChallengers(res.data);
        }).catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if(userSearch){
            setFilteredChallengers(challengers.filter(element => element.username.includes(userSearch)))
        } else {
            setFilteredChallengers([])
        }
    }, [userSearch])

    const createBattle = () => {
        axios.post(`/api/battle/${props.user.user_id}`, {battleName, battleType, battleDuration, challenger: selectedChallenger.user_id})
        .then(res => props.toggleFn())
        .catch(err => console.log(err));
    }

    const mappedUsers = filteredChallengers.map((challenger, i) => {
        return (
            <p key={i} onClick={() => setSelectedChallenger(challenger)}>{challenger.username}</p>
        )
    })

    return (
        <Container>
            <Input value={battleName} onChange={(e) => setBattleName(e.target.value)}/>
            <Select value={battleType} onChange={(e) => setBattleType(e.target.value)}>
                <option value='Cycling'>Cycling</option>
                <option value='Running'>Running</option>
                <option value='Hiking'>Hiking</option>
            </Select>
            <Select value={battleDuration} onChange={(e) => setBattleDuration(e.target.value)}>
                <option value='Monthly'>Monthly</option>
                <option value='Weekly'>Weekly</option>
                <option value='Daily'>Daily</option>
            </Select>
            {selectedChallenger !== null
            ? (<>
                <p>{selectedChallenger.username}</p>
               </>)
            : (<>
                <Input value={userSearch} onChange={(e) => setUserSearch(e.target.value)}/>
                    {mappedUsers}
               </>)
            }                    
            <FormButton onClick={createBattle}>Create</FormButton>
            <FormButton onClick={props.toggleFn}>Cancel</FormButton>
        </Container>
    )
}

export default CreateBattleModal;