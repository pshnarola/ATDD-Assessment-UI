import React from 'react'
import Select from 'react-select';

const CustomDropdown = ({ isMulti, name, placeholder, id, options = [], value, onChange }) => {
    return (
        <>
            <Select
                defaultValue={[]}
                isMulti={isMulti}
                name={name}
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder={placeholder}
                id={id}
                onChange={(e) => {
                    let event = { target: { name: name, value: e } }
                    onChange(event)
                }}
                value={value}
            />
        </>
    )
}

export default CustomDropdown