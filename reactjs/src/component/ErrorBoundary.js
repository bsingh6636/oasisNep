import React, { Component } from 'react';

const MAX_RELOADS = 2;
const RELOAD_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RELOAD_DELAY_MS = 3000; // 3 seconds

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.handleReload();
  }

  handleReload = () => {
    const now = Date.now();
    const reloadTimestamps =
      JSON.parse(localStorage.getItem('errorReloads')) || [];

    const recentReloads = reloadTimestamps.filter(
      (timestamp) => now - timestamp < RELOAD_WINDOW_MS
    );

    if (recentReloads.length < MAX_RELOADS) {
      const newReloads = [...recentReloads, now];
      localStorage.setItem('errorReloads', JSON.stringify(newReloads));

      setTimeout(() => {
        window.location.reload();
      }, RELOAD_DELAY_MS);
    } else {
      console.warn('ErrorBoundary: Maximum reload limit reached. Preventing further reloads.');
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <p>We are trying to fix it. Please wait a moment.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
