import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

type DeleteModalProps = {
  visible: any;
  onClose: () => void;
  onEdit: () => void;
  onLogout: () => void;
  onDeleteAccount: (password: string) => void; // 비밀번호를 전달받는 함수
}

export const DeleteModal = ({ visible, onEdit, onClose, onLogout, onDeleteAccount }: DeleteModalProps) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');

  const handleDeletePress = () => { // 계정 삭제 버튼 누르면 호출됨 
    setShowPasswordInput(true);
  };

  const handlePasswordSubmit = () => {
    onDeleteAccount(password); // 비밀번호 전달 후 함수 호출
    setShowPasswordInput(false); // 초기화
    setPassword(''); // 비밀번호 초기화
  };
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          {showPasswordInput ? (
            <>
              <Text style={styles.modalTitle}>계정 삭제를 위해 비밀번호를 입력하세요</Text>
              <TextInput
                style={styles.input}
                placeholder="비밀번호"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={handlePasswordSubmit}
                style={styles.modalButtonDelete}
              >
                <Text style={styles.buttonTextDelete}>계정 삭제 확인</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowPasswordInput(false)}>
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={onEdit} style={styles.modalButton}>
                <Text style={styles.buttonText}>프로필 수정하기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLogout} style={styles.modalButton}>
                <Text style={styles.buttonText}>로그아웃</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeletePress}
                style={styles.modalButtonDelete}
              >
                <Text style={styles.buttonTextDelete}>계정 삭제</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'flex-end',
  },
  modalContent: {
    width: '50%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'relative',
    alignItems: 'center',
    top: 90,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingBottom: 15,
  },
  modalButtonDelete: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
  buttonTextDelete: {
    color: '#FF0000',
    fontSize: 16,
  },
  modalCloseButton: {
    paddingVertical: 10,
    marginTop: 10,
  },
  cancelText: {
    marginTop: 15,
    color: '#888',
    textDecorationLine: 'underline',
  },
});

export default DeleteModal;