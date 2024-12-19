import React, { ReactNode } from "react";
const TextBox = ({children}: {children: ReactNode | ReactNode[]}) => {
    return (
        <div>
            <p>{children}</p>
        </div>
    )
}

export default TextBox;