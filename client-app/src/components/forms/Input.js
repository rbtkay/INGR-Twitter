import React, { Fragment } from "react";
import { FormField } from "semantic-ui-react";

const Input = (props) => {
    const input = (
        <Fragment>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                id={props.name}
                name={props.name}
                placeholder={props.placeholder || ""}
                type={props.type || "text"}
                onChange={(e) => props.setValue(e.target.value)}
                required={!!props.required}
            />
        </Fragment>
    );

    if (props.inline) {
        return input;
    }
    return <FormField>{input}</FormField>;
};

export default Input;
