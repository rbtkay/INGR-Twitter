import React from 'react'
import { Label } from "semantic-ui-react";

const Keywords = ({ keywords }) => {

    const result = keywords.map((keyword) => {
        return (
            <Label as='a'>#corona</Label>
        )
    });

    return result
}

export default Keywords;