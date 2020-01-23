import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
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

const Select = styled.select`
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
    const [member, setMember] = useState({})
    const [battles, setBattles] = useState([]);
    const [battleInvitations, setBattleInvitations] = useState([]);
    const [challengers, setChallengers] = useState([]);
    const [filteredChallengers, setFilteredChallengers] = useState([]);
    const [selectedChallenger, setSelectedChallenger] = useState(null);
    const [createBattleView, setCreateBattleView] = useState(false);
    const [battleName, setBattleName] = useState('');
    const [battleType, setBattleType] = useState('Cycling');
    const [battleDuration, setBattleDuration] = useState('Monthly');
    const [userSearch, setUserSearch] = useState('');

    useEffect(() => {
        axios.get('/api/user').then(res => {
            setMember(res.data);
            axios.get(`/api/battles/${res.data.user_id}`).then(battles => {
                setBattles(battles.data.filter(element => {
                    return element.accepted === true
                }))
                setBattleInvitations(battles.data.filter(element => {
                   return element.accepted === false 
                }))
            })
        }).catch(err => console.log(err));
    }, [])

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

    const toggleView = () => {
        setCreateBattleView(!createBattleView)
    }

    const createBattle = () => {
        axios.post(`/api/battle/${member.user_id}`, {battleName, battleType, battleDuration, challenger: selectedChallenger.user_id})
        .then(res => toggleView())
        .catch(err => console.log(err));
    }

    const acceptBattle = (battleId) => {
        axios.put(`/api/invitation/${member.user_id}`, {battleId})
        .then(res => {
            axios.get(`/api/battles/${member.user_id}`).then(battles => {
                setBattles(battles.data.filter(element => {
                    return element.accepted === true
                }))
                setBattleInvitations(battles.data.filter(element => {
                   return element.accepted === false 
                }))
            })
        }).catch(err => console.log(err))
    }

    const declineBattle = (battleId) => {
        axios.delete(`/api/invitation/${battleId}`)
        .then(res => {
            axios.get(`/api/battles/${member.user_id}`).then(battles => {
                setBattles(battles.data.filter(element => {
                    return element.accepted === true
                }))
                setBattleInvitations(battles.data.filter(element => {
                   return element.accepted === false 
                }))
            })
        }).catch(err => console.log(err))
    }

    const mappedUsers = filteredChallengers.map((challenger, i) => {
        return (
            <p key={i} onClick={() => setSelectedChallenger(challenger)}>{challenger.username}</p>
        )
    })

    const mappedBattles = battles.map((battle, i) => {
        return (
            <p key={i}>
                <Link to={`/battle/${battle.battle_id}`}>{battle.battle_name}</Link>
            </p>
        )
    })

    const mappedBattleInvitations = battleInvitations.map((invitation, i) => {
        return (
            <div key={i}>
                <p>You have been challenged!</p>
                <p>{invitation.battle_name}</p>
                <FormButton onClick={() => acceptBattle(invitation.battle_id)}>Accept</FormButton>
                <FormButton onClick={() => declineBattle(invitation.battle_id)}>Decline</FormButton>
            </div>
        )
    })

    return (
        <Container>
            {battleInvitations.length !== 0
            ? (<>{mappedBattleInvitations}</>)
            : null
            }
            <Button onClick={toggleView}>+ Create Battle</Button>
            {createBattleView
            ? (<>
                <Modal>
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
                    <FormButton onClick={toggleView}>Cancel</FormButton>
                </Modal>
               </>)
            : (<>
                {mappedBattles}
               </>)
            }

        </Container>
    )
}

export default Dashboard;