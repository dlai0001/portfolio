import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ArchitectureIcon from '@mui/icons-material/AccountTree';
import DownloadIcon from '@mui/icons-material/Download';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link as RouterLink } from 'react-router';
import React from 'react';

import { PROJECTS, type Project } from '../data/projects';

const CardImage: React.FC<{ project: Project }> = ({ project }) => {
    const theme = useTheme();
    // The gradient sits beneath the image, so if the image is missing or 404s
    // the card still shows a styled banner instead of a broken image.
    const gradient =
        theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
            : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

    const fit = project.imageFit ?? 'cover';
    const position = project.imagePosition ?? 'center';

    // A family entry with multiple icons: show each image whole, side by side,
    // centered over the gradient banner.
    if (project.images && project.images.length > 0) {
        return (
            <Box
                aria-hidden
                sx={{
                    height: 160,
                    borderRadius: 2,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    p: 1.5,
                    background: gradient,
                }}
            >
                {project.images.map((src) => (
                    <Box
                        key={src}
                        component="img"
                        src={src}
                        alt=""
                        sx={{
                            height: '100%',
                            width: 'auto',
                            maxWidth: '45%',
                            objectFit: 'contain',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                    />
                ))}
            </Box>
        );
    }

    return (
        <Box
            aria-hidden
            sx={{
                height: 160,
                borderRadius: 2,
                mb: 2,
                display: 'flex',
                alignItems: 'flex-end',
                p: 1.5,
                background: project.image
                    ? `url("${project.image}") ${position} / ${fit} no-repeat, ${gradient}`
                    : gradient,
            }}
        >
            {!project.image && (
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: '#fff',
                        textShadow: '0 1px 4px rgba(0,0,0,0.45)',
                    }}
                >
                    {project.name}
                </Typography>
            )}
        </Box>
    );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const theme = useTheme();

    return (
        <Paper
            component="article"
            elevation={0}
            sx={{
                p: 2.5,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background:
                    theme.palette.mode === 'dark'
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))'
                        : theme.palette.background.paper,
                backdropFilter: 'blur(6px)',
            }}
        >
            <CardImage project={project} />

            <Typography component="h2" variant="h6" sx={{ fontWeight: 700 }}>
                {project.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                {project.tagline}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {project.description}
            </Typography>

            {project.tech && project.tech.length > 0 && (
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                    {project.tech.map((t) => (
                        <Chip key={t} label={t} size="small" variant="outlined" />
                    ))}
                </Stack>
            )}

            <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 'auto', flexWrap: 'wrap', gap: 1 }}
            >
                {[
                    ...(project.downloadLink ? [project.downloadLink] : []),
                    ...(project.downloadLinks ?? []),
                ].map((link) => (
                    <Button
                        key={link.href}
                        component="a"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        size="small"
                        startIcon={<DownloadIcon />}
                    >
                        {link.label}
                    </Button>
                ))}
                {project.marketingLink && (
                    <Button
                        component="a"
                        href={project.marketingLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size="small"
                        startIcon={<LaunchIcon />}
                    >
                        {project.marketingLink.label}
                    </Button>
                )}
                <Button
                    component={RouterLink}
                    to={`/projects/${project.slug}`}
                    variant="text"
                    size="small"
                    startIcon={<ArchitectureIcon />}
                >
                    Architecture
                </Button>
            </Stack>
        </Paper>
    );
};

const Portfolio: React.FC = () => {
    return (
        <Box component="main" sx={{ minHeight: '100vh', py: 6, px: 3 }}>
            <Container maxWidth="md">
                <Box component="header" sx={{ mb: 4 }}>
                    <Typography component="h1" variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                        Portfolio
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        A selection of projects I've designed and built. Each includes a
                        deeper look at its design and architecture.
                    </Typography>
                </Box>

                <Box
                    component="section"
                    aria-label="Projects"
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                        gap: 2,
                    }}
                >
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default Portfolio;
