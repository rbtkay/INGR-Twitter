import React from 'react';
import { FormField } from 'semantic-ui-react';

const Input = ({ name, type, label, placeholder = '', required = false, setValue }) => (
    <FormField>
        <label htmlFor={name}>{label}</label>
        <input
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
            onChange={e => setValue(e.target.value)}
            required={required}
        />
    </FormField>
);

export default Input;
