import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', 
  },
  circularProgress: {
    width: '400px',
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default function CircularUnderLoad() {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.circularProgress}>
        <CircularProgress disableShrink />
      </div>
    </div>
  );
}
