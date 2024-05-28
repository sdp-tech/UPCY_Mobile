import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TextToggleProps {
    text: string;
}

const TextToggle: React.FC<TextToggleProps> = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => {
        // 토글 상태 변환 
        setIsExpanded(!isExpanded);
    };

    const renderText = () => {
        if (isExpanded) {
            return text;
        }
        // 17자가 넘은 상태면 17자까지만, 그게 아니면 전체 보여줌 
        return text.length > 17 ? `${text.substring(0, 17)}...` : text;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{renderText()}</Text>
            {/* 17자 넘어야지만 더보기 버튼 활성화 */}
            {text.length > 17 && (
                <TouchableOpacity onPress={toggleText}>
                    <Text style={styles.buttonText}>{isExpanded ? '줄이기' : '더보기'}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    text: {
        fontSize: 14,
    },
    buttonText: {
        color: 'grey',
        marginTop: 5,
        fontSize: 11,
    },
});

export default TextToggle;