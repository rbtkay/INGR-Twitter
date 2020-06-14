import React, { useState, useEffect } from "react";
import { Label, Icon } from "semantic-ui-react";

const Keywords = ({ keywords, callback, deleteIt }) =>
    keywords.map((keyword, i) => (
        <Keyword
            key={i}
            index={i}
            keyword={keyword}
            callback={(index) => callback(index)}
            // deleteIt={(index) => deleteIt(index)}
        />
    ));

const Keyword = ({ index, keyword, callback, deleteIt }) => (
    <div className="keyword">
        <Label onClick={() => callback(index)} color={"grey"} className="keyword-label">
            {keyword.name}
            {keyword.selected && <Icon name="delete" />}
            <Icon name="trash alternate" className="delete" />
        </Label>
        {/* <Label onClick={() => deleteIt(index)} color="red" className="delete">
            <Icon name="trash alternate" className="delete" />
        </Label> */}
    </div>
);

export default Keywords;
