import { StackScreenProps } from '@react-navigation/stack';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Button,
  ImageBackground,
  Alert,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import {
  Body14B,
  Body14M,
  Body16B,
  Subtitle16B,
  Subtitle16M,
  Subtitle18B,
} from '../../../styles/GlobalText';
import { BLACK2, LIGHTGRAY, PURPLE } from '../../../styles/GlobalColor';
import InputBox from '../../../common/InputBox';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Hashtag from '../../../common/Hashtag';
import Slider from '@react-native-community/slider';
import PhotoOptions, { PhotoResultProps } from '../../../common/PhotoOptions';
import Carousel from '../../../common/Carousel';
import FilterElement from './FilterElement';
import { useBottomBar } from '../../../../contexts/BottomBarContext';
import DetailScreenHeader from '../components/DetailScreenHeader';
import SelectBox from '../../../common/SelectBox';
import ServiceCategoryModal from '../components/ServiceCategoryModal';
import ImageCarousel from '../../../common/ImageCarousel';
import { PhotoType } from '../../../hooks/useImagePicker';
import { RichEditor } from 'react-native-pell-rich-editor';
import Help from '../../../assets/common/Help.svg';
import { Modal } from 'react-native';
import { getAccessToken, getMarketUUID } from '../../../common/storage';
import Request from '../../../common/requests';
import { MyPageStackParams } from '../../../pages/MyPage';
import React from 'react';

const { width } = Dimensions.get('window');

const ButtonSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const UploadSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  background-color: gray;
`;

const UploadButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px 0px 20px;
  background: ${LIGHTGRAY};
  border-radius: 6px;
  margin-bottom: 20px;
`;

const FooterButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  margin-bottom: 20px;
  margin-top: 10px;
  justify-content: center;
  border-radius: 12px;
`;

const FillerSection = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 250px;
  background-color: white;
  margin: 10px;
  border: 1px solid #612fef;
  border-radius: 8px;
`;
const TagBox = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

interface CategoryProps {
  category: string;
}

export interface Option {
  // 옵션 개별 요소들 prop
  option: string;
  price?: number; // TODO: price prop 없애고 나중에 없애기
  optionExplain: string;
  isFixing: boolean;
  addPrice: string;
  photoAdded: boolean;
  optionPhotos: PhotoType[];
}

interface Style {
  style_name: string;
}

interface Material {
  material_name: string;
}

interface ServiceRegiProps extends StackScreenProps<MyPageStackParams, 'ServiceRegistrationPage'> {
  fix: boolean;
}

const ServiceRegistrationPage = ({
  navigation,
  route,
}: ServiceRegiProps) => {
  const { hideBottomBar, showBottomBar } = useBottomBar();
  const serviceData = route.params?.serviceData || {}; // 전달된 데이터 수신
  const service_uuid = serviceData.service_uuid ? serviceData.service_uuid : '';
  const fix = route.params?.fix ?? false;
  // 전달된 데이터로 초기 상태 설정
  useFocusEffect(
    useCallback(() => {
      if (!serviceData || Object.keys(serviceData).length === 0) return;

      setName(prev => (prev !== serviceData.service_title ? serviceData.service_title || '' : prev));
      setInputText(prev => (prev !== serviceData.service_content ? serviceData.service_content || '' : prev));
      setForm(prev => (prev.category !== serviceData.service_category ? { category: serviceData.service_category || '' } : prev));
      setMakingTime(prev => (prev !== serviceData.service_period ? serviceData.service_period || 0 : prev));
      setPrice(prev => (prev !== serviceData.basic_price?.toString() ? serviceData.basic_price?.toString() || '' : prev));
      setMaxPrice(prev => (prev !== serviceData.max_price?.toString() ? serviceData.max_price?.toString() || '' : prev));
      setStyles(prev => (JSON.stringify(prev) !== JSON.stringify(serviceData.service_style) ? serviceData.service_style || [] : prev));
      setMaterials(prev => (JSON.stringify(prev) !== JSON.stringify(serviceData.service_material) ? serviceData.service_material || [] : prev));
      setPhotos(prev => (JSON.stringify(prev) !== JSON.stringify(serviceData.thumbnail_photo ? [{ uri: serviceData.thumbnail_photo.image }] : [])
        ? serviceData.thumbnail_photo.image ? [{ uri: serviceData.thumbnail_photo.image }] : []
        : prev));
      setDetailPhoto(prev => (JSON.stringify(prev) !== JSON.stringify(serviceData.detail_photos?.slice(1).map(photo => ({ uri: photo.image })) || [])
        ? serviceData.detail_photos?.slice(1).map(photo => ({ uri: photo.image })) || []
        : prev));
      setOptionList(prev => (JSON.stringify(prev) !== JSON.stringify(serviceData.service_option?.map(option => ({
          option: option.option_name || '',
          optionExplain: option.option_content || '',
          addPrice: option.option_price ? option.option_price.toString() : '',
          optionPhotos: option.option_photos || [],
          photoAdded: !!option.option_photos?.length,
          isFixing: false,
        })) || []) ? serviceData.service_option?.map(option => ({
          option: option.option_name || '',
          optionExplain: option.option_content || '',
          addPrice: option.option_price ? option.option_price.toString() : '',
          optionPhotos: option.option_photos || [],
          photoAdded: !!option.option_photos?.length,
          isFixing: false,
        })) || [] : prev));
    }, [serviceData])
  );

  useEffect(() => {
    hideBottomBar();
    //console.log('serviceData:', serviceData);
    //console.log('route.params:', route.params);
    return () => showBottomBar();
  }, []);

  // 중복 선택 로직
  const handleSeveralPress = (type: string, value: string): void => {
    if (type == 'style' && styles.includes(value)) {
      // 이미 클릭하려는 value가 선택된 적이 있으면,
      const extractedStyles = styles.filter(v => v !== value);
      // 그 value 제외하고 리스트 생성
      setStyles(
        [...new Set([...extractedStyles])],
      );
    } else if (type == 'style' && styles.length < 3) {
      // value가 선택된 적이 없으면, 즉 처음 선택하면
      setStyles(prevStyles => [...new Set([...prevStyles, value])]);
      // 바로 추가해주고 상태관리
    } else if (type == 'style' && styles.length == 3) {
      Alert.alert('3개까지만 선택 가능합니다!');
    } else if (type == 'material' && materials.includes(value)) {
      // 이미 클릭하려는 value가 선택된 적이 있으면,
      const extractedMaterials = materials.filter(v => v !== value);
      // 그 value 제외하고 리스트 생성
      setMaterials(
        [...new Set([...extractedMaterials])],
      );
    } else if (type == 'material') {
      // value가 선택된 적이 없으면, 즉 처음 선택하면
      setMaterials(prevMaterials => [...new Set([...prevMaterials, value])]);
      // 바로 추가해주고 상태관리
    }
  };

  const handleNavigate = () => { // 서비스 상세 작성 페이지
    navigation.navigate('WriteDetailPage', {
      inputText,
      detailPhoto,
      serviceData,
    });
  };

  const request = Request();

  const [isOpen, setIsOpen] = useState(false); // 가이드라인 모달
  // 해시태그는 이름만 해시태그지, 실제 기능은 좀 다름. 백에 올릴 필요는 없음
  const [hashtagText, setHashtagText] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false); // 카테고리 모달
  const [bottomVisible, setBottomVisible] = useState(!modalOpen); // 서비스 카테고리 등록 시, 바텀바 숨김 여부 
  // 이 밑으로는 서비스 자체의 prop
  const [form, setForm] = useState<CategoryProps>({
    category: '', // 백에 넘겨줄 prop: form.category
  });
  const [styles, setStyles] = useState<string[]>([]); // 서비스 스타일 
  const [materials, setMaterials] = useState<string[]>([]); // 작업 가능 소재 
  const [makingTime, setMakingTime] = useState<number>(0); // 예상 제작 기간 
  const [name, setName] = useState<string>(''); // 서비스 이름 
  const [price, setPrice] = useState<string>(''); // 기본 가격 (예: 20000)
  const [maxPrice, setMaxPrice] = useState<string>(''); // 최대 가격 (예: 24000)
  const [photos, setPhotos] = useState<PhotoType[]>([]); // 썸네일 사진
  const [detailPhoto, setDetailPhoto] = useState<PhotoType[]>([]); // 서비스 설명에 들어가는 사진
  const [inputText, setInputText] = useState(route.params?.inputText || ''); // 서비스 설명 내용 
  // 이 밑으론 옵션 개별 요소들 prop
  const [option, setOption] = useState<string>(''); // 옵션 이름 
  const [addPrice, setAddprice] = useState<string>(''); // 옵션 가격 (추가가격)
  const [optionExplain, setOptionExplain] = useState<string>(''); // 옵션 설명 
  const [optionPhotos, setOptionPhotos] = useState<PhotoType[]>([]); // 옵션 사진 
  const [optionList, setOptionList] = useState<Option[]>([]); // 위에 것들을 담는 옵션 리스트 
  // 얘네는 전달할 필요 없음 
  const [isFixing, setIsFixing] = useState(false);
  const [photoAdded, setPhotoAdded] = useState(false);

  const formattedOptions = (optionList || []).map(option => ({
    option_name: option.option || '', // 옵션 이름
    option_content: option.optionExplain || '', // 옵션 설명
    option_price: parseInt(option.addPrice || '0', 10), // 옵션 가격 (문자열을 숫자로 변환)

  }));

  const formattedStyles: Style[] = (styles || []).map((style) => ({
    style_name: style || '',
  }));

  const formattedMaterials: Material[] = (materials || []).map((material) => ({
    material_name: material || '',
  }));

  const handleMaterialAndStyleSubmit = async (service_uuid: string) => {
    const accessToken = await getAccessToken();
    const market_uuid = await getMarketUUID();

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // 배열이 undefined인 경우 빈 배열로 초기화
    const materials = formattedMaterials || [];
    const styles = formattedStyles || [];
    const options = formattedOptions || [];

    // Material 등록
    for (const material of materials) {
      const materialParams = { material_name: material.material_name };
      try {
        const response = await request.post(
          `/api/market/${market_uuid}/service/${service_uuid}/material`,
          materialParams,
          headers
        );
        if (response?.status === 201) {
          console.log(`Material ${material.material_name} 등록 완료`);
        } else {
          console.log('재료 등록 실패');
          console.log(response);
        }
      } catch (err) {
        console.error(`Material ${material.material_name} 등록 실패:`, err);
      }
    }

    // Style 등록
    for (const style of styles) {
      const styleParams = { style_name: style.style_name };
      try {
        const response = await request.post(
          `/api/market/${market_uuid}/service/${service_uuid}/style`,
          styleParams,
          headers
        );
        if (response?.status === 201) {
          console.log(`Style ${style.style_name} 등록 완료`);
        } else {
          console.log('스타일 등록 실패');
          console.log(response);
        }
      } catch (err) {
        console.error(`Style ${style.style_name} 등록 실패:`, err);
      }
    }

    // OptionList 등록 
    for (const option of options) {
      const optionParams = {
        option_name: option.option_name,
        option_content: option.option_content,
        option_price: option.option_price,
      };
      try {
        const response = await request.post(
          `/api/market/${market_uuid}/service/${service_uuid}/option`,
          optionParams,
          headers
        );
        if (response?.status === 201) {
          console.log(`Option 등록 완료`);
        } else {
          console.log('옵션 등록 실패');
          console.log(response);
        }
      } catch (err) {
        console.error(`Option 등록 실패:`, err);
      }
    }
  };

  const uploadImage = async (service_uuid: any, method: string, option_uuidList?: any) => {
    const accessToken = await getAccessToken();
    const market_uuid = await getMarketUUID();
    const headers_ = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data', // multipart/form-data 설정
    };
    if (method === 'option') { // 옵션별 이미지 업로드 
      for (const id of option_uuidList) { // 여러개의 uuid 각각에 진행 
        const formData = new FormData();
        for (let option of optionList) {
          const newPhotos = option.optionPhotos.filter(newPhoto => // 새로운 이미지만 필터링
            !option.optionPhotos.some(existingPhoto =>
              existingPhoto.uri === newPhoto.uri
            )
          );

          console.log(`uploadImage에서 [옵션 ${id}] 중복 검사 후 이미지 업로드 중...`, newPhotos);
          for (let photo of newPhotos) {
            if (photo?.uri) {
              formData.append('option_image', {
                uri: photo.uri,
                type: 'image/jpeg',
                name: photo.fileName || 'option_image.jpg',
              });
            }
          }
        }

        if (formData.getParts().length > 0) {
          try {
            const response = await request.post(`/api/market/${market_uuid}/service/${service_uuid}/option/${id}/image`, formData, headers_);
            if (response && response.status === 200) {
              console.log('옵션', id, '이미지 업로드 성공');
            } else {
              console.log(response);
              console.log('옵션', id, '이미지 업로드 실패');
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log('옵션', id, '이미지 중복으로 업로드 안함');
        }
      }
    } else if (method === 'thumbnail') { // 서비스 썸네일, 상세 사진들 등록 
      const formData = new FormData();
      const newPhotos = photos.filter(newPhoto =>
        !serviceData?.thumbnail_photo?.image || newPhoto.uri !== serviceData.thumbnail_photo.image
      );

      console.log('uploadImage에서 썸네일 이미지 중복 검사 후 업로드 중...', newPhotos);
      if (newPhotos.length > 0) {
        formData.append('service_image', {
          uri: newPhotos[0]?.uri,
          type: 'image/jpeg',
          name: newPhotos[0]?.fileName || 'service_image.jpg',
        });
      }

      const newDetailPhotos = detailPhoto.filter(newPhoto =>
        !(serviceData?.detail_photos?.slice(1).some(existingPhoto =>
          existingPhoto.image === newPhoto.uri
        ))
      );

      console.log('uploadImage에서 서비스 상세 이미지 중복 검사 후 업로드 중...', newDetailPhotos);
      for (let photo of newDetailPhotos) {
        formData.append('service_image', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: photo.fileName || 'service_image.jpg',
        });
      }

      if (formData.getParts().length > 0) {
        try {
          const response = await request.post(`/api/market/${market_uuid}/service/${service_uuid}/image`, formData, headers_);
          if (response && response.status === 200) {
            console.log('서비스 썸네일 및 상세 이미지 업로드 성공');
          } else {
            console.log(response);
            console.log('서비스 썸네일 및 상세 이미지 업로드 실패');
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('썸네일 및 상세 이미지 중복으로 업로드 안함');
      }
    } else {

    }
  }
  // 인자로 true 전달하면 임시저장, false면 일반 등록 
  const handleSubmit = async (temp: boolean) => {
    const accessToken = await getAccessToken();
    const market_uuid = await getMarketUUID();

    const serviceImages = [
      ...(photos.length > 0 ? [photos[0].uri] : []),
      ...detailPhoto.map(photo => photo.uri),
    ];

    const params = {
      service_title: name,
      service_content: inputText,
      service_category: form.category,
      service_period: makingTime,
      basic_price: parseInt(price, 10),
      max_price: parseInt(maxPrice, 10),
      service_style: formattedStyles,
      service_material: formattedMaterials,
      service_option: formattedOptions,
      service_image: serviceImages,
      temporary: temp,
    };
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    if (temp) { // 임시저장 눌렀을 경우 
      const params_ = {
        ...params,
        service_title: name || '임시 저장 서비스',
        service_content: inputText || '임시 설명',
        service_category: form.category || '기타(외주)',
        service_period: makingTime || 0,
        basic_price: parseInt(price, 10) || 10000,
        max_price: parseInt(maxPrice, 10) || 20000,
        service_style: formattedStyles || [{ style_name: "빈티지" }],
        service_material: formattedMaterials || [{ material_name: "면" }],
        service_option: formattedOptions || [{
          option_content: '임시설명',
          option_name: "임시옵션",
          option_price: 1000,
        }],
        temporary: temp,
      };
      if (service_uuid) { // PUT 요청: 기존 임시저장 서비스 업데이트
        try {
          const response = await request.put(
            `/api/market/${market_uuid}/service/${service_uuid}`,
            params,
            headers
          );
          if (response?.status === 200) {
            const option_uuidList: any[] =
              response.data.service_options ? response.data.service_options.map((option: any) => option.option_uuid)
                : [];
            await uploadImage(service_uuid, 'option', option_uuidList);
            await uploadImage(service_uuid, 'thumbnail');
            console.log("임시저장 서비스 업데이트 완료:", response.data);
          }
        } catch (err) {
          console.error("임시 저장 업데이트 실패:", err);
        }
      } else {            // POST 요청: 새로운 임시저장 서비스 생성
        try {
          const response = await request.post(`/api/market/${market_uuid}/service`, params_, headers);
          console.log("response: ", response);
          console.log("params: ", params_)
          if (response?.status === 201) {
            console.log(response.data);
            console.log(params_);
            const service_uuid = await response?.data.service_uuid;
            const option_uuidList: any[] =
              response.data.service_options ? response.data.service_options.map((option: any) => option.option_uuid)
                : []; // 없으면 빈 배열
            // 그리고 아래에서 그 리스트 전달, 이후 함수에서 리스트 다시 분해해서 반복문 돌려서 사진 업로드
            console.log('옵션 id 리스트:', option_uuidList);
            await uploadImage(service_uuid, 'option', option_uuidList); // 옵션별 사진 등록
            await uploadImage(service_uuid, 'thumbnail'); // 서비스 썸네일 등록
            console.log("TempService UUID:", service_uuid);
            // navigation.navigate('ReformerProfilePage');
            console.log("임시등록 성공!");
          }
        } catch (err) {
          console.error(err);
        }
      }
      navigation.navigate('TempStorage'); // 차후 수정 필요
    }
    if ( // 일반 등록일 경우, 필수 필드 모두 채워야함
      !(form.category == '') &&
      !(name == '') &&
      !(styles.length == 0) &&
      !(inputText == '') &&
      !(price == '') &&
      !(maxPrice == '') &&
      !(photos.length == 0) &&
      !(materials.length == 0)
    ) {
      if(service_uuid){  //임시저장 서비스를 등록할 경우
        try {
          const response = await request.put(`/api/market/${market_uuid}/service/${service_uuid}`, params, headers);
          if (response?.status === 200) {
            console.log('응답 결과:', response.data);
            const option_uuidList: any[] =
              response.data.service_options ? response.data.service_options.map((option: any) => option.option_uuid)
                : []; // 없으면 빈 배열
            // 그리고 아래에서 그 리스트 전달, 이후 함수에서 리스트 다시 분해해서 반복문 돌려서 사진 업로드
            console.log('옵션 id 리스트:', option_uuidList);
            await uploadImage(service_uuid, 'option', option_uuidList); // 옵션별 사진 등록
            await uploadImage(service_uuid, 'thumbnail'); // 서비스 썸네일 등록
            // navigation.navigate('ReformerProfilePage');
            console.log("서비스가 성공적으로 등록되었습니다!");
            Alert.alert(
              "서비스 등록이 완료되었습니다.",
              "",
              [
                { text: "확인", onPress: () => { navigation.navigate('ReformerMyPageScreen'); } }
              ]
            );
          } else {
            Alert.alert('서비스 등록에 실패했습니다.')
            console.log(response);
          }
        } catch (err) {
          console.error(err);
        }
      } else if (!service_uuid){
        try {
          const response = await request.post(`/api/market/${market_uuid}/service`, params, headers);
          if (response?.status === 201) {
            console.log('응답 결과:', response.data);
            const service_uuid = await response?.data.service_uuid;
            const option_uuidList: any[] =
              response.data.service_options ? response.data.service_options.map((option: any) => option.option_uuid)
                : []; // 없으면 빈 배열
            // 그리고 아래에서 그 리스트 전달, 이후 함수에서 리스트 다시 분해해서 반복문 돌려서 사진 업로드
            console.log('옵션 id 리스트:', option_uuidList);
            await uploadImage(service_uuid, 'option', option_uuidList); // 옵션별 사진 등록
            await uploadImage(service_uuid, 'thumbnail'); // 서비스 썸네일 등록
            console.log("Service UUID:", service_uuid);
            // navigation.navigate('ReformerProfilePage');
            console.log("서비스가 성공적으로 등록되었습니다!");
            Alert.alert(
              "서비스 등록이 완료되었습니다.",
              "",
              [
                { text: "확인", onPress: () => { navigation.navigate('ReformerMyPageScreen'); } }
              ]
            );
          } else {
            Alert.alert('서비스 등록에 실패했습니다.')
            console.log(response);
          }
      } catch (err) {
        console.error(err);
      }
    } else { // 누락된거 있는 경우 
      Alert.alert('필수 사항들을 모두 입력해주세요');
    }
  }};

  useEffect(() => { // 카테고리 모달 열 때 바텀바 숨기기 .. 
    setBottomVisible(!modalOpen);
  }, [modalOpen])

  useEffect(() => {
    if (route.params?.inputText && inputText !== route.params.inputText) {
      setInputText(route.params.inputText);
    }
    if (route.params?.detailPhoto && detailPhoto !== route.params.detailPhoto) {
      setDetailPhoto(route.params.detailPhoto);
    }
  }, [route.params?.inputText, route.params?.detailPhoto]);

  const editorRef = useRef<RichEditor>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContentHTML(inputText);
    }
  }, [inputText]);

  const addOption1 = () => {
    const isString = (value: any) =>
      typeof value === 'string' && value.trim() !== '';
    const isNumericString = (value: any) =>
      typeof value === 'string' &&
      !isNaN(parseFloat(value)) &&
      isFinite(parseFloat(value));

    if (
      !isString(option) ||
      !isNumericString(addPrice) ||
      !isString(optionExplain)
    ) {
      Alert.alert('옵션 사항을 모두 입력해주세요');
    } else if (price == '') {
      Alert.alert('아래의 기본 가격을 입력해주세요');
    } else if (maxPrice == '') {
      Alert.alert('아래의 최대 가격(추가 금액의 상한선)을 입력해주세요');
    } else if (parseInt(maxPrice, 10) < parseInt(addPrice, 10)) {
      Alert.alert('추가 금액이 최대 가격의 상한선보다 높습니다');
    } else if (parseInt(price, 10) > parseInt(maxPrice, 10)) {
      Alert.alert('기본 가격이 최대 가격보다 높습니다');
    } else if (optionExplain.length > 50) {
      Alert.alert('설명은 50자 이내로 입력해주세요');
    } else {
      const newOption = {
        option: option,
        price: parseInt(addPrice, 10),
        optionExplain: optionExplain,
        isFixing: isFixing,
        addPrice: addPrice,
        photoAdded: photoAdded,
        optionPhotos: optionPhotos,
      };
      setOptionList([...optionList, newOption]);
      // 입력 필드 초기화
      setOption('');
      setAddprice('');
      setOptionExplain('');
      setIsFixing(false);
      setOptionPhotos([]);
      setPhotoAdded(false);
    }
  };
  const addOption2 = (item: Option, idx: number) => {
    const isString = (value: any) =>
      typeof value === 'string' && value.trim() !== '';
    const isNumericString = (value: any) =>
      typeof value === 'string' &&
      !isNaN(parseFloat(value)) &&
      isFinite(parseFloat(value));

    if (
      !isString(item.option) ||
      !isNumericString(item.addPrice) ||
      !isString(item.optionExplain)
    ) {
      Alert.alert('옵션 사항을 모두 입력해주세요');
    } else if (item.optionExplain.length > 50) {
      Alert.alert('설명은 50자 이내로 입력해주세요');
    } else {
      const updatedOptionList = [...optionList];
      const updatedOption = {
        ...updatedOptionList[idx], // 기존 옵션 유지
        option: item.option,
        price: parseInt(item.addPrice, 10),
        optionExplain: item.optionExplain,
        isFixing: false, // 수정 완료 후 isFixing을 false로 변경
        addPrice: item.addPrice,
        optionPhotos: item.optionPhotos,
      };
      updatedOptionList[idx] = updatedOption;
      setOptionList(updatedOptionList);
      setIsFixing(false);
    }
  };

  const removeOption = (idx: number): void => {
    const newList = [...optionList];
    newList.splice(idx, 1); // index 위치에서 1개의 항목을 제거
    setOptionList(newList);
  };

  const fixOption = (idx: number): void => {
    // '수정하기'버튼 눌렀을 시 호출.
    if (idx >= 0 && idx < optionList.length) {
      // idx 범위를 체크
      const fixingList = [...optionList];
      fixingList[idx].isFixing = true; // 특정 항목의 isFixing 값을 true로 설정
      setOptionList(fixingList);
    } else {
      console.error('Invalid index', idx);
    }
  };

  const photoAdd1 = () => {
    if (photoAdded) {
      setPhotoAdded(false);
    } else {
      setPhotoAdded(true);
    }
  };

  const photoAdd2 = (item: Option, idx: number) => {
    if (idx >= 0 && idx < optionList.length) {
      // idx 범위를 체크
      if (item.photoAdded) {
        // 수정하기 상태에서 다시 클릭시 (이미지 수정 안하고 싶을 때)
        // photoAdded false로 변경
        const fixingList = [...optionList];
        fixingList[idx].photoAdded = false;
        setOptionList(fixingList);
      } else {
        // 이미지 수정 버튼 눌렀을 때
        const fixingList = [...optionList];
        fixingList[idx].photoAdded = true;
        setOptionList(fixingList);
      }
    }
  };
  const handleExtractHashtags = () => {
    // 공백을 기준으로 입력된 텍스트 슬라이싱
    const words = hashtagText.split(/\s+/);
    //const extractedHashtags = words.filter(word => word.startsWith('#'));
    // 기존 해시태그에 새롭게 인풋된 해시태그 추가하여 상태 업데이트
    if (words.length + hashtags.length <= 5) {
      setMaterials(prevMaterials => [...new Set([...prevMaterials, ...words])]);
      setHashtags(prevHashtags => [...new Set([...prevHashtags, ...words])]);
      // 입력 필드 초기화
      setHashtagText('');
      console.log(optionList);
    } else {
      Alert.alert('추가소재는 5개 이하로 입력해주세요');
    }
  };
  const removeHashtag = (value: string) => {
    const extractedHashs = hashtags.filter(v => v !== value);
    const extractedMates = materials.filter(v => v !== value);
    // 그 value 제외하고 리스트 생성
    setMaterials([...new Set([...extractedMates])]);
    setHashtags([...new Set([...extractedHashs])]);
    // 상태관리
  }; // 자기 자신을 리스트에서 삭제하는 로직

  // 개별 옵션 내의 이미지 변경 함수
  const handleOptionImageChange = (index: number, images: PhotoType[]) => {
    const updatedOptionList = [...optionList];
    updatedOptionList[index].optionPhotos = images;
    setOptionList(updatedOptionList);
  };

  const splitArrayIntoPairs = (arr: any[], pairSize: number) => {
    return arr.reduce((result, item, index) => {
      if (index % pairSize === 0) {
        result.push([]);
      }
      result[result.length - 1].push(item);
      return result;
    }, []);
  };
  const splitPhotos = splitArrayIntoPairs(photos, 1);

  const scrollRef = useRef<ScrollView>(null);
  const handleCursorPosition = useCallback((scrollY: number) => {
    // Positioning scroll bar
    scrollRef.current!.scrollTo({ y: scrollY - 30, animated: true });
  }, []);

  const ServiceRegiBottomBar = (
    <SafeAreaView>
      <View
        style={{
          alignContent: 'center',
          position: 'absolute',
          bottom: -30,
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
        }}>{bottomVisible &&
          <ButtonSection style={{ flex: 1, marginHorizontal: 10 }}>
            {fix ? (
              <>
                {/* fix === true */}
                <FooterButton
                  style={{ flex: 0.2, backgroundColor: '#612FEF' }}
                  onPress={() => navigation.goBack()}>
                  <Subtitle16B style={{ color: '#FFFFFF' }}>취소</Subtitle16B>
                </FooterButton>
                <FooterButton
                  style={{ flex: 0.7, backgroundColor: '#DBFC72' }}
                  onPress={() => handleSubmit(false)}>
                  <Subtitle16B style={{ color: '#612FEF' }}>확인</Subtitle16B>
                </FooterButton>
              </>
            ) : (
              <>
                {/* fix === false */}
                <FooterButton
                  style={{ flex: 0.2, backgroundColor: '#612FEF' }}
                  onPress={() => Alert.alert(
                    '썸네일, 상세 사진 등은 저장되지 않습니다. 괜찮으시겠습니까?',
                    '',
                    [
                      { text: '아니오', onPress: () => { }, style: 'destructive' },
                      { text: '네', onPress: () => handleSubmit(true) },
                    ],
                    { cancelable: false },
                  )}>
                  <Subtitle16B style={{ color: '#FFFFFF' }}>임시저장</Subtitle16B>
                </FooterButton>
                <FooterButton
                  style={{ flex: 0.7, backgroundColor: '#DBFC72' }}
                  onPress={() => handleSubmit(false)}>
                  <Subtitle16B style={{ color: '#612FEF' }}>등록</Subtitle16B>
                </FooterButton>
              </>
            )}
          </ButtonSection>
        }

      </View>
    </SafeAreaView>
  );

  const handleGoBack = () => {
    Alert.alert(
      "정말로 나가시겠습니까?",
      "",
      [
        {
          text: "임시저장", onPress: () =>
            Alert.alert(
              '썸네일, 상세 사진 등은 저장되지 않습니다. 괜찮으시겠습니까?',
              '',
              [
                { text: '아니오', onPress: () => { }, style: 'destructive' },
                { text: '네', onPress: () => handleSubmit(true) },
              ],
              { cancelable: false },
            )
        },
        { text: "아니오", onPress: () => { } },
        { text: "네", onPress: navigation.goBack, style: "destructive" }
      ],
      { cancelable: false }
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DetailScreenHeader
        title="서비스 등록"
        leftButton="LeftArrow"
        onPressLeft={() => handleGoBack()}
        rightButton="None"
        onPressRight={() => { }}
        saved={0}
      />
      {/* 헤더부분 */}
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView bounces={false}>
          {photos.length == 0 && (
            <View style={{ backgroundColor: '#222222' }}>
              <Button title="대표 이미지는 1장만 등록 가능합니다."></Button>
              <Button title="흰색 배경의 사진은 지양해주세요."></Button>
            </View>

          )}
          {/* 사진 업로드하는 컴포넌트 만들 것 */}
          {photos.length == 0 && (
            <View>
              <UploadSection
                style={{
                  borderBottomWidth: 5,
                  borderBottomColor: '#dcdcdc',
                  flex: 1,
                  height: width * 0.5,
                }}>
                <View
                  style={{
                    backgroundColor: LIGHTGRAY,
                    borderRadius: 6,
                  }}>
                  <PhotoOptions
                    style={{
                      alignContent: 'center',
                      margin: 5,
                      marginBottom: 5,
                    }}
                    max={1}
                    setPhoto={setPhotos}
                    buttonLabel="대표 이미지 등록"
                  />
                </View>
              </UploadSection>
            </View>
          )}
          {photos.length > 0 && (
            <View style={{ flex: 1, width: width, height: width * 0.5 }}>
              <Carousel
                data={splitPhotos}
                renderItem={({ item, index }: any) => {
                  return (
                    <View key={index}>
                      {item.map((subItem: any, subIndex: number) => (
                        <View key={subIndex} style={{ height: width * 0.5 }}>
                          <ImageBackground
                            key={subItem.id}
                            source={{ uri: subItem.uri }}
                            style={{ width: 'auto', height: '100%' }}
                            alt={subItem.fileName}
                          />
                        </View>
                      ))}
                    </View>
                  );
                }}
              />
            </View>
          )}
          {photos.length > 0 && (
            <View
              style={{ position: 'absolute', right: 0, top: width * 0.4 - 4 }}>
              <TouchableOpacity style={{ padding: 4, flex: 1 }}>
                <PhotoOptions
                  style={{ backgroundColor: '#222222' }}
                  max={1}
                  setPhoto={setPhotos}
                  buttonLabel="   dddddddd "
                />
                <Text
                  style={{
                    position: 'absolute',
                    left: 20,
                    bottom: 33,
                    color: '#ffffff',
                    zIndex: 2,
                  }}>
                  등록한 이미지 수정
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              padding: 10,
              borderBottomWidth: 3,
              borderBottomColor: '#dcdcdc',
              flex: 1,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Body16B style={{ margin: 10 }}>서비스 이름</Body16B>
              <Subtitle18B style={{ color: PURPLE, marginLeft: '-1%' }}>
                *
              </Subtitle18B>
            </View>
            <View style={{ margin: 10 }}>
              <InputBox
                style={{ height: 50 }}
                value={name}
                setValue={setName}
                placeholder="서비스 이름을 입력해주세요"
              />
            </View>
          </View>
          <View
            style={{
              padding: 20,
              flex: 1,
              borderBottomWidth: 1,
              borderColor: '#EAEAEA',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Body16B>카테고리</Body16B>
              <Body16B style={{ color: '#612FEF' }}> *</Body16B>
            </View>
            <SelectBox
              value={form.category}
              onPress={() => { setModalOpen(true) }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                padding: 10,
                borderBottomWidth: 8,
                borderColor: '#EAEAEA',
              }}>
              <Body16B
                style={{ margin: 10, marginBottom: -10, color: '#612FEF' }}>
                3개까지 중복선택 가능합니다.
              </Body16B>
              <FilterElement
                list={styles}
                onPress={handleSeveralPress}
                type="style"
                label="스타일"
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                padding: 10,
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#dcdcdc',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Body16B style={{ margin: 10 }}>제작기간</Body16B>
                <Subtitle18B style={{ color: PURPLE, marginLeft: '-1%' }}>
                  *
                </Subtitle18B>
              </View>
              <View style={{ margin: 10, flex: 1, flexDirection: 'column' }}>
                <Slider
                  style={{ flex: 1, height: 40 }}
                  value={makingTime}
                  onValueChange={setMakingTime}
                  minimumValue={0}
                  step={1}
                  maximumValue={5}
                  // makingTime이 0: 3일, 1: 5일, 2: 7일, 3: 3주, 4: 5주, 5: 8주
                  minimumTrackTintColor="#612FEF"
                  maximumTrackTintColor="#E7E0FD"
                  thumbTintColor="#612FEF"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#929292',
                    }}>
                    3일
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#929292',
                    }}>
                    5일
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#929292',
                    }}>
                    7일
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#929292',
                    }}>
                    3주
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#929292',
                    }}>
                    5주
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#929292',
                    }}>
                    8주
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'Pretendard Variable',
                  color: '#612fef',
                  paddingLeft: 12,
                }}>
                재료 수령일로부터 소요되는 제작 기간을 설정해주세요
              </Text>
            </View>
            {ServiceDetailSection()}
            {/* 서비스 상세 작성하기 섹션  */}
            <View style={{ flex: 1 }}>
              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 8,
                  borderColor: '#EAEAEA',
                }}>
                <FilterElement
                  list={materials}
                  onPress={handleSeveralPress}
                  type="material"
                  label="작업 가능한 소재"
                />
                <View
                  style={{
                    marginBottom: 5,
                    marginHorizontal: 10,
                    marginTop: -10,
                  }}>
                  <TagBox>
                    {hashtags.map((item, index) => (
                      <Hashtag
                        key={index}
                        pressable
                        value={item}
                        pressed={false}
                        onPress={() => removeHashtag(item)}
                      />
                    ))}
                  </TagBox>
                </View>
                <InputBox
                  style={{ height: 50 }}
                  value={hashtagText}
                  onChangeText={setHashtagText}
                  placeholder="소재 구분은 스페이스로, 엔터로 추가"
                  onSubmitEditing={handleExtractHashtags} // Enter를 눌렀을 때 해시태그 추출
                  returnKeyType="done" // Enter가 줄바꿈이 아니라 제출 이벤트 일으키도록.
                />
              </View>
            </View>
          </View>
          {addOptionSection()}
          {/* 옵션 추가 섹션 */}
          <View
            style={{
              flex: 1,
              padding: 10,
              borderBottomWidth: 3,
              borderBottomColor: '#dcdcdc',
            }}>
            <Body16B style={{ margin: 10 }}>등록된 옵션 목록</Body16B>
            {OptionListSection()}
            {/* 등록된 옵션 목록 섹션 */}
          </View>
          <View
            style={{
              flex: 1,
              padding: 10,
              borderBottomWidth: 3,
              borderBottomColor: '#dcdcdc',
              marginBottom: 44,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginRight: 10,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Body16B style={{ margin: 10 }}>가격</Body16B>
                <Subtitle18B
                  style={{
                    color: PURPLE,
                    marginLeft: '-1%',
                    marginRight: '2%',
                  }}>
                  *
                </Subtitle18B>
              </View>
              <Body14B style={{ color: '#929292' }}>
                최대 가격은 옵션 추가 시에 가능한 상한선입니다.
              </Body14B>
            </View>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                margin: 10,
              }}>
              <Body16B style={{ marginRight: 20 }}>기본 가격</Body16B>
              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderColor: BLACK2,
                  borderRadius: 5,
                  padding: 10,
                }}
                value={price}
                onChangeText={setPrice}
                placeholder="예) 20000"
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                margin: 10,
              }}>
              <Body16B style={{ marginRight: 20 }}>최대 가격</Body16B>
              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderColor: BLACK2,
                  borderRadius: 5,
                  padding: 10,
                }}
                value={maxPrice}
                onChangeText={setMaxPrice}
                placeholder="예) 24000"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ServiceCategoryModal
        open={modalOpen}
        setOpen={setModalOpen}
        value={form.category}
        setValue={text =>
          setForm(prev => {
            return { ...prev, category: text };
          })
        }
      />
      <Modal
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(!isOpen);
        }}
        animationType="slide">
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Body16B>
              1. 서비스 제공 시 업씨러에게 받아야 하는 {'\n'}
              필요 정보를 상세히 작성해요.{'\n'}
            </Body16B>
            <Text>
              리폼에 필수적인 정보를 업씨러가 잘 제공할 수 있도록자세히 설명해주세요.{'\n'}{'\n'}
              [예시]{'\n'}{'\n'}
              ● 필요한 원단의 최소 사이즈 기재{'\n'}
              ● 리폼 부위의 신체 사이즈 기재 요청{'\n'}
              ● 리폼이 불가한 소재 안내{'\n'}
              ● 자주 있는 문의{'\n'}
              ● 주의사항 및 특이사항{'\n'}{'\n'}
            </Text>
            <Body16B>
              2. 서비스 완성본의 이미지를 업로드해요.{'\n'}
            </Body16B>
            <Text>
              제공하는 서비스의 완성본 예시나 작업 이미지를 서비스 설명과 함께 첨부하시면 업씨러의 선택에
              도움이 됩니다 :D
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsOpen(!isOpen);
              }}>
              <Text style={{ color: 'red' }}>{'\n'}{'\n'}닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {ServiceRegiBottomBar}
      {/* 바텀바 */}
    </SafeAreaView>
  );

  function OptionListSection() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {optionList.map((item, idx) => (
          <View key={idx} style={{ flexDirection: 'column', flex: 1 }}>
            {item.isFixing ? ( // 수정하기 버튼 눌렀을 때
              <View style={{ flex: 1 }}>
                <FillerSection style={{ flexDirection: 'column', height: 350 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '90%',
                      marginBottom: 10,
                    }}>
                    <Body16B>옵션 명</Body16B>
                    <InputBox
                      value={item.option}
                      onChangeText={text => {
                        const updatedOptionList = [...optionList];
                        updatedOptionList[idx].option = text;
                        setOptionList(updatedOptionList);
                      }}
                      style={{
                        borderWidth: 2,
                        borderColor: '#828282',
                        borderRadius: 5,
                        flex: 0.84,
                      }}
                      placeholder="입력해주세요"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '90%',
                      marginBottom: 10,
                    }}>
                    <Body16B>추가금액</Body16B>
                    <InputBox
                      value={item.addPrice}
                      onChangeText={text => {
                        const updatedOptionList = [...optionList];
                        updatedOptionList[idx].addPrice = text;
                        setOptionList(updatedOptionList);
                      }}
                      style={{
                        borderWidth: 2,
                        borderColor: '#828282',
                        borderRadius: 5,
                        flex: 0.88,
                      }}
                      placeholder="추가 금액을 입력해주세요"
                    />
                  </View>
                  {!item.photoAdded ? ( // 사진 추가 안 된 상태일 때: 상세 입력창이 길게 나옴
                    <View style={{ width: '90%', marginBottom: 10 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Body16B>상세 설명</Body16B>
                        <Body14M> 이미지 1장 첨부 가능합니다.</Body14M>
                      </View>
                      <InputBox
                        value={item.optionExplain}
                        setValue={text => {
                          const updatedOptionList = [...optionList];
                          updatedOptionList[idx].optionExplain = text;
                          setOptionList(updatedOptionList);
                        }}
                        placeholder="50자 이내로 입력해주세요"
                        long
                      />
                    </View>
                  ) : (
                    // 사진 추가되어있는 상태일 때: 이미지 작게 보여줌
                    <View style={{ width: '90%', marginBottom: 10 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Body16B>상세 설명</Body16B>
                        <Body14M> 이미지 1장 첨부 가능합니다.</Body14M>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: width * 0.06,
                          width: '90%',
                        }}>
                        <InputBox
                          value={item.optionExplain}
                          setValue={text => {
                            const updatedOptionList = [...optionList];
                            updatedOptionList[idx].optionExplain = text;
                            setOptionList(updatedOptionList);
                          }}
                          placeholder="50자 이내로 입력해주세요"
                          style={{
                            maxHeight: width * 0.25,
                            flex: 2,
                          }}
                          long
                        />
                        <View style={{ flex: 1, marginVertical: 5 }}>
                          <ImageCarousel
                            images={item.optionPhotos}
                            setFormImages={images =>
                              handleOptionImageChange(idx, images)
                            }
                            max={1}
                            originalSize
                            originalHeight={width * 0.25}
                            originalWidth={width * 0.25}
                          />
                        </View>
                      </View>
                    </View>
                  )}
                  <ButtonSection
                    style={{ width: '90%', justifyContent: 'space-between' }}>
                    <UploadButton
                      style={{ backgroundColor: '#612FEF', height: '100%' }}
                      onPress={() => photoAdd2(item, idx)}>
                      <Subtitle16B>📷</Subtitle16B>
                    </UploadButton>
                    <UploadButton
                      style={{ backgroundColor: '#612FEF', height: '100%' }}
                      onPress={() => addOption2(item, idx)}>
                      <Subtitle16M style={{ color: 'white' }}>확인</Subtitle16M>
                    </UploadButton>
                  </ButtonSection>
                </FillerSection>
              </View>
            ) : (
              // 수정하기 아닐 때
              <FillerSection key={idx} style={{ flexDirection: 'column' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'flex-start',
                    marginLeft: 16,
                  }}>
                  <Text
                    style={{ flex: 1, color: '#612FEF', textAlign: 'left' }}>
                    option {idx + 1}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginBottom: 5,
                  }}>
                  <Body16B>{item.option}</Body16B>
                  <Body16B>{item.price}원</Body16B>
                </View>
                {item.photoAdded ? ( // 옵션 개별 사진 있을 때
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 0.8,
                      gap: width * 0.04,
                      width: '90%',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#F9F9F9',
                        marginBottom: 5,
                        maxHeight: width * 0.25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        flex: 2,
                        padding: 5,
                        overflow: 'hidden',
                      }}>
                      <Body14M>{item.optionExplain}</Body14M>
                    </View>
                    <View style={{ flex: 1, marginVertical: 5 }}>
                      <ImageCarousel
                        images={item.optionPhotos}
                        setFormImages={setOptionPhotos}
                        max={1}
                        originalSize
                        originalHeight={width * 0.25}
                        originalWidth={width * 0.25}
                        unTouchable
                      />
                    </View>
                  </View>
                ) : (
                  // 옵션별 개별 사진 없을 때
                  <View style={{ flexDirection: 'row', flex: 0.8 }}>
                    <View
                      style={{
                        backgroundColor: '#F9F9F9',
                        width: '90%',
                        marginBottom: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                      }}>
                      <Body14M>{item.optionExplain}</Body14M>
                    </View>
                  </View>
                )}
                <ButtonSection
                  style={{ width: '90%', justifyContent: 'space-between' }}>
                  <UploadButton
                    style={{ backgroundColor: '#612FEF', height: '100%' }}
                    onPress={() => removeOption(idx)}>
                    <Subtitle16B>🗑️</Subtitle16B>
                  </UploadButton>
                  <UploadButton
                    style={{ backgroundColor: '#612FEF', height: '100%' }}
                    onPress={() => fixOption(idx)}>
                    <Subtitle16M style={{ color: '#dcdcdc' }}>
                      수정하기
                    </Subtitle16M>
                  </UploadButton>
                </ButtonSection>
              </FillerSection>
            )}
          </View>
        ))}
      </SafeAreaView>
    );
  }

  function ServiceDetailSection() {
    return (
      <View>
        {!(inputText == '') ? ( // 서비스 상세 있으면 노출
          <View
            style={{
              padding: 10,
              borderBottomWidth: 3,
              borderBottomColor: '#dcdcdc',
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Body16B style={{ margin: 10 }}>서비스 상세</Body16B>
                <Subtitle18B style={{ color: PURPLE, marginLeft: '-1%' }}>
                  *{' '}
                </Subtitle18B>
                <TouchableOpacity
                  onPress={() => {
                    setIsOpen(true);
                  }}>
                  <Help />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={handleNavigate}>
                  <Body16B style={{ color: '#612FEF', margin: 10 }}>
                    수정하기
                  </Body16B>
                </TouchableOpacity>
              </View>
            </View>
            <FillerSection
              style={{
                borderWidth: 2,
                borderColor: BLACK2,
                backgroundColor: '#FFF',
              }}>
              <ScrollView
                bounces={false}
                overScrollMode="never"
                style={{ margin: 5 }}>
                <View style={{ flexGrow: 1 }}>
                  <RichEditor
                    ref={editorRef}
                    initialContentHTML={inputText}
                    onChange={setInputText}
                    placeholder="내용"
                    initialHeight={100}
                    useContainer={true}
                    onCursorPosition={handleCursorPosition}
                    disabled={true}
                  />
                </View>
                {!(detailPhoto == undefined) ? (
                  <View style={{ alignItems: 'center' }}>
                    <ImageCarousel
                      images={detailPhoto}
                      setFormImages={() => { }}
                      max={5}
                      originalSize
                      originalHeight={(width - 32) / 2}
                      originalWidth={(width - 32) / 2}
                      unTouchable
                    />
                  </View>
                ) : (
                  <></>
                )}
              </ScrollView>
            </FillerSection>
          </View>
        ) : (
          // 아직 안 썼으면 아래 노출
          <View
            style={{
              padding: 10,
              borderBottomWidth: 3,
              borderBottomColor: '#dcdcdc',
              flex: 1,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Body16B style={{ margin: 10 }}>서비스 상세</Body16B>
              <Subtitle18B style={{ color: PURPLE, marginLeft: '-1%' }}>
                *{' '}
              </Subtitle18B>
              <TouchableOpacity
                onPress={() => {
                  setIsOpen(true);
                }}>
                <Help />
              </TouchableOpacity>
            </View>
            <FillerSection
              style={{
                borderWidth: 2,
                borderColor: BLACK2,
                backgroundColor: '#FFF',
              }}>
              <UploadButton
                onPress={handleNavigate}
                style={{ backgroundColor: '#dcdcdc' }}>
                <Subtitle16B>작성하기</Subtitle16B>
              </UploadButton>
            </FillerSection>
          </View>
        )}
      </View>
    )
  }

  function addOptionSection() {
    return (
      <View
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          flex: 1,
        }}>
        <Body16B style={{ margin: 10 }}>옵션 별 추가 금액</Body16B>
        <Body14M style={{ margin: 10 }}>
          설명글 (특별한 기술이나 소재가 사용된 부분을 설명해주세요)
        </Body14M>
        <View style={{ flex: 1 }}>
          <FillerSection
            style={{ flexDirection: 'column', height: 350, flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '90%',
                marginBottom: 10,
              }}>
              <Body16B>옵션 명</Body16B>
              <InputBox
                value={option}
                onChangeText={setOption}
                style={{
                  borderWidth: 2,
                  borderColor: '#828282',
                  borderRadius: 5,
                  flex: 0.84,
                }}
                placeholder="입력해주세요"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '90%',
                marginBottom: 10,
              }}>
              <Body16B>추가금액</Body16B>
              <InputBox
                value={addPrice}
                onChangeText={setAddprice}
                style={{
                  borderWidth: 2,
                  borderColor: '#828282',
                  borderRadius: 5,
                  flex: 0.88,
                }}
                placeholder="추가 금액을 입력해주세요"
              />
            </View>
            {!photoAdded ? (
              // 이미지 추가버튼 안 눌러져있을 때
              <View style={{ width: '90%', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Body16B>상세 설명</Body16B>
                  <Body14M> 이미지 1장 첨부 가능합니다.</Body14M>
                </View>
                <InputBox
                  value={optionExplain}
                  setValue={setOptionExplain}
                  placeholder="50자 이내로 입력해주세요"
                  long
                />
              </View>
            ) : (
              // 이미지 추가 버튼 눌렀을 때
              <View style={{ width: '90%', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Body16B>상세 설명</Body16B>
                  <Body14M> 이미지 1장 첨부 가능합니다.</Body14M>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: width * 0.06,
                    width: '90%',
                  }}>
                  <InputBox
                    value={optionExplain}
                    setValue={setOptionExplain}
                    placeholder="50자 이내로 입력해주세요"
                    style={{
                      maxHeight: width * 0.25,
                      flex: 2,
                    }}
                    long
                  />
                  <View style={{ flex: 1, marginVertical: 5 }}>
                    <ImageCarousel
                      images={optionPhotos}
                      setFormImages={setOptionPhotos}
                      max={1}
                      originalSize
                      originalHeight={width * 0.25}
                      originalWidth={width * 0.25}
                    />
                  </View>
                </View>
              </View>
            )}
            <ButtonSection
              style={{ width: '90%', justifyContent: 'space-between' }}>
              <UploadButton
                style={{ backgroundColor: '#612FEF', height: '100%' }}
                onPress={photoAdd1}>
                <Subtitle16B>📷</Subtitle16B>
              </UploadButton>
              <UploadButton
                style={{ backgroundColor: '#612FEF', height: '100%' }}
                onPress={addOption1}>
                <Subtitle16M style={{ color: 'white' }}>등록하기</Subtitle16M>
              </UploadButton>
            </ButtonSection>
          </FillerSection>
        </View>
      </View>
    );
  }
};

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingVertical: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewFlexBox: {
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image01Icon: {
    width: 17,
    height: 17,
    overflow: 'hidden',
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: 8,
  },
  image01Parent: {
    paddingHorizontal: 0,
  },
  view: {
    borderRadius: 4,
    backgroundColor: '#222222',
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
});

export default ServiceRegistrationPage;
