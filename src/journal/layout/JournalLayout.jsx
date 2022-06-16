import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
    return (
        <Box
            className='animate__animated animate__fadeIn animate__faster'
            sx={{
                display: 'flex'

            }}>
            <NavBar drawerWidth={drawerWidth} />
            <SideBar drawerWidth={drawerWidth} />

            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 1
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}
