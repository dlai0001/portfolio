import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const JobFit: React.FC = () => {
    const theme = useTheme();    
    const [textValue, setTextValue] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (textValue.length === 0) {
                setIsLoading(false);
                return;
            }
            // Replace with your actual API endpoint
            const response = await fetch('https://f57q3gtd4n45u5gwrxtavee6au0pmpjo.lambda-url.us-east-1.on.aws/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: textValue }),
            });
            
            const data = await response.json();
            const resultText = typeof data.result === 'string' ? data.response : JSON.stringify(data.response, null, 2);
            // clean up excessive newlines
            const resultTextCleaned = resultText.replace(/(\n\s*){3,}/g, '\n\n');
            setResult(resultTextCleaned);
        } catch (error) {
            setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setTextValue('');
    };

    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 6,
                px: 3,
            }}
        >
            <Container maxWidth="md">
                <Paper
                    component="section"
                    aria-labelledby="jobfit-heading"
                    elevation={0}
                    sx={{
                        p: 3.5,
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))'
                            : theme.palette.background.paper,
                        backdropFilter: 'blur(6px)',
                    }}
                >
                    <Typography
                        id="jobfit-heading"
                        variant="h4"
                        component="h1"
                        sx={{ mb: 2, fontWeight: 600 }}
                    >
                        Job Fit Assessment
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ mb: 3, color: 'text.secondary' }}
                    >
                        Paste your job description or requirements to assess how well it fits with David Lai's skills and experience.
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <TextField
                            fullWidth
                            multiline
                            rows={10}
                            placeholder="8+ years of experience building applications
Extensive Typescript experience
Experience scaling with frontend stack (React, Next.js, etc.) and/or our backend stack (Nodejs, Mongo, AWS)
Experience at product-focused startup/scale-up or technology company
High degree of cross-functional collaboration and leadership. Product managers, designers and business leaders from past roles would speak positively and highly of you
Dedicated to continuous professional development and possessing a lifelong-learner mindset
Strong sense of ownership and drive, excellent communication, and a proactive approach to identifying and mitigating risks"
                            value={textValue}
                            onChange={(e) => setTextValue(e.target.value)}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    fontFamily: 'monospace',
                                }
                            }}
                        />

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={handleClear}
                            >
                                Clear
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isLoading || textValue.trim() === ''}
                            >
                                {isLoading ? 'Submitting...' : 'Submit'}
                            </Button>
                        </Box>
                    </Box>

                    {isLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {result && (
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Results
                                    </Typography>
                                    <IconButton size="small" onClick={() => setResult(null)}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                                <Box
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontSize: '0.875rem',
                                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
                                        p: 2,
                                        borderRadius: 1,
                                        whiteSpace: 'pre-wrap',
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    {result?.split('\\n').map((line, index) => (
                                        <div key={index}>
                                            {line}
                                            {index < result.split('\n').length - 1 && <br />}
                                        </div>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    )}
                </Paper>

                <Typography
                    variant="caption"
                    sx={{
                        display: 'block',
                        textAlign: 'center',
                        mt: 3,
                        color: 'text.secondary',
                    }}
                >
                    This page is powered by AWS Bedrock LLM RAG which was trained on David Lai's resume and LinkedIn profile.
                </Typography>
            </Container>
        </Box>
    );
};

export default JobFit;
