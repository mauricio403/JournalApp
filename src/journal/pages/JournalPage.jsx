import { useDispatch, useSelector } from 'react-redux'
import { AddOutlined } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView } from '../views/NoteView'
import { NothingSelectedView } from '../views/NothingSelectedView'
import { startNewNote } from '../../store/journal/thunks'

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal);

  const onCLickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>

      {
        (!!active)
          ? <NoteView />
          :
          <NothingSelectedView />
      }
      <IconButton
        onClick={onCLickNewNote}
        size='large'
        disabled={isSaving}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          botton: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />

      </IconButton>
    </JournalLayout>
  )
}
