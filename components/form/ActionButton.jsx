import React from 'react';
import { Text, TouchableOpacity} from 'react-native';

import AppStyles from '../../styles/LoginScreenStyles.scss';

const ActionButton = ({ type, onPress, text, text2 }) => {
  const renderButtonContent = () => {
    switch (type) {
      case 'text':
        return (
            <TouchableOpacity onPress={onPress} style={AppStyles.textContainer}>
                <Text style={AppStyles.plainText}>{text}</Text>
                <Text style={AppStyles.clickableText}>{text2}</Text>
            </TouchableOpacity>
        );
      case 'outline':
        return (
            <TouchableOpacity onPress={onPress} style={AppStyles.buttonOutline}>
                <Text style={AppStyles.buttonOutlineText}>{text}</Text>
            </TouchableOpacity>
        );
      default:
        return (
            <TouchableOpacity onPress={onPress} style={AppStyles.button}>
                <Text style={AppStyles.buttonText}>{text}</Text>
            </TouchableOpacity>
        );
    }
  };

  return renderButtonContent();
};

export default ActionButton;
