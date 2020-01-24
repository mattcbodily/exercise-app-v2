import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    height: 125px;
    width: 100%;
    border-bottom: 2px solid black;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 25px;
    position: fixed;
    top: 0;
    background-color: #E0F3E8;
`

const Img = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: 1px solid black;
`

const Profile = props => {
    const [member, setMember] = useState({});

    useEffect(() => {
        axios.get('/api/user')
        .then(res => setMember(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <Img src={member.user_image} alt={member.username}/>
        </Container>
    )
}

export default Profile;