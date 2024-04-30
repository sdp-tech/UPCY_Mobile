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
  ImageStyle,
  ImageBackground,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import styled from 'styled-components/native';
import PhotoIcon from '../assets/common/Photo.svg';
import { Body14M } from '../styles/GlobalText';
import { LIGHTGRAY, LIGHTGRAY2 } from '../styles/GlobalColor';
import Carousel from './Carousel';

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
  imageStyle?: ImageStyle;
  containerStyle?: ViewStyle;
  photo?: undefined | PhotoResultProps[];
  setPhoto: (p: PhotoResultProps[]) => void;
  max: number;
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
  imageStyle,
  containerStyle,
}: PhotoProps) => {
  const CameraActions: Action[] = [
    //카메라 & 갤러리 세팅
    {
      title: '카메라',
      type: 'capture',
      options: {
        selectionLimit: max - (photo === undefined ? 0 : photo.length),
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
        selectionLimit: max - (photo === undefined ? 0 : photo.length),
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 300,
        maxWidth: 300,
      },
    },
  ];

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
            if (photo === undefined) setPhoto(selectedPhotos);
            else setPhoto(photo.concat(selectedPhotos));
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
            if (photo === undefined) setPhoto(selectedPhotos);
            else setPhoto(photo.concat(selectedPhotos));
          }
        });
      }
    },
    [],
  );

  return (
    <View style={{ backgroundColor: LIGHTGRAY2, ...containerStyle }}>
      <PhotosInput>
        <View style={{ flex: 1 }}>
          <Carousel
            data={
              photo === undefined
                ? [undefined]
                : photo.length < max
                  ? [photo, undefined]
                  : photo
            }
            renderItem={({
              item,
              idx,
            }: {
              item: undefined | PhotoResultProps;
              idx: number;
            }) => {
              return (
                <View key={idx}>
                  {item === undefined ? (
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
                              onButtonPress(
                                CameraActions[0].type,
                                CameraActions[0].options,
                              ),
                          },
                          {
                            text: '앨범',
                            onPress: () =>
                              onButtonPress(
                                CameraActions[1].type,
                                CameraActions[1].options,
                              ),
                          },
                          { text: '취소', style: 'destructive' },
                        ]);
                      }}>
                      {buttonLabel && (
                        <>
                          <PhotoIcon />
                          <Body14M style={{ marginLeft: 10 }}>
                            {buttonLabel}
                          </Body14M>
                        </>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
                </View>
                // item.map((subItem: any) => (
                //   <View style={{ height: 350, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                //     <ImageBackground
                //       key={subItem.id}
                //       source={{ uri: subItem.uri }}
                //       style={{ width: "auto", height: "100%" }}
                //       alt={subItem.fileName}
                //     />
                //   </View>
                // ))
              );
            }}
            slider={photo !== undefined && photo.length > 0}
          />
        </View>
      </PhotosInput>
    </View>
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
