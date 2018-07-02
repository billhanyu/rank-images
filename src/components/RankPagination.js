import React, { Component } from 'react';
import Pagination from 'react-paginate';
const { paginationDisplayCount } = require('../config/config');

class PostPagination extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.props.history.push(`/rank?page=${page}`);
  }

  render() {
    return (
      <Pagination
        pageCount={this.props.total}
        current={this.props.current}
        display={paginationDisplayCount}
        onChange={this.changePage}
      />
    );
  }
}

export default PostPagination;
