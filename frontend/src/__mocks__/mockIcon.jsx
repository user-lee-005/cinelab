import React from "react";

const mockIcon = jest.fn(({icon, ...rest}) => <svg {...rest}>{icon}</svg>);

export default mockIcon;
