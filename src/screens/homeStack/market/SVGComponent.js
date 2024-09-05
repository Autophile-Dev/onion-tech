import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Rect, Text } from 'react-native-svg';

export default class SpeedMeter extends Component {
    render() {
        const { radius, strokeWidth, value, min, max } = this.props;
        const circumference = 2 * Math.PI * radius;
        const angle = (value / (max - min)) * 270;
        const offset = circumference - (angle / 360) * circumference;

        return (
            <View>
                <Svg width={radius * 2} height={radius * 2}>
                    <Circle
                        cx={radius}
                        cy={radius}
                        r={radius - strokeWidth}
                        stroke="#ccc"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <Rect
                        x={radius - strokeWidth}
                        y={radius}
                        width={strokeWidth}
                        height={radius}
                        fill="#ccc"
                    />
                    <Circle
                        cx={radius}
                        cy={radius}
                        r={radius - strokeWidth}
                        stroke="#00c853"
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        fill="none"
                    />
                    <Text
                        x={radius}
                        y={radius * 1.3}
                        textAnchor="middle"
                        fontSize={radius / 2.5}
                    >
                        {value}
                    </Text>
                </Svg>
            </View>
        );
    }
}
