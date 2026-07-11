import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useEffect, useId, useRef, useState } from 'react';

type Props = {
    /** Mermaid diagram source, e.g. a `flowchart TD ...` string. */
    chart: string;
};

/**
 * Renders a Mermaid diagram from source text. Re-renders when the chart or the
 * color mode changes so the diagram tracks the light/dark theme. On a syntax
 * error it shows the message plus the source so it's easy to fix the Mermaid.
 */
export default function Mermaid({ chart }: Props): React.ReactElement {
    const theme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const rawId = useId();
    // useId() contains ':' which is invalid in a DOM/SVG id selector.
    const renderId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        // Dynamically import mermaid so its large bundle is split into its own
        // chunk and only fetched when an architecture diagram is actually shown.
        (async () => {
            try {
                const { default: mermaid } = await import('mermaid');
                if (cancelled) return;

                mermaid.initialize({
                    startOnLoad: false,
                    theme: theme.palette.mode === 'dark' ? 'dark' : 'default',
                    securityLevel: 'strict',
                    fontFamily: String(theme.typography.fontFamily ?? 'inherit'),
                });

                const { svg } = await mermaid.render(renderId, chart.trim());
                if (cancelled || !containerRef.current) return;
                containerRef.current.innerHTML = svg;
                setError(null);
            } catch (err: unknown) {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : String(err));
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [chart, renderId, theme.palette.mode, theme.typography.fontFamily]);

    if (error) {
        return (
            <Box>
                <Typography variant="body2" color="error" sx={{ mb: 1, fontWeight: 600 }}>
                    Diagram failed to render: {error}
                </Typography>
                <Box
                    component="pre"
                    sx={{
                        m: 0,
                        p: 2,
                        borderRadius: 1,
                        overflowX: 'auto',
                        fontFamily: 'monospace',
                        fontSize: '0.8125rem',
                        whiteSpace: 'pre',
                        backgroundColor:
                            theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.05)',
                    }}
                >
                    {chart.trim()}
                </Box>
            </Box>
        );
    }

    return (
        <Box
            ref={containerRef}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                '& svg': { maxWidth: '100%', height: 'auto' },
            }}
        />
    );
}
