import React from 'react';

class ColoredSquare extends React.Component {
    render() {
        const { color } = this.props;

        return (
            <svg width="20" height="5">
                <rect width="20" height="3" fill={color} />
            </svg>
        );
    }
}

export default ColoredSquare;