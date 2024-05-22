import { Dispatch, SetStateAction, useCallback } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

interface ImagePickerProps {
  photo: undefined | PhotoType;
  setPhoto: Dispatch<SetStateAction<PhotoType>>;
}

interface ImagesPickerProps {
  photo: PhotoType[];
  setPhoto: Dispatch<SetStateAction<PhotoType[]>>;
  max: number;
}

export interface PhotoType {
  fileName: string | undefined;
  width: number | undefined;
  height: number | undefined;
  uri: string;
}

export function useImagePicker(
  setPhoto: Dispatch<SetStateAction<PhotoType | undefined>>,
) {
  const CameraActions: Action[] = [
    //카메라 & 갤러리 세팅
    {
      title: '카메라',
      type: 'capture',
      options: {
        selectionLimit: 1,
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
        selectionLimit: 1,
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
            setPhoto(selectedPhotos[0]);
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
            setPhoto(selectedPhotos[0]);
          }
        });
      }
    },
    [],
  );

  const handleAddButtonPress = () => {
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
  };

  const handleImagePress = () => {
    Alert.alert('사진을 수정하시겠습니까?', '', [
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
      {
        text: '삭제',
        onPress: () => setPhoto(undefined),
      },
      { text: '취소', style: 'destructive' },
    ]);
  };
  return [handleAddButtonPress, handleImagePress];
}

export function useImagePickers(max: number) {
  const CameraActions: Action[] = [
    //카메라 & 갤러리 세팅
    {
      title: '카메라',
      type: 'capture',
      options: {
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
      callback: (selectedPhotos: PhotoType[]) => void,
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
            callback(selectedPhotos);
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
            callback(selectedPhotos);
          }
        });
      }
    },
    [],
  );

  const handleAddButtonPress = (
    images: PhotoType[],
    callback: (newPhotos: PhotoType[]) => void,
  ) => {
    const newImages = images;

    Alert.alert('사진 선택', '', [
      {
        text: '카메라',
        onPress: () =>
          onButtonPress(
            CameraActions[0].type,
            {
              selectionLimit: max - images.length,
              ...CameraActions[0].options,
            },
            selectedPhotos => {
              callback(newImages.concat(selectedPhotos));
            },
          ),
      },
      {
        text: '앨범',
        onPress: () =>
          onButtonPress(
            CameraActions[1].type,
            {
              selectionLimit: max - images.length,
              ...CameraActions[1].options,
            },
            selectedPhotos => {
              callback(newImages.concat(selectedPhotos));
            },
          ),
      },
      { text: '취소', style: 'destructive' },
    ]);
  };

  const handleImagePress = (
    imageIndex: number,
    images: PhotoType[],
    callback: (newPhotos: PhotoType[]) => void,
  ) => {
    const newImages = images;

    Alert.alert('사진을 수정하시겠습니까?', '', [
      {
        text: '카메라',
        onPress: () =>
          onButtonPress(
            CameraActions[0].type,
            {
              selectionLimit: 1,
              ...CameraActions[0].options,
            },
            selectedPhotos => {
              newImages[imageIndex] = selectedPhotos[0];
              callback(newImages);
            },
          ),
      },
      {
        text: '앨범',
        onPress: () =>
          onButtonPress(
            CameraActions[1].type,
            {
              selectionLimit: 1,
              ...CameraActions[1].options,
            },
            selectedPhotos => {
              newImages[imageIndex] = selectedPhotos[0];
              callback(newImages);
            },
          ),
      },
      {
        text: '삭제',
        onPress: () => {
          newImages.splice(imageIndex, 1);
          callback(newImages);
        },
      },
      { text: '취소', style: 'destructive' },
    ]);
  };

  return {
    handleAddButtonPress: handleAddButtonPress,
    handleImagePress: handleImagePress,
  };
}
