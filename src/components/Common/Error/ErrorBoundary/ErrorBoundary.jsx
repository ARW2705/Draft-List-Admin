import React, { Component } from 'react'

import { error$, clearError, reportError } from '../../../../services/error/error.service'

import ErrorPage from '../ErrorPage/ErrorPage'


class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onErrorDismiss: props.onErrorDismiss,
      error: null
    }
    this.dismissError = this.dismissError.bind(this)
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidMount() {
    error$.subscribe({
      next: error => {
        if (error) reportError(error)
        this.setState(prevProps => ({ ...prevProps, error }))
      }
    })
  }

  componentDidCatch(error, errorInfo) {
    reportError(error, errorInfo)
  }

  dismissError() {
    clearError()
    this.state.onErrorDismiss()
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorPage
          error={ this.state.error }
          onDismiss={ this.dismissError }
        />
      )
    }

    return this.props.children
  }
}


export default ErrorBoundary
