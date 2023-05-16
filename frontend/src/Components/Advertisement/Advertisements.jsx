import React from 'react'
import DataTable from './DataTable'
import Title from 'antd/es/typography/Title'


const Advertisements = () => {
    return (
        <div
            style={{
                display : "flex",
                alignItems : "center",
                flexDirection:"column"
            }}
        >
          
            <Title
                level={1}
            >
                Advertisements
            </Title>
            <DataTable 
                
            />
        </div>
    )
}

export default Advertisements
