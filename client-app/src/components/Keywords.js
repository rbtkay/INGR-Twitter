import React, { useState, useEffect } from "react";
import { Label, Icon } from "semantic-ui-react";

const Keywords = ({ keywords, callback }) => {
    return keywords.map((keyword, i) => {
        return (
            <Keyword
                key={i}
                value={keyword.value}
                isSelected={keyword.isSelected}
                callback={callback}
            />
        );
    });
};

const Keyword = ({ value, isSelected, callback }) => {
    const [color, setColor] = useState("grey");
    const [selected, setSelected] = useState(isSelected);

    const setActive = (value) => {
        setSelected(!selected);
    };

    useEffect(() => {
        let c = selected ? "blue" : "grey";
        setColor(c);
        callback(value);
    }, [selected]);

    return (
        <Label as="a" onClick={() => setActive(value)} color={color}>
            {value}
            {selected && <Icon name="delete" />}
        </Label>
    );
};

export default Keywords;
