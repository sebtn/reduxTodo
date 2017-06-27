import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import * as Redux from 'react-redux'
// import *as actions from '../../actions'

class Login extends Component {

/*--------------------------------------------------------------*/
/*  onLogin = () => {
    let {dispatch} = this.props
    dispatch(actions.startLogin())
  }*/
/*--------------------------------------------------------------*/

  render() {
    return(
      <div className="login-container">
        <h1 className="page-title">Todo App Redux Style</h1>
        <div className="row">
          <div className="col-sm-1 col-md-2 col-lg-4"></div>
          <div className="col-sm-10 col-md-6 col-lg-4">
            <div className="card">
              <div className="card-header">
                <h3>Log In</h3>
              </div> 
              <div className="card-block">
                <h5 className="card-title">Use github to login</h5>
                <button className="btn btn-info btn-lg">Login with github</button>
              {/*<button 
                className="btn btn-info btn-lg" 
                onClick={this.onLogin}>
                Login with github
              </button>*/}
              </div>
            </div>
          </div>
          <div className="col-sm-1 col-md-2 col-lg-4"></div>
        </div>
      </div>
    )
  }
}
export default Login
// export default Redux.connect()(Login)