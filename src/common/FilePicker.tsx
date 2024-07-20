import { ReactNode } from 'react';
import { Alert, TouchableOpacity, ViewStyle } from 'react-native';
import {
  DocumentPickerOptions,
  DocumentPickerResponse,
  pick,
} from 'react-native-document-picker';

interface FilePickerProps {
  style?: ViewStyle;
  children?: any;
  callback: (r: DocumentPickerResponse) => void;
  disabled: boolean;
}

const FilePicker = ({
  children,
  style,
  callback,
  disabled,
}: FilePickerProps) => {
  const handleFile = async () => {
    try {
      const [selectedFile] = await pick();
      callback(selectedFile);
    } catch (e: unknown) {
      console.log(e);
      Alert.alert('파일 업로드에 실패했습니다.');
    }
  };

  return (
    <TouchableOpacity style={style} onPress={handleFile} disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};

export default FilePicker;
