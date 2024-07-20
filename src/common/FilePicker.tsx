import { Alert, TouchableOpacity, ViewStyle } from 'react-native';
import {
  DocumentPickerResponse,
  pick,
  types,
  isCancel,
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
  const MEGABYTE = 1000000;

  const handleFile = async () => {
    try {
      const [selectedFile] = await pick({ type: [types.pdf] });
      if (selectedFile.size !== null && selectedFile.size > 20 * MEGABYTE) {
        Alert.alert('크기 제한을 초과하는 파일입니다.');
      } else {
        callback(selectedFile);
      }
    } catch (e: unknown) {
      if (!isCancel(e)) Alert.alert('파일 업로드에 실패했습니다.');
    }
  };

  return (
    <TouchableOpacity style={style} onPress={handleFile} disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};

export default FilePicker;
