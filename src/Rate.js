import './Rate.css';
import React, { Component } from 'react';
import { nextEntryForUser, rateEntry } from './api';
const { baseURL } = require('./config');

class Rate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      second: '',
      queueEntryId: '',
    };
  }

  componentWillMount() {
    nextEntryForUser(this.props.match.params.userid)
      .then(response => {
        console.log(response.data);
        const entry = response.data;
        this.setState({
          first: entry.first,
          second: entry.second,
          queueEntryId: entry._id,
        });
      })
      .catch(() => {
        alert('Error. Wrong user id?');
      });
  }

  rate(votedFor) {
    rateEntry(this.props.match.params.userid, this.state.queueEntryId, votedFor)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        alert('rating failed');
      });
  }

  render() {
    return (
      <div>
        <h1>left or right?</h1>
        {
          this.state.first &&
          <img
            className='candidate candidate-left'
            src={`${baseURL}/image/${this.state.first}`}
            onClick={() => this.rate(0)}
            alt='left'
          />
        }
        {
          this.state.second &&
          <img
            className='candidate candidate-right'
            src={`${baseURL}/image/${this.state.second}`}
            onClick={() => this.rate(0)}
            alt='right'
          />
        }
      </div>
    );
  }
}

export default Rate;
