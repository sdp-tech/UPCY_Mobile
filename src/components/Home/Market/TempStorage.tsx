import React, { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Modal, Alert, StyleSheet, Animated, } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import Close from '../../../assets/header/Close.svg';
import styled from "styled-components/native";
import { Body14M, Body16B } from "../../../styles/GlobalText";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Request from '../../../common/requests.js';
import { getAccessToken, getMarketUUID } from '../../../common/storage';
import { ServiceData } from "./ServiceDetailPage.tsx";
import { PhotoType } from "../../../hooks/useImagePicker.ts";


const BackButton = styled.TouchableOpacity`
  padding: 10px;
  z-index: 1;
`;

interface ServiceItem {
  service_uuid: string;
  service_title: string;
  service_content: string;
  service_category: string;
  service_period?: number; // 추가됨
  basic_price?: number; // 추가됨
  max_price?: number; // 추가됨
  service_style?: string[];
  service_material?: string[]; // 추가됨
  service_option?: any[]; // 추가됨
  service_image: PhotoType[];
  updated?: boolean;
  temporary?: boolean;
}

const TempStorage = ({ navigation }: StackScreenProps<any>) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const [storage, setStorage] = useState<ServiceItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDeleteAllPopupVisible, setDeleteAllPopupVisible] = useState(false);
  const [isDeleteSelectedPopupVisible, setDeleteSelectedPopupVisible] = useState(false);
  const [warningMessageOpacity] = useState(new Animated.Value(0));

  const request = Request();

  const fetchData = async () => {
    try {
      const marketUuid = await getMarketUUID();
      const response = await request.get(`/api/market/${marketUuid}/service?temporary=true`, {}, {});
      if (response && response.status === 200) {
        const tempData = response.data.filter((item: ServiceItem) => item.temporary);
        setStorage(tempData);
      } else if (response && response.status === 404) {
        Alert.alert("등록된 임시저장 서비스가 없습니다.")
      } else {
        Alert.alert("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(); // 페이지가 포커스를 받을 때 fetch 실행
      return () => {
        // cleanup 작업 (필요시 추가)
        console.log('Screen unfocused');
      };
    }, [])
  );

  const handleItemPress = (service_uuid: string) => {
    setSelectedItems((prev) =>
      prev.includes(service_uuid)
        ? prev.filter((id) => id !== service_uuid)
        : [...prev, service_uuid]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === storage.length) {
      // 모든 아이템이 이미 선택되었으면 선택 해제
      setSelectedItems([]);
    } else {
      // 모든 아이템 선택
      setSelectedItems(storage.map((item) => item.service_uuid));
    }
  };

  const handleDeleteAll = async () => {
    try {
      const marketUuid = await getMarketUUID();
      const accessToken = await getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const deletePromises = storage.map((item) =>
        request.del(`/api/market/${marketUuid}/service/${item.service_uuid}`, {}, headers)
      );

      const responses = await Promise.all(deletePromises);
      const allSuccess = responses.every((res: any) => res.status === 200);

      if (allSuccess) {
        setStorage([]);
        setSelectedItems([]);
        setDeleteAllPopupVisible(false);
      } else {
        Alert.alert("전체 삭제에 실패했습니다.")
      }
    } catch (error) {
      console.error("Error deleting all items:", error);
      Alert.alert("전체 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const marketUuid = await getMarketUUID();
      const accessToken = await getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const deletePromises = selectedItems.map((serviceUuid) =>
        request.del(`/api/market/${marketUuid}/service/${serviceUuid}`, {}, headers)
      );
      const responses = await Promise.all(deletePromises);
      const allSuccess = responses.every((res: any) => res.status === 200);
      if (allSuccess) {
        setStorage((prev) =>
          prev.filter((item) => !selectedItems.includes(item.service_uuid))
        );
        setSelectedItems([]);
        setDeleteSelectedPopupVisible(false);
      } else {
        Alert.alert("선택 삭제에 실패했습니다.")
      }
    } catch (error) {
      console.error("Error deleting selected items:", error);
      Alert.alert("선택 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleLoadPress = () => {
    if (selectedItems.length > 1) {
      showWarningMessage();
    } else if (selectedItems.length === 1) {
      const selectedService = storage.find(
        (item) => item.service_uuid === selectedItems[0]
      );
      if (selectedService) {
        const transformedServiceData: ServiceData = {
          service_uuid: selectedService.service_uuid,
          service_title: selectedService.service_title,
          service_content: selectedService.service_content,
          service_category: selectedService.service_category,
          service_period: selectedService.service_period ?? 0,
          basic_price: selectedService.basic_price ?? 0,
          max_price: selectedService.max_price ?? 0,
          service_style: selectedService.service_style?.map((style: any) => (style.style_name || '')) || [],
          service_material: selectedService.service_material?.map((material: any) => (material.material_name || '')) || [],
          service_option: selectedService.service_option ?? [],
          thumbnail_photo: selectedService.service_image?.[0]?.uri ?? "",
          detail_photos: selectedService.service_image?.slice(1).map((img) => img.uri) ?? [],
        };
        navigation.navigate("ServiceRegistrationPage", { serviceData: transformedServiceData, fix: false });
      } else {
        Alert.alert("선택한 서비스를 찾을 수 없습니다.");
      }
    }
  };

  const showWarningMessage = () => {
    Animated.timing(warningMessageOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(warningMessageOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 2000); // 2초 후 메시지 사라짐
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingBottom: 80 }}>
        <ScrollView>
          <Header navigation={navigation} />
          <ServiceList
            storage={storage}
            selectedItems={selectedItems}
            onItemPress={handleItemPress}
            onSelectAll={handleSelectAll}
            onDeleteAll={() => setDeleteAllPopupVisible(true)}
          />
        </ScrollView>
      </View>
      <FooterButtons
        selectedItems={selectedItems}
        onLoadPress={handleLoadPress}
        onDeleteSelected={() => setDeleteSelectedPopupVisible(true)}
      />
      {/* 팝업 UI */}
      <CustomPopup
        visible={isDeleteAllPopupVisible}
        title="작성하던 서비스를 모두 삭제할까요?"
        subtitle="한번 삭제한 서비스는 복구할 수 없습니다."
        confirmText="전체 삭제"
        onConfirm={handleDeleteAll}
        onCancel={() => setDeleteAllPopupVisible(false)}
      />
      <CustomPopup
        visible={isDeleteSelectedPopupVisible}
        title="작성하던 서비스를 정말 삭제할까요?"
        subtitle="한번 삭제한 서비스는 복구할 수 없습니다."
        confirmText="삭제"
        onConfirm={handleDeleteSelected}
        onCancel={() => setDeleteSelectedPopupVisible(false)}
      />
      {/* 경고 메시지 */}
      <Animated.View
        style={[
          styles.warningMessage,
          {
            opacity: warningMessageOpacity,
            transform: [
              {
                translateY: warningMessageOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [5, 2], // 아래에서 위로 슬라이드
                }),
              },
            ],
            zIndex: 100, // 다른 뷰 위에 표시되도록 설정
          },
        ]}
        pointerEvents="none" // 뷰가 터치 이벤트를 차단하지 않도록 설정
      >
        <Text style={styles.warningText}>
          임시저장된 글은 한 개씩만 불러올 수 있습니다.
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const Header = ({ navigation }: { navigation: any }) => (
  <View style={styles.headerContainer}>
    <BackButton onPress={() => navigation.navigate('ReformerMyPageScreen')}>
      <Close color='black' />
    </BackButton>
    <Text style={styles.headerTitle}>임시저장</Text>
    <View style={styles.headerSpacer} />
  </View>
);

const formatDate = (isoString: any) => {
  const date = new Date(isoString); // ISO 문자열을 Date 객체로 변환
  date.setHours(date.getHours() + 9); // 9시간 더하기
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`; // 원하는 형식으로 반환
};

const ServiceList = ({
  storage,
  selectedItems,
  onItemPress,
  onSelectAll,
  onDeleteAll,
}: {
  storage: ServiceItem[];
  selectedItems: string[];
  onItemPress: (service_uuid: string) => void;
  onSelectAll: () => void;
  onDeleteAll: () => void;
}) => (
  <View>
    <View style={styles.totalCountContainer}>
      <Text style={styles.totalCountText}>
        총 <Text style={styles.totalCountNumber}>{storage.length}</Text>개
      </Text>
      <TouchableOpacity style={styles.clearAllButton} onPress={onDeleteAll}>
        <Text style={styles.clearAllText}>전체삭제</Text>
      </TouchableOpacity>
    </View>
    {storage.map((item) => (
      <TouchableOpacity
        key={item.service_uuid}
        style={[
          styles.serviceItem,
          selectedItems.includes(item.service_uuid) && styles.selectedServiceItem,
        ]}
        onPress={() => onItemPress(item.service_uuid)}
      >
        <Body16B
          style={{
            color: selectedItems.includes(item.service_uuid) ? "#7B61FF" : "black",
          }}
        >
          {item.service_title}
        </Body16B>
        <Body14M style={styles.serviceCategory}>{formatDate(item.updated)}</Body14M>
      </TouchableOpacity>
    ))}
  </View>
);

const FooterButtons = ({
  selectedItems,
  onLoadPress,
  onDeleteSelected,
}: {
  selectedItems: string[] | null;
  onLoadPress: () => void;
  onDeleteSelected: () => void;
}) => (
  <View style={styles.footerContainer}>
    {/* 삭제 버튼 */}
    <TouchableOpacity
      style={[
        styles.deleteButton,
        selectedItems?.length === 0 && styles.disabledButton,
      ]}
      onPress={onDeleteSelected}
      disabled={selectedItems?.length === 0}
    >
      <Text style={!selectedItems ? styles.disabledText : styles.deleteActiveText}>삭제</Text>
    </TouchableOpacity>
    {/* 불러오기 버튼 */}
    <TouchableOpacity
      style={[
        styles.loadButton,
        selectedItems?.length === 0 && styles.disabledButton,
      ]}
      onPress={onLoadPress}
      disabled={selectedItems?.length === 0}
    >
      <Text style={selectedItems?.length === 0 ? styles.disabledText : styles.loadActiveText}>불러오기</Text>
    </TouchableOpacity>
  </View>
);

const CustomPopup = ({ visible, title, subtitle, confirmText, onConfirm, onCancel }: any) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <View style={styles.messageContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center", // 중앙 정렬
    alignItems: "center",
    position: "absolute", // 고정 위치
    bottom: 34, // 하단에서 34만큼 떨어짐
    width: "100%", // 화면 너비
    paddingHorizontal: 16, // 좌우 여백
  },
  deleteButton: {
    width: 81, // 삭제 버튼 너비
    height: 48, // 버튼 높이
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#612FEF", // 활성화된 버튼 색상
    borderRadius: 8,
    marginRight: 12, // 버튼 간격
  },
  loadButton: {
    width: 256, // 불러오기 버튼 너비
    height: 48, // 버튼 높이
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DBFC72", // 활성화된 버튼 색상
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#dcdcdc", // 비활성화된 버튼 색상
  },
  deleteActiveText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadActiveText: {
    color: "#612FEF",
    fontWeight: "bold",
  },
  disabledText: {
    color: "#a9a9a9",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10, // 양쪽 여백
    height: 56, // 헤더 높이
    borderBottomWidth: 1,
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18, // 글씨 크기
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    flex: 1, // 가운데 정렬을 위해 flex 사용
  },
  headerSpacer: {
    width: 24,
  },
  totalCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20, // 왼쪽 여백
    marginTop: 12, // 위쪽 여백
    marginBottom: 4, // 아래 리스트와의 간격
  },
  totalCountText: {
    width: 50, // 개수 텍스트 width
    height: 24, // 개수 텍스트 height
    fontFamily: "Pretendard Variable",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 24, // line-height
    color: "#000", // 기본 텍스트 색상
  },
  totalCountNumber: {
    color: "#7B61FF", // 숫자 강조 색상
    fontWeight: "bold",
  },
  clearAllButton: {
    width: 74, // 전체삭제 버튼 width
    height: 24, // 전체삭제 버튼 height
    marginRight: 20, // 오른쪽 여백
    marginLeft: 235, // 개수와의 간격
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 4, // 네모난 모양 유지
  },
  clearAllText: {
    color: "#929292", // 버튼 텍스트 색상
    fontFamily: "Pretendard Variable",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 19,
    textAlign: "center",
  },
  serviceItem: {
    padding: 10,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderColor: "#dcdcdc",
    backgroundColor: "white",
  },
  selectedServiceItem: {
    backgroundColor: "#E7E0FD",
  },
  serviceCategory: {
    color: "#929292",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#929292",
    textAlign: "center",
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: "center", // 화면 중앙 정렬
    alignItems: "center", // 가로 중앙 정렬
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
  },
  popupContainer: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  messageContainer: {
    height: 154, // 메시지 영역 높이 고정
    width: "100%", // 가로 전체 사용
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  buttonContainer: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  confirmButton: {
    height: 60, // 버튼 높이 줄임 (62 -> 60)
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5", // 회색 구분선
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF3B30", // 빨간색 텍스트
  },
  cancelButton: {
    height: 60, // 버튼 높이 줄임 (62 -> 60)
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  warningMessage: {
    position: "absolute",
    bottom: 80, // 하단 탭 위에 표시
    left: 20,
    right: 20,
    backgroundColor: "#E7E0FD",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  warningText: {
    color: "#7B61FF",
    fontWeight: "bold",
    fontSize: 14,
  },
});


export default TempStorage;
