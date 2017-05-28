import React from 'react'

import Input from 'react-toolbox/lib/input';

export default ({input, className, label, disabled, required, type, icon, meta: {touched, error}}) => {
    return (
        <Input required={required} className={className} icon={icon} type={type} error={touched ? error : null} label={label} disabled={disabled} {...input}></Input>
    )
}