import React, {useState, useCallback, useEffect} from "react";
import {FormField} from "semantic-ui-react";

const Input = (props) => {
    return (
        <FormField>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                id={props.name}
                name={props.name}
                placeholder={props.placeholder || ""}
                type={props.type || "text"}
                onChange={(e) => props.setValue(e.target.value)}
                required={!!props.required}
            />
        </FormField>
    );
};

export default Input;
