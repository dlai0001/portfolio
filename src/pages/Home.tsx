import React from "react";

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        background: "linear-gradient(180deg,#0f172a 0%,#071126 100%)",
        color: "#e6eef8",
        fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    },
    card: {
        maxWidth: 980,
        width: "100%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
        borderRadius: 12,
        padding: 28,
        boxShadow: "0 6px 30px rgba(2,6,23,0.6)",
        backdropFilter: "blur(6px)",
    },
    header: { display: "flex", gap: 20, alignItems: "center" },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: "50%",
        background: "#1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 36,
        fontWeight: 700,
        color: "#e6eef8",
        flexShrink: 0,
    },
    titleGroup: { display: "flex", flexDirection: "column" },
    name: { fontSize: 28, margin: 0, color: "#fff" },
    role: { margin: 0, color: "#9fb3d7", fontSize: 15 },
    summary: { marginTop: 18, color: "#cfe6ff", lineHeight: 1.6 },
    actions: { marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" },
    buttonPrimary: {
        padding: "10px 16px",
        background: "#0ea5e9",
        color: "#042033",
        borderRadius: 8,
        fontWeight: 600,
        textDecoration: "none",
    },
    buttonGhost: {
        padding: "10px 16px",
        background: "transparent",
        color: "#cfe6ff",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        textDecoration: "none",
    },
    meta: { marginTop: 22, color: "#9fb3d7", fontSize: 14 },
    socials: { marginLeft: 8, display: "inline-flex", gap: 8 },
    smallLink: { color: "#9fb3d7", textDecoration: "none" },
};

const Home: React.FC = () => {
    return (
        <main style={styles.container}>
            <section style={styles.card} aria-labelledby="home-heading">
                <header style={styles.header}>
                    <div style={styles.avatar} aria-hidden>
                        DL
                    </div>

                    <div style={styles.titleGroup}>
                        <h1 id="home-heading" style={styles.name}>
                            David Lai
                        </h1>
                        <p style={styles.role}>Full‑Stack Engineer · TypeScript · React</p>
                    </div>
                </header>

                <p style={styles.summary}>
                    I build reliable, accessible web applications with a focus on performance and delightful UX.
                    Experienced in frontend architecture, component design, and end-to-end delivery for SaaS products.
                </p>

                <div style={styles.actions}>
                    <a
                        href="/resume.pdf"
                        style={styles.buttonPrimary}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Download resume (opens in new tab)"
                    >
                        Download Resume
                    </a>

                    <a
                        href="mailto:david@example.com"
                        style={styles.buttonGhost}
                        aria-label="Send email"
                    >
                        Email
                    </a>

                    <a
                        href="https://github.com/david"
                        style={styles.smallLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub profile (opens in new tab)"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://www.linkedin.com/in/david"
                        style={styles.smallLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile (opens in new tab)"
                    >
                        LinkedIn
                    </a>
                </div>

                <div style={styles.meta}>
                    Based in San Francisco · Open to remote and local opportunities
                </div>
            </section>
        </main>
    );
};

export default Home;