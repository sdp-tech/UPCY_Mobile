import React, {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
} from 'react';
import { Alert, TouchableOpacity, View, Text } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import styled from 'styled-components/native';
import PhotoIcon from '../assets/common/Photo.svg';
import { Body14M } from '../styles/GlobalText';
import { LIGHTGRAY } from '../styles/GlobalColor';

const PhotosInput = styled.View`
  display: flex;
  flex-flow: row wrap;
`;

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

interface PhotoProps {
  buttonLabel: string;
  photo: any;
  setPhoto: Dispatch<SetStateAction<any>>;
  max: number;
}

export interface PhotoResultProps {
  fileName: string;
  width: number;
  height: number;
  uri: string;
}

const PhotoOptions = ({ buttonLabel, photo, setPhoto, max }: PhotoProps) => {
  const CameraActions: Action[] = [
    //카메라 & 갤러리 세팅
    {
      title: "카메라",
      type: "capture",
      options: {
        selectionLimit: max,
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 300,
        maxWidth: 300,
      },
    },
    {
      title: "앨범",
      type: "library",
      options: {
        selectionLimit: max,
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 300,
        maxWidth: 300,
      },
    },
  ];
  // const onButtonPress = useCallback(
  //   (
  //     type: string,
  //     options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions
  //   ) => {
  //     //카메라 & 갤러리 열기
  //     if (type === "capture") {
  //       ImagePicker.launchCamera(options, (response) =>
  //         setPhoto([...photo, response.assets])
  //       );
  //     } else {
  //       ImagePicker.launchImageLibrary(options, (response) =>
  //         setPhoto([...photo, response.assets])
  //       );
  //     }
  //   },
  //   []
  // );

  const onButtonPress = useCallback(
    (
      type: string,
      options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions
    ) => {
      if (type === "capture") {
        ImagePicker.launchCamera(options, (response) => {
          if (!response.didCancel) {
            const selectedPhotos = response.assets!.map((asset) => ({
              fileName: asset.fileName,
              width: asset.width,
              height: asset.height,
              uri: asset.uri,
            }));
            setPhoto((prevPhotos: any[]) => prevPhotos.concat(selectedPhotos));
          }
        });
      } else {
        ImagePicker.launchImageLibrary(options, (response) => {
          if (!response.didCancel) {
            const selectedPhotos = response.assets!.map((asset) => ({
              fileName: asset.fileName,
              width: asset.width,
              height: asset.height,
              uri: asset.uri,
            }));
            setPhoto((prevPhotos: any[]) => prevPhotos.concat(selectedPhotos));
          }
        });
      }
    },
    []
  );

  return (
    <PhotosInput>
      <PhotoButton 
        style={{paddingVertical: 6}}
        onPress={() => {
          Alert.alert("사진 선택", "", [
            {
              text: "카메라",
              onPress: () => onButtonPress(CameraActions[0].type, CameraActions[0].options)
            },
            {
              text: "앨범",
              onPress: () => onButtonPress(CameraActions[1].type, CameraActions[1].options)
            },
            { text: "취소", style: "destructive" },
          ]);
        }}
      >
        <PhotoIcon />
        <Body14M style={{marginLeft: 10}}>{buttonLabel}</Body14M>
      </PhotoButton> 
    </PhotosInput>
  );
}

const PhotoButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  background: ${LIGHTGRAY};
  border-radius: 6px;
  margin-bottom: 20px;
`

export default PhotoOptions;