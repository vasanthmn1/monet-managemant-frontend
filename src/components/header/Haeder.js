import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
// // import MenuIcon from '@mui/icons-material/Menu ';

export const Haeder = () => {
    return (
        <div>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" >
                            LOGO
                        </Typography>
                        <Box sx={{ marginLeft: "auto" }}>
                            <Link to='/bussines' className='link'>
                                <Button color="inherit">
                                    Bussines
                                </Button>
                            </Link>
                            <Link to='/personal' className='link'>
                                <Button color="inherit">
                                    personal
                                </Button>
                            </Link>
                        </Box>

                    </Toolbar>
                </AppBar>
            </Box>

        </div>
    )
}
