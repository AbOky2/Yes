import React from 'react'
import { Grid } from '@material-ui/core'
import './index.css'

const AdminContentWrapper = ({ children, className = '' }) => (
    <Grid className={`admin-content-container ${className}`}>{children}</Grid>
)
const PublicContentWrapper = ({ children, className = '' }) => (
    <Grid className={`public-content-container ${className}`}>{children}</Grid>
)

export { AdminContentWrapper, PublicContentWrapper }