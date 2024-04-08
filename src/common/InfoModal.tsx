import { Dispatch, SetStateAction } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { GRAY } from '../styles/GlobalColor';
import { Body16M } from '../styles/GlobalText';

interface InfoModalProps {
  content: string;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  pos?: { top: number; left: number };
}

const InfoModal = ({ content, visible, setVisible, pos }: InfoModalProps) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
      transparent={true}>
      <Pressable
        style={{ flex: 1, backgroundColor: 'white', opacity: 0.4 }}
        onPress={() => setVisible(false)}
      />
      <View
        style={{
          backgroundColor: GRAY,
          position: 'absolute',
          borderRadius: 10,
          padding: 20,
          ...pos,
        }}>
        <Body16M>{content}</Body16M>
      </View>
    </Modal>
  );
};

export default InfoModal;
