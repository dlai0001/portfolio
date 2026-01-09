import React from "react";

type Skill = {
    name: string;
    level?: number; // 0-100, optional
};

const SKILLS: Record<string, Skill[]> = {
    Languages: [
        { name: "TypeScript", level: 85 },
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "HTML & CSS", level: 90 },
        { name: "Python", level: 70 },
    ],
    Frameworks: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 80 },
        { name: "Node.js", level: 75 },
    ],
    Tools: [
        { name: "Git", level: 85 },
        { name: "Webpack", level: 70 },
        { name: "Vite", level: 65 },
        { name: "Docker", level: 60 },
    ],
    "Other Skills": [
        { name: "Testing (Jest, RTL)", level: 70 },
        { name: "Accessibility", level: 75 },
        { name: "UI / UX basics", level: 65 },
    ],
};

const containerStyle: React.CSSProperties = {
    maxWidth: 900,
    margin: "2rem auto",
    padding: "0 1rem",
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    color: "#111827",
};

const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
};

const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "0.75rem",
};

const skillRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
    marginTop: "0.5rem",
};

const barOuter: React.CSSProperties = {
    flex: 1,
    height: 8,
    background: "#f3f4f6",
    borderRadius: 999,
    overflow: "hidden",
    marginLeft: 12,
};

const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => {
    const pct = Math.max(0, Math.min(100, skill.level ?? 0));
    return (
        <div style={skillRowStyle}>
            <div style={{ minWidth: 120 }}>{skill.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={barOuter} aria-hidden>
                    <div
                        style={{
                            width: `${pct}%`,
                            height: "100%",
                            background: "#2563eb",
                            borderRadius: 999,
                            transition: "width 300ms ease",
                        }}
                    />
                </div>
                <div style={{ minWidth: 36, textAlign: "right", fontSize: 13 }}>{skill.level ? `${skill.level}%` : "—"}</div>
            </div>
        </div>
    );
};

export default function Skills(): React.ReactElement {
    return (
        <main style={containerStyle}>
            <header>
                <h1 style={{ margin: 0, fontSize: "1.75rem" }}>Skills</h1>
                <p style={{ marginTop: 8, color: "#374151" }}>
                    A summary of core technical skills and tooling. Levels are approximate and intended for quick reference.
                </p>
            </header>

            <section style={gridStyle} aria-labelledby="skills-heading">
                {Object.entries(SKILLS).map(([category, skills]) => (
                    <div key={category} style={cardStyle} role="region" aria-label={category}>
                        <h2 style={{ margin: 0, fontSize: "1.05rem" }}>{category}</h2>
                        <div style={{ marginTop: 8 }}>
                            {skills.map((s) => (
                                <SkillBadge key={s.name} skill={s} />
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}