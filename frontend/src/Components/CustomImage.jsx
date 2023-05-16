import React from 'react'

const CustomImage = ({ url, styles, className }) => {
    return (
        <img src={url}
            className={className}
            style={styles}
        ></img>
    )
}

export default CustomImage
