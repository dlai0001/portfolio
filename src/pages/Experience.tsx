import React from "react";

type Experience = {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    location?: string;
    responsibilities: string[];
};

const experiences: Experience[] = [
    {
        id: "1",
        company: "Acme Corp",
        role: "Frontend Engineer",
        startDate: "Jan 2021",
        endDate: "Present",
        location: "Remote",
        responsibilities: [
            "Built and maintained a React component library used across multiple products.",
            "Improved performance of the main product by 30% through code-splitting and memoization.",
            "Collaborated with designers to ship accessible, responsive UI."
        ]
    },
    {
        id: "2",
        company: "Beta Solutions",
        role: "Software Engineer",
        startDate: "Jun 2018",
        endDate: "Dec 2020",
        location: "San Francisco, CA",
        responsibilities: [
            "Implemented RESTful APIs and front-end features in a cross-functional team.",
            "Wrote unit and integration tests to increase coverage and reduce regressions.",
            "Mentored junior engineers and led sprint planning sessions."
        ]
    }
];

const Experience: React.FC = () => {
    return (
        <main aria-labelledby="experience-heading" style={{ padding: 24, fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
            <header>
                <h1 id="experience-heading" style={{ margin: "0 0 12px" }}>Work Experience</h1>
                <p style={{ marginTop: 0, color: "#555" }}>Selected roles and responsibilities.</p>
            </header>

            <section aria-label="work-experience" style={{ marginTop: 20, display: "grid", gap: 20 }}>
                {experiences.map(exp => (
                    <article key={exp.id} style={{ padding: 16, border: "1px solid #e6e6e6", borderRadius: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: 18 }}>{exp.role}</h2>
                                <p style={{ margin: "4px 0 0", color: "#333", fontWeight: 600 }}>{exp.company}</p>
                            </div>
                            <time style={{ color: "#666" }}>
                                {exp.startDate} — {exp.endDate ?? "Present"}
                            </time>
                        </div>

                        {exp.location && <p style={{ margin: "8px 0 0", color: "#666" }}>{exp.location}</p>}

                        <ul style={{ marginTop: 12, paddingLeft: 20 }}>
                            {exp.responsibilities.map((r, i) => (
                                <li key={i} style={{ marginBottom: 6 }}>{r}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default Experience;