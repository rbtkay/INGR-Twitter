import React, { useState, useEffect } from "react";
import { Label, Icon } from "semantic-ui-react";

const Keywords = ({ keywords, callback }) =>
    keywords.map((keyword, i) => (
        <Keyword
            key={i}
            index={i}
            keyword={keyword}
            callback={(index) => callback(index)}
        />
    ));

const Keyword = ({ index, keyword, callback }) => (
    <Label onClick={() => callback(index)} color={"grey"} className="keyword">
        {keyword.name}
        {keyword.selected && <Icon name="delete" />}
        <Icon name="trash alternate" className="delete" />
    </Label>
);

export default Keywords;
