import React, { Component } from 'react'
import { ClipLoader } from 'react-spinners';

export default class LoadingSpinner extends Component {
  render() {
    return (
      <div className="loading">
        <ClipLoader size={50} color={'#4fb6ff'} />
      </div>
    )
  }
}
