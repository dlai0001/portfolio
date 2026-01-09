import React from "react";

const containerStyle: React.CSSProperties = {
    maxWidth: 900,
    margin: "2rem auto",
    padding: "1.5rem",
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    lineHeight: 1.6,
    color: "#111827",
};

const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
};

const avatarStyle: React.CSSProperties = {
    width: 96,
    height: 96,
    borderRadius: "50%",
    background: "#e5e7eb",
    display: "inline-block",
    flexShrink: 0,
};

const nameStyle: React.CSSProperties = {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
};

const subtitleStyle: React.CSSProperties = {
    margin: 0,
    color: "#6b7280",
};

const sectionTitleStyle: React.CSSProperties = {
    marginTop: "1.25rem",
    marginBottom: "0.5rem",
    fontSize: "1.125rem",
    fontWeight: 600,
};

const listStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem 1rem",
    padding: 0,
    margin: 0,
    listStyle: "none",
};

const pillStyle: React.CSSProperties = {
    background: "#f3f4f6",
    padding: "0.35rem 0.6rem",
    borderRadius: 9999,
    fontSize: "0.875rem",
};

export default function About(): React.ReactElement {
    return (
        <main style={containerStyle} aria-labelledby="about-heading">
            <header style={headerStyle}>
                <div style={avatarStyle} aria-hidden />
                <div>
                    <h1 id="about-heading" style={nameStyle}>
                        About me
                    </h1>
                    <p style={subtitleStyle}>Software engineer — building accessible, maintainable web apps</p>
                </div>
            </header>

            <section>
                <p>
                    I'm a frontend-focused software engineer who enjoys building delightful user experiences with
                    TypeScript and React. I care about predictable architectures, good developer experience, and
                    shipping reliable products.
                </p>

                <h2 style={sectionTitleStyle}>What I do</h2>
                <ul>
                    <li>Design and implement user interfaces with React and TypeScript</li>
                    <li>Build and maintain backend APIs with Node.js</li>
                    <li>Improve app performance, accessibility, and developer workflows</li>
                </ul>

                <h3 style={sectionTitleStyle}>Skills</h3>
                <ul style={listStyle}>
                    <li style={pillStyle}>TypeScript</li>
                    <li style={pillStyle}>React</li>
                    <li style={pillStyle}>Next.js / Vite</li>
                    <li style={pillStyle}>Node.js</li>
                    <li style={pillStyle}>GraphQL / REST</li>
                    <li style={pillStyle}>CSS / Tailwind</li>
                </ul>

                <h3 style={sectionTitleStyle}>Contact</h3>
                <p>
                    Email: <a href="mailto:you@example.com">you@example.com</a> · GitHub:{" "}
                    <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
                        @your-username
                    </a>
                </p>
            </section>
        </main>
    );
}