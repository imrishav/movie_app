import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Movie from '../Movie/Movie';
import NotFound from '../elements/NotFound/NotFound'
import Index from '../elements/Index/Index';

const App = () => {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Header />
                <Switch>
                    <Route path='/' component={Index} exact />
                    <Route path='/home' component={Home} exact />
                    <Route path='/:movieId' component={Movie} exact />
                    <Route path= '/NotFound' component={NotFound} exact />
                </Switch>
            </React.Fragment>
        
        </BrowserRouter>
       
    )
}

export default App;