import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Login extends Component {
  render() {
    return(
      <div className="login-container">
        <h1 className="page-title">Todo App Redux Style</h1>
        <div className="row">
          <div className="col-sm-1 col-md-2 col-lg-4"></div>
          <div className="col-sm-10 col-md-6 col-lg-4">
            <div className="card">
              <div className="card-header">
                Useful and slik Todo 
              </div> 
              <div className="card-block">
                <h4 className="card-title">Login</h4>
                <p className="card-text">Use github to login</p>
                <button className="btn btn-info btn-lg">Login with github</button>
              </div>
            </div>
          </div>
          <div className="col-sm-1 col-md-2 col-lg-4"></div>
        </div>
      </div>
    )
  }
}
export default connect()(Login)