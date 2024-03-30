import { ReactNode } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import {
  DocumentPickerOptions,
  DocumentPickerResponse,
  pick,
} from 'react-native-document-picker';

interface FilePickerProps {
  style?: ViewStyle;
  children?: any;
  options?: DocumentPickerOptions<'android' | 'ios'>;
  callback: (r: DocumentPickerResponse) => void;
  disabled: boolean;
}

const FilePicker = ({
  children,
  style,
  options,
  callback,
  disabled,
}: FilePickerProps) => {
  const handleFile = async () => {
    try {
      const [selectedFile] = await pick(options);
      callback(selectedFile);
    } catch (e: unknown) {
      console.log(e);
    }
  };

  return (
    <TouchableOpacity style={style} onPress={handleFile} disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};

export default FilePicker;
