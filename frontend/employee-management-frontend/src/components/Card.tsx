import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Card = ({ children }: Props) => {

    return (

        <div
            style={{
                background: "#ffffff",
                borderRadius: 12,
                padding: 25,
                boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                marginBottom: 25,
            }}
        >

            {children}

        </div>

    );

};

export default Card;