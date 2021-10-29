import React, { useState, useEffect } from 'react';
import { useParams } from "react-router"
import { Link, useHistory, useLocation } from 'react-router-dom';

const Blank = () => {
    const history = useHistory()
    useEffect(() => {
        history.push("/dashboard")
    })
    return (
        <>

        </>
    );
}

export default Blank;
