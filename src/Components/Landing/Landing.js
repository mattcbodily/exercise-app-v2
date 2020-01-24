import React, {useState} from 'react';
import axios from 'axios';
import {Container, Input, Button, P, Span} from './LandingStyles';
import image from '../../assets/pokemon-grass.png';

const Landing = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verPassword, setVerPassword] = useState('');
    const [registerView, setRegisterView] = useState(false);

    const toggleView = () => {
        setRegisterView(!registerView);
    }

    const handleLogin = () => {
        axios.post('/api/login', {email, password}).then(res => {
            props.history.push('/dashboard')
        }).catch(err => console.log(err));
    }

    const handleRegister = () => {
        if(password === verPassword){
            axios.post('/api/register', {username, email, password}).then(res => {
                props.history.push('/dashboard')
            }).catch(err => console.log(err));
        } else {
            alert('Passwords do not match');
        }
    }

    return (
        <Container>
            <img height='300' src={image} alt='placeholder'/>
            {registerView
                ? <Input value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                : null
            }
            <Input value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            <Input type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            {registerView
                ? (<>
                    <Input type='password' value={verPassword} placeholder='Verify password' onChange={(e) => setVerPassword(e.target.value)}/>
                    <Button onClick={handleRegister}>Register</Button>
                    <P>Have an account? <Span onClick={toggleView}>Login here.</Span></P>
                   </>)
                : (<>
                    <Button onClick={handleLogin}>Login</Button>
                    <P>Don't have an account? <Span onClick={toggleView}>Register here.</Span></P>
                   </>)
            }            
        </Container>
    )
};

export default Landing;