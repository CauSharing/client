import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import './LogIn.css'

class Title extends Component{
    render(){
        return(
            <div className='Title'>
                <div>{this.props.line1}</div>
                <div>{this.props.line2}</div>
            </div>
        );
    }
}

class SignIn extends Component{
    render(){
        return(
            <div className='SignIn'>
                <form>
                    <input type='text' placeholder='ID'/>
                    <input type='password' placeholder='Password'/>
                </form>
                <button type="submit">Sign in</button>
            </div>
        );
    }
}

class LogInMenu extends Component{
    render(){
        return(
            <div className='Menu'>
                <Link to="/signUp">Sign up</Link>
                <Link to="/">Lost password?</Link>
            </div>
        );
    }
}

class LogIn extends Component{
    constructor(props) {
        super(props);
        this.state={
            title: {line1: "Be Friend", line2: "in Chungang"}
        }
    }
    render(){
        return(
            <div className='LogIn'>
                <Title line1={this.state.title.line1} line2={this.state.title.line2}/>
                <SignIn />
                <LogInMenu />
            </div>
        );
    }
}

export default LogIn;