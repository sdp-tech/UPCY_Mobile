import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from './Home';
import DetailScreenHeader from '../components/Home/components/DetailScreenHeader';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DownArrow from '../assets/common/DownArrow.svg';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Request from '../common/requests';
import { getNickname } from '../common/storage';

type Service_key = {
  service_key: string;
}

const ReportPage = ({ route }: StackScreenProps<HomeStackParams, 'ReportPage'>) => {
  const [reportReason, setReportReason] = useState<string>('');
  const [reportContent, setReportContent] = useState<string>('');
  const navigation = useNavigation();
  const service_key: Service_key | undefined = route.params;
  return (
    <BottomSheetModalProvider>
      <SafeAreaView>
        <DetailScreenHeader
          title="신고"
          leftButton="CustomBack"
          rightButton="None"
          onPressLeft={() => { }}
          onPressRight={() => { }}
        />
        <View style={styles.container}>
          <Text style={TextStyles.mainTitle}>
            리폼러를 신고하는 이유를 설명해주세요
          </Text>
          <ReportReasonBox
            reportReason={reportReason}
            setReportReason={setReportReason}
          />
          <ReportContentBox setReportContent={setReportContent} />
          <ReportConfirmButton
            reportReason={reportReason}
            reportContent={reportContent}
            navigation={navigation}
            service_key={service_key}
          />
        </View>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const ReportReasonBox = ({
  reportReason,
  setReportReason,
}: {
  reportReason: string;
  setReportReason: (reportReason: string) => void;
}) => {
  const reportReasonsList: string[] = [
    '리폼 서비스가 아닙니다',
    '거래 도중 분쟁이 발생했습니다',
    '사기가 의심됩니다',
    '욕설, 비방, 혐오표현을 합니다',
    '음란물, 불건전한 만남 및 대화를 합니다',
    '타인의 창작물을 도용했습니다.',
    '사칭이 의심됩니다',
    '연락이 두절됐습니다',
    '기타 부적절한 행위가 있었습니다.',
  ];
  const [open, setOpen] = useState<boolean>(false);
  return (
    <View style={styles.wrapper}>
      <View style={styles.reasonBoxHeader}>
        <Text style={TextStyles.subTitles}> 신고 사유 </Text>
        <Text style={TextStyles.notice}>(필수)</Text>
      </View>
      <TouchableOpacity style={styles.reasonBox} onPress={() => setOpen(!open)}>
        <Text> {reportReason || '선택'} </Text>
        <DownArrow />
      </TouchableOpacity>
      {open && (
        <ReportReasonModal
          open={open}
          setOpen={setOpen}
          reasons={reportReasonsList}
          setReportReason={setReportReason}
        />
      )}
    </View>
  );
};

const ReportContentBox = ({
  setReportContent,
}: {
  setReportContent: (content: string) => void;
}) => {
  const handleTextChange = (text: string) => {
    setReportContent(text);
  };
  return (
    <View style={styles.wrapper}>
      <Text style={TextStyles.subTitles}> 신고 내용 </Text>
      <TextInput
        style={styles.textInputBox}
        placeholder="신고 이유를 자세히 적어주시면 신고 처리에 도움이 됩니다."
        multiline
        numberOfLines={6}
        onChangeText={handleTextChange}
      />
    </View>
  );
};

const ReportConfirmButton = ({
  reportReason,
  reportContent,
  navigation,
  service_key
}: {
  reportReason: string;
  reportContent: string;
  navigation: any;
  service_key: Service_key | undefined;
}) => {
  const [userNickname, setUserNickname] = useState<string>('');

  useEffect(() => {
    const getUserNicknameInfo = async () => {
      const userNickname = await getNickname();
      setUserNickname(userNickname ? userNickname : '');
    };
    getUserNicknameInfo();
  }, []);

  const request = Request();

  const postReport = async ({
    reason,
    details,
  }: {
    reason: string;
    details: string;
  }) => {
    try {
      const params = {
        reported_user_id: service_key?.service_key, // TODO: fix
        reporter_user_id: userNickname,
        reason: reason,
        details: details,
      };
      console.log(params);
      const response = await request.post(`/api/market/report`, params);
      if (!response || response.status === 404) {
        Alert.alert('오류가 발생하였습니다.');
      } else if (response.status === 500) {
        Alert.alert('서버에 오류가 발생하였습니다.');
        console.log(response);
      } else if (response && response.status === 200) {
        Alert.alert('신고가 완료되었습니다.')
        navigation.dispatch(
          CommonActions.navigate({
            name: "Main",
            params: {
              screen: "UPCY", // MainTabNavigator의 홈 화면으로 이동
            },
          })
        );
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const onPressReportConfirm = () => {
    postReport({ reason: reportReason, details: reportContent });
    navigation.goBack();
  };

  const isReasonValid = reportReason && reportReason.trim().length > 0;

  return (
    <View style={{ zIndex: 0 }}>
      <Button
        title="신고"
        onPress={onPressReportConfirm}
        disabled={!isReasonValid}
        color={isReasonValid ? '#6C4CE4' : '#D3D3D3'}
      />
    </View>
  );
};

const ReportReasonModal = ({
  open,
  setOpen,
  reasons,
  setReportReason,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  reasons: string[];
  setReportReason: (reason: string) => void;
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const snapPoints = useMemo(() => ['65%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
    setOpen(false);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) setOpen(false);
  }, []);

  const handleSelectReason = (reason: string) => {
    setReportReason(reason);
    handlePresentModalClose();
  };

  useEffect(() => {
    if (open) handlePresentModalPress();
  }, [open]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}>
      <BottomSheetFlatList
        data={reasons}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleSelectReason(item)}>
            <Text style={TextStyles.modalItem}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </BottomSheetModal>
  );
};

const TextStyles = StyleSheet.create({
  mainTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 20,
  },
  subTitles: {
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 8,
  },
  notice: {
    color: '#612FEF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  modalItem: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 24,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 24,
  },
  reasonBoxHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  reasonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 10,
    marginTop: 8,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#612FEF',
  },
  textInputBox: {
    display: 'flex',
    borderRadius: 5,
    marginTop: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6C4CE4',
    paddingHorizontal: 16,
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 10,
    paddingTop: 12
  },
  modalItem: {
    paddingVertical: 12,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ReportPage;
