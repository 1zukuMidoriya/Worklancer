// LoadingSpinner.js
import React from 'react';
import { Spinner } from 'react-bootstrap';
import {ClockLoader, SyncLoader} from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className="d-flex justify-content-center " style={{ height: '100vh' }}>
            <SyncLoader />
        </div>
    );
};

export default LoadingSpinner;
