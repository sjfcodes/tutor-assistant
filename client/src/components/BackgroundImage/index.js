import React from 'react'
import './style.css'

export const BackgroundImage = ({ url }) => {
    const styles = {
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    return (
        <div className='background-image' style={styles}></div>
    )
}
