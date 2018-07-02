import React, { Component } from 'react';
import '../css/Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
    };
    this.onChangeUserid = this.onChangeUserid.bind(this);
    this.onClickGo = this.onClickGo.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChangeUserid(event) {
    this.setState({
      userid: event.target.value,
    });
  }

  onClickGo() {
    this.props.history.push(`/rate/${this.state.userid}`);
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.onClickGo();
    }
  }

  render() {
    return (
      <div>
        <h1>Rank Images</h1>
        <div className='useridInputContainer'>
          <input
            className='useridInputTextBox'
            placeholder='your unique user id'
            onKeyDown={this.onKeyDown}
            onChange={this.onChangeUserid}
          />
        </div>
        <div className='NavigationLinks'>
          <Link to='/rank'>Overall Ranking</Link>
        </div>
      </div>
    );
  }
}

export default Home;
