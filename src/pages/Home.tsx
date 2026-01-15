import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import resumeFile from '../assets/david-lai-resume.pdf';

const Home: React.FC = () => {
  const theme = useTheme();

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
          aria-labelledby="home-heading"
          elevation={0}
          sx={{
            p: 3.5,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))'
              : theme.palette.background.paper,
            backdropFilter: 'blur(6px)',
          }}
        >
          {/* Header: Avatar + Title */}
          <Stack
            component="header"
            direction="row"
            spacing={2.5}
            alignItems="center"
            sx={{ mb: 2.5 }}
          >
            <Avatar
              aria-hidden
              sx={{
                width: 96,
                height: 96,
                fontSize: 36,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              DL
            </Avatar>

            <Stack spacing={0.5}>
              <Typography
                id="home-heading"
                component="h1"
                variant="h3"
                sx={{ fontWeight: 700 }}
              >
                David Lai
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Fullstack Web · AWS Archihtect · GraphQL
              </Typography>
            </Stack>
          </Stack>

          {/* Summary */}
          <Typography
            variant="body1"
            sx={{ my: 2.5, lineHeight: 1.6 }}
          >
            I build reliable, accessible web applications with a focus on performance and delightful UX.
            Experienced in frontend architecture, component design, and end-to-end delivery for SaaS products.
          </Typography>

          {/* Action Buttons */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ my: 2.5, flexWrap: 'wrap' }}
          >
            <Button
              component="a"
              href={resumeFile}
              variant="contained"
              color="primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume (opens in new tab)"
            >
              Download Resume
            </Button>

            <Button
              component="a"
              href={`mailto:${String.fromCharCode(100,97,118,105,100,64,100,108,97,105,115,111,102,116,46,99,111,109)}`}
              variant="outlined"
              color="inherit"
              aria-label="Send email"
            >
              Email
            </Button>

            <Button
              component="a"
              href="https://github.com/dlai0001"
              variant="text"
              color="inherit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in new tab)"
            >
              GitHub
            </Button>

            <Button
              component="a"
              href="https://www.linkedin.com/in/david-lai-37211/"
              variant="text"
              color="inherit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              LinkedIn
            </Button>
          </Stack>

          {/* Meta */}
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: 'block', mt: 2.75 }}
          >
            Based in Reading, PA · Open to remote and local opportunities
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;