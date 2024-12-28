import { useState } from 'react';
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
} from 'react-native';
import DownArrow from '../assets/common/DownArrow.svg';

const ReportPage = ({}: StackScreenProps<HomeStackParams, 'ReportPage'>) => {
  const [reportReason, setReportReason] = useState<string>('');
  return (
    <SafeAreaView>
      <DetailScreenHeader
        title="신고"
        leftButton="CustomBack"
        rightButton="None"
        onPressLeft={() => {}}
        onPressRight={() => {}}
      />
      <View style={styles.container}>
        <Text style={TextStyles.mainTitle}>
          리폼러를 신고하는 이유를 설명해주세요
        </Text>
        <ReportReasonBox
          reportReason={reportReason}
          setReportReason={setReportReason}
        />
        <ReportContentBox />
        <ReportConfirmButton reportReason={reportReason} />
      </View>
    </SafeAreaView>
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
  return (
    <View style={styles.wrapper}>
      <View style={styles.reasonBoxHeader}>
        <Text style={TextStyles.subTitles}> 신고 사유 </Text>
        <Text style={TextStyles.notice}>(필수)</Text>
      </View>
      <TouchableOpacity style={styles.reasonBox}>
        <Text> 선택 </Text>
        <DownArrow />
      </TouchableOpacity>
    </View>
  );
};

const ReportContentBox = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={TextStyles.subTitles}> 신고 내용</Text>
      <TextInput
        style={styles.textInputBox}
        placeholder="신고 이유를 자세히 적어주시면 신고 처리에 도움이 됩니다."
        multiline
        numberOfLines={6}
      />
    </View>
  );
};

const ReportConfirmButton = ({ reportReason }: { reportReason: string }) => {
  const onPressReportConfirm = () => {
    //TODO
  };
  return (
    <View style={{ zIndex: 0 }}>
      <Button
        title="신고"
        onPress={onPressReportConfirm}
        disabled={!(reportReason && reportReason.length > 0)}
        color={
          !(reportReason && reportReason.length > 0) ? '#6C4CE4' : '#D3D3D3'
        }
      />
    </View>
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
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 10,
    marginTop: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#612FEF',
  },
  textInputBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#6C4CE4',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});

export default ReportPage;
