import React from 'react'
import { createRoot } from 'react-dom/client'
import Calander from './Calander'
import './index.css'

document.addEventListener('DOMContentLoaded', function() {
    createRoot(document.body.appendChild(document.createElement('div')))
    .render(<Calander />)
})
