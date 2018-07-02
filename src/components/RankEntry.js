import React, { Component } from 'react';
import '../css/RankEntry.css';

class RankEntry extends Component {
  render() {
    return (
      <div>
        <img
          className='RankEntryImage'
          src={this.props.src}
          alt={this.props.src}
        />
        <span className='RankEntryVote'>{this.props.vote}</span>
      </div>
    );
  }
}

export default RankEntry;
