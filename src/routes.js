import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Dashboard from './Components/Dashboard/Dashboard';
import Battle from './Components/Battle/Battle';
import FullProfile from './Components/FullProfile/FullProfile';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/battle/:id' component={Battle}/>
        <Route path='/profile' component={FullProfile}/>
    </Switch>
)