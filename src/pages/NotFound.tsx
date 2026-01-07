import React from 'react';

const NotFound: React.FC = () => {
    return (
        <main style={styles.container}>
            <h1 style={styles.title}>404</h1>
            <p style={styles.message}>Sorry — the page you are looking for does not exist.</p>
            <a href="/" style={styles.link} aria-label="Go to home page">
                Go home
            </a>
        </main>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        background: '#f8fafc',
        color: '#0f172a',
    },
    title: {
        fontSize: '4rem',
        margin: 0,
    },
    message: {
        margin: '1rem 0 2rem',
        fontSize: '1.125rem',
    },
    link: {
        display: 'inline-block',
        padding: '0.6rem 1rem',
        background: '#2563eb',
        color: '#fff',
        borderRadius: 6,
        textDecoration: 'none',
    },
};

export default NotFound;