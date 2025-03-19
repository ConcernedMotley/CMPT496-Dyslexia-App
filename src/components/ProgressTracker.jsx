import React from 'react';

// TODO: Create a ProgressTracker component

const ProgressTracker = () => {
    const bars = Array.from({ length: 5 }, (_, index) => (
        <div key={index} style={styles.bar}></div>
    ));

    return (
        <div style={styles.container}>
            {bars}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row', // changed from 'column' to 'row'
        alignItems: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '200px',
        margin: '0 auto',
    },
    bar: {
        width: '100%',
        height: '20px',
        backgroundColor: '#4caf50',
        margin: '5px 0',
    },
};

export default ProgressTracker;