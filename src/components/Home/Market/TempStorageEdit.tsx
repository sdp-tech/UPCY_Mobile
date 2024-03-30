import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Arrow from '../../../assets/common/Arrow.svg';
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-safearea-height";
import { Body14B, Body14M, Body16B, Subtitle16B } from "../../../styles/GlobalText";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { BLACK } from "../../../styles/GlobalColor";
import { SafeAreaView } from "react-native-safe-area-context";

const statusBarHeight = getStatusBarHeight(true);

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  z-index: 1;
`
const TempView = styled.View`
  padding: 10px;
`
const ButtonSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content:space-around;
`
const FooterButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding:12px;
  margin-bottom: 20px;
  margin-top: 10px;
  justify-content: center;
  border-radius: 12px;
`


const TextComponent = ({ name, date }: any) => {
  return (
    <View style={{ padding: 5, marginLeft: 20 }}>
      <Body16B>{name}</Body16B>
      <Body14M style={{ color: "#929292" }}>{date}</Body14M>
    </View>
  )
}

const TempStorageEdit = ({ navigation }: StackScreenProps<any>) => {
  interface Storage {
    id: number;
    name: string;
    date: string;
    isChecked?: boolean; // isChecked 속성은 선택적(optional)으로 정의합니다.
  }
  const [storage, setStorage] = useState<Storage[]>([
    {
      id: 1,
      name: "서비스 이름 어쩌구1",
      date: "2024.02.06.00:00",
      isChecked: false,
    },
    {
      id: 2,
      name: "서비스 이름 어쩌구2",
      date: "2024.02.06.00:00",
      isChecked: false,
    },
    {
      id: 3,
      name: "서비스 이름 어쩌구3",
      date: "2024.02.06.00:00",
      isChecked: false,
    },
    {
      id: 4,
      name: "서비스 이름 어쩌구4",
      date: "2024.02.06.00:00",
      isChecked: false,
    },
    {
      id: 5,
      name: "서비스 이름 어쩌구5",
      date: "2024.02.06.00:00",
      isChecked: false,
    }
  ]);

  // 삭제 로직 작동 이후 체크박스가 리스트 기억하는걸 강제로 리셋 
  const [version, setVersion] = useState(0);

  // 체크박스가 선택될 때마다 호출될 함수입니다.
  const handleCheckboxChange = (isChecked: boolean, id: number) => {
    const newItems = storage.map((item) => {
      if (item.id == id) {
        // 체크가 되었다면, isChecked를 동기화. 처음 누르면 true, 한 번 더 누르면 false.
        return { ...item, isChecked: isChecked };
      }
      else {
        return { ...item };
      }
    });
    setStorage(newItems);
  };

  // 삭제 버튼을 클릭했을 때 호출될 함수입니다.
  const handleDeletePressed = () => {
    // isChecked가 true인 항목을 삭제하고 새 배열을 생성합니다.
    const filteredItems = storage.filter(item => !item.isChecked);
    setStorage(filteredItems);
    setVersion(prev => prev + 1); // 리스트 버전 업데이트
  };
  // 전체 선택 버튼 눌렀을 때 호출될 함수 
  const handleSelectAll = () => {
    // 모든 항목이 선택되었는지 확인. 자세히는, 모든 아이템의 isChecked속성을 검사하고,
    // 모두 ture면 isAllChecked는 true가 됨. 모두는 아니라면, false가 됨. 
    const isAllChecked = storage.every(item => item.isChecked);
    // 모든 항목의 isChecked를 현재 상태의 반대로 설정. 
    // 모두 선택된 상황에서만 isAll이 true이므로 모두 false로 바꿔줌.
    // 몇 개만 선택된 상황이면, 선택되지 않은 애들의 isChecked 값은 isAll과 같은 false이기 때문.
    const toggledItems = storage.map(item => ({
      ...item,
      isChecked: !isAllChecked, // 모든 항목이 선택되었다면 해제, 그렇지 않다면 선택
    }));
    setStorage(toggledItems);
    setVersion(prev => prev + 1); // 버전 상태 업데이트해서 체크박스 리스트 강제 리렌더링 
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flexDirection: "row", borderBottomWidth: 1, borderBlockColor: "#dcdcdc", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <BackButton onPress={() => navigation.goBack()}>
              <Arrow color='black' />
            </BackButton>
          </View>
          <View style={{ flex: 1 }}>
            <Body16B style={{ fontSize: 18, textAlign: "center" }}>편집</Body16B>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => { navigation.navigate("TempStorage") }}>
              <Body14M style={{ color: "#929292" }}>완료</Body14M>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Body14B style={{ padding: 10 }}>총 {storage.length}개</Body14B>
          {storage.map((item) => (
            <TempView style={{ borderBottomWidth: 1, borderColor: "#dcdcdc" }} key={`${item.id}-${version}`}>
              <BouncyCheckbox
                isChecked={item.isChecked || false}
                size={25}
                fillColor="#612FEF"
                unfillColor="#FFF"
                textComponent=<TextComponent name={item.name} date={item.date} />
                iconStyle={{ borderColor: "#612FEF" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={(isChecked) =>
                  handleCheckboxChange(isChecked, item.id)
                }
              />
            </TempView>
          ))}
        </View>
        <ButtonSection style={{ flex: 1 }}>
          <FooterButton
            onPress={handleSelectAll}
            style={{ flex: 0.3, backgroundColor: "#612FEF" }}>
            <Subtitle16B style={{ color: "#DBFC72" }}>전체 선택</Subtitle16B>
          </FooterButton>
          <FooterButton
            onPress={handleDeletePressed}
            style={{ flex: 0.6, backgroundColor: "#DBFC72" }}>
            <Subtitle16B style={{ color: "#612FEF" }}>삭제하기</Subtitle16B>
          </FooterButton>
        </ButtonSection>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TempStorageEdit