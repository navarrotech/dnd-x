// Copyright © 2024 Navarrotech

import { Component } from 'react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, }
  }

  componentDidCatch(error, info) {
    console.log({ error, info, })
    // Display fallback UI
    this.setState({ hasError: true, })
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <>
        <h1
          className="title is-size-1 has-text-primary has-text-centered"
        >
            Something went wrong.
        </h1>
        <h2 className="subtitle is-size-3 has-text-centered">Please try again in a bit.</h2>
      </>
    }
    return this.props.children
  }
}
