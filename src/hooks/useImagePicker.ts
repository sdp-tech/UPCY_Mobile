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

export function useImagePickers(
  setPhotos: Dispatch<SetStateAction<PhotoType[]>>,
  max: number,
) {
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

  const handleAddButtonPress = (images: PhotoType[]) => {
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
              setPhotos(newImages.concat(selectedPhotos));
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
              setPhotos(newImages.concat(selectedPhotos));
            },
          ),
      },
      { text: '취소', style: 'destructive' },
    ]);
  };

  const handleImagePress = (imageIndex: number, images: PhotoType[]) => {
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
              setPhotos(newImages);
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
              setPhotos(newImages);
            },
          ),
      },
      {
        text: '삭제',
        // 삭제
        onPress: () => setPhotos(newImages.splice(imageIndex, 1)),
      },
      { text: '취소', style: 'destructive' },
    ]);
  };

  return [handleAddButtonPress, handleImagePress];
}

// const PhotoOptions = ({
//   buttonLabel,
//   photo,
//   setPhoto,
//   max,
//   style,
//   imageStyle,
//   containerStyle,
// }: PhotoProps) => {
//   const CameraActions: Action[] = [
//     //카메라 & 갤러리 세팅
//     {
//       title: '카메라',
//       type: 'capture',
//       options: {
//         selectionLimit: max - (photo === undefined ? 0 : photo.length),
//         mediaType: 'photo',
//         includeBase64: false,
//         maxHeight: 300,
//         maxWidth: 300,
//       },
//     },
//     {
//       title: '앨범',
//       type: 'library',
//       options: {
//         selectionLimit: max - (photo === undefined ? 0 : photo.length),
//         mediaType: 'photo',
//         includeBase64: false,
//         maxHeight: 300,
//         maxWidth: 300,
//       },
//     },
//   ];

//   const onButtonPress = useCallback(
//     (
//       type: string,
//       options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions,
//     ) => {
//       if (type === 'capture') {
//         ImagePicker.launchCamera(options, response => {
//           if (response.errorCode !== undefined) {
//             console.log('ImagePicker Error: ', response.errorMessage);
//           } else if (!response.didCancel) {
//             const selectedPhotos = response.assets!.map(asset => {
//               if (asset.uri === undefined)
//                 throw console.error('ImagePicker error: uri not found');
//               else
//                 return {
//                   fileName: asset.fileName,
//                   width: asset.width,
//                   height: asset.height,
//                   uri: asset.uri,
//                 };
//             });
//             if (photo === undefined) setPhoto(selectedPhotos);
//             else setPhoto(photo.concat(selectedPhotos));
//           }
//         });
//       } else {
//         ImagePicker.launchImageLibrary(options, response => {
//           if (response.errorCode !== undefined) {
//             console.log('ImagePicker Error: ', response.errorMessage);
//           } else if (!response.didCancel) {
//             const selectedPhotos = response.assets!.map(asset => {
//               if (asset.uri === undefined)
//                 throw console.error('ImagePicker error: uri not found');
//               else
//                 return {
//                   fileName: asset.fileName,
//                   width: asset.width,
//                   height: asset.height,
//                   uri: asset.uri,
//                 };
//             });
//             if (photo === undefined) setPhoto(selectedPhotos);
//             else setPhoto(photo.concat(selectedPhotos));
//           }
//         });
//       }
//     },
//     [],
//   );

//   return (
//     <View style={{ backgroundColor: LIGHTGRAY2, ...containerStyle }}>
//       <PhotosInput>
//         <View style={{ flex: 1 }}>
//           <Carousel
//             data={
//               photo === undefined
//                 ? [undefined]
//                 : photo.length < max
//                   ? [photo, undefined]
//                   : photo
//             }
//             renderItem={({
//               item,
//               idx,
//             }: {
//               item: undefined | PhotoType;
//               idx: number;
//             }) => {
//               return (
//                 <View key={idx}>
//                   {item === undefined ? (
//                     <TouchableOpacity
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         paddingHorizontal: 16,
//                         backgroundColor: 'LIGHTGRAY',
//                         borderRadius: 6,
//                         marginBottom: 20,
//                         paddingVertical: 6,
//                         ...style,
//                       }}
//                       onPress={() => {
//                         Alert.alert('사진 선택', '', [
//                           {
//                             text: '카메라',
//                             onPress: () =>
//                               onButtonPress(
//                                 CameraActions[0].type,
//                                 CameraActions[0].options,
//                               ),
//                           },
//                           {
//                             text: '앨범',
//                             onPress: () =>
//                               onButtonPress(
//                                 CameraActions[1].type,
//                                 CameraActions[1].options,
//                               ),
//                           },
//                           { text: '취소', style: 'destructive' },
//                         ]);
//                       }}>
//                       {buttonLabel && (
//                         <>
//                           <PhotoIcon />
//                           <Body14M style={{ marginLeft: 10 }}>
//                             {buttonLabel}
//                           </Body14M>
//                         </>
//                       )}
//                     </TouchableOpacity>
//                   ) : (
//                     <></>
//                   )}
//                 </View>
//                 // item.map((subItem: any) => (
//                 //   <View style={{ height: 350, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
//                 //     <ImageBackground
//                 //       key={subItem.id}
//                 //       source={{ uri: subItem.uri }}
//                 //       style={{ width: "auto", height: "100%" }}
//                 //       alt={subItem.fileName}
//                 //     />
//                 //   </View>
//                 // ))
//               );
//             }}
//             slider={photo !== undefined && photo.length > 0}
//           />
//         </View>
//       </PhotosInput>
//     </View>
//   );
// };
