import * as React from 'react';
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './Copyright';
import { IsEmail, IsPassword } from '../Validation/Validator';
import Snacker from './Snacker/Snacker';
import logo from '../Icons/logo/whiteLogo-no-back.png';
import {useSelect} from '../Context/AllContext'
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();

export default function Login() {
    const navigate= useNavigate();
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("invalid error");
    const [snackType, setSnackType] = useState("error")
    const {setUser}= useSelect()
    const handleLogin = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            email: data.get('email'),
            password: data.get('password'),
        }
        if (!IsEmail(user.email)) {
            setOpenSnack(true);
            setSnackMessage("Invalid email format (ex: abc@def.ghi)")
            setSnackType("error")
            return;
        }
        if(!IsPassword(user.password)){
            setOpenSnack(true);
            setSnackMessage("Password must be of minimum 5 characters")
            setSnackType("error")
            return;
        }
        localStorage.setItem('user',JSON.stringify(user))
        setUser(user);
        navigate('/')
    };

    return (
        <ThemeProvider theme={defaultTheme} >
            <Grid container component="main"  sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            opacity:'0.9',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display:"flex",
            justifyContent:'center',
            alignItems:'center'
          }}
        >
        <div style={{display:'flex',flexDirection:'column'}}>
        <img src={logo} style={{margin:'auto',width:'20rem',height:'20rem'}} alt="PlayWithAI" srcset="" />
        <p style={{width:'60%',margin:'auto',color:'white',fontSize:'1.3em'}}><i>Our application combines the power of AI-generated content with user-recommended styling to help you create stunning PDFs effortlessly. Empower your ideas, craft your vision, and share them with elegance like never before.</i></p>
        </div>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required="true"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup"  variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snacker openSnack={openSnack} setOpenSnack={setOpenSnack} snackMessage={snackMessage} snackType={snackType} />
        </ThemeProvider>
    );
}