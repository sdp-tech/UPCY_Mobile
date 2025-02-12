import React, {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
} from 'react';
import {
  Alert,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
  Image,
} from 'react-native';
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
  buttonLabel?: string;
  style?: ViewStyle;
  photo?: undefined | PhotoResultProps;
  setPhoto: (p: PhotoResultProps[]) => void;
  max: number;
  textColor?: string;
}

export interface PhotoResultProps {
  fileName: string | undefined;
  width: number | undefined;
  height: number | undefined;
  uri: string;
}

const PhotoOptions = ({
  buttonLabel,
  photo,
  setPhoto,
  max,
  style,
  textColor
}: PhotoProps) => {
  const CameraActions: Action[] = [
    //카메라 & 갤러리 세팅
    {
      title: '카메라',
      type: 'capture',
      options: {
        selectionLimit: max,
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 300,
        maxWidth: 300,
      },
    },
    {
      title: '앨범',
      type: 'library',
      options: {
        selectionLimit: max,
        mediaType: 'photo',
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
      options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions,
    ) => {
      if (type === 'capture') {
        ImagePicker.launchCamera(options, response => {
          if (response.errorCode !== undefined) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else if (!response.didCancel) {
            const selectedPhotos = response.assets!.map(asset => {
              if (asset.uri === undefined)
                throw console.error('ImagePicker error: uri not found');
              else
                return {
                  fileName: asset.fileName,
                  width: asset.width,
                  height: asset.height,
                  uri: asset.uri,
                };
            });
            setPhoto(selectedPhotos);
          }
        });
      } else {
        ImagePicker.launchImageLibrary(options, response => {
          if (response.errorCode !== undefined) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else if (!response.didCancel) {
            const selectedPhotos = response.assets!.map(asset => {
              if (asset.uri === undefined)
                throw console.error('ImagePicker error: uri not found');
              else
                return {
                  fileName: asset.fileName,
                  width: asset.width,
                  height: asset.height,
                  uri: asset.uri,
                };
            });
            setPhoto(selectedPhotos);
          }
        });
      }
    },
    [],
  );

  return (
    <PhotosInput>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          backgroundColor: 'LIGHTGRAY',
          borderRadius: 6,
          marginBottom: 20,
          paddingVertical: 6,
          ...style,
        }}
        onPress={() => {
          Alert.alert('사진 선택', '', [
            {
              text: '카메라',
              onPress: () =>
                onButtonPress(CameraActions[0].type, CameraActions[0].options),
            },
            {
              text: '앨범',
              onPress: () =>
                onButtonPress(CameraActions[1].type, CameraActions[1].options),
            },
            { text: '취소', style: 'destructive' },
          ]);
        }}>
        {buttonLabel && (
          <>
            <PhotoIcon color="white" />
            <Body14M style={{ marginLeft: 10, color: textColor ?? "#000000" }}>{buttonLabel}</Body14M>
          </>
        )}
        {photo !== undefined && (
          <Image
            source={{ uri: photo.uri }}
            style={{ height: '100%', width: '100%', borderRadius: 100 }}
          />
        )}
      </TouchableOpacity>
    </PhotosInput>
  );
};

const PhotoButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  background: ${LIGHTGRAY};
  border-radius: 6px;
  margin-bottom: 20px;
`;

export default PhotoOptions;
