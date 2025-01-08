import React from "react";
import { Modal, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

type TermsofServiceModalProps = {
  visible: boolean;
  onClose: () => void;
};

const TermsofServiceModal = ({ visible, onClose }: TermsofServiceModalProps) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>서비스 이용약관</Text>

            <Text style={styles.sectionTitle}>제1조 (제공하는 서비스)</Text>
            <Text style={styles.text}>
              ‘회사'는 다음의 서비스를 제공합니다.{"\n"}
              - 재화 또는 용역에 대한 정보 제공 및 구매계약 체결{"\n"}
              - 구매계약이 체결된 재화 또는 용역의 배송{"\n"}
              - 결제대금 보호서비스, 이용자 문의서비스, 상품 구매평 등 기타 정보 제공{"\n"}
              - 직접 또는 제휴사와 공동으로 제공하는 이벤트 등{"\n"}
              - 기타 '회사가 정하는 업무{"\n"}
            </Text>

            <Text style={styles.sectionTitle}>제2조 (결제방법 및 일반회원의 이용 수수료)</Text>
            <Text style={styles.text}>
              - '회사'의 '사이트'에서 구매한 상품에 대한 대금은 다음 각호의 방법으로 결제할 수 있습니다.{"\n"}
              {' '} 가. 쫀뱅킹, 인터넷뱅킹 등 각종 계좌이체{"\n"}
              {' '} 나. 선불카드, 직불카드, 신용카드 등 각종 카드결제{"\n"}
              {' '} 다. ARS, 휴대전화 등을 이용한 결제{"\n"}
              {' '} 라. 전자화폐에 의한 결제{"\n"}
              {' '} 마. '회사'와 계약을 맺었거나, '회사'가 인정한 상품권에 의한 결제{"\n"}
              {' '} 바. '회사'가 지급한 결제 가능한 적립금에 의한 결제{"\n"}{"\n"}
              - '회사'는 '구매자'가 결제수단에 대한 정당한 사용권한을 가지고 있는지 여부를 확인할 수 있으며, 이에 대한 확인이 완료될 때까지 거래 진행을 중지하거나, 확인이 불가능한 거래를 취소할 수 있습니다.{"\n"}
              - '회사'의 정책 및 전제업체(이동통신사, 카드회사 등) 또는 결제대행업체(PG)의 기준에 따라 이용자 당 월 누적 결제액 및 충전한도에 따라 제한이 있을 수 있습니다.{"\n"}
              - 대금의 지급 또는 결제를 위하여 입력한 정보에 대한 책임은 '구매자'가 전적으로 부담합니다.{"\n"}
              - 일반회원은 회사의 서비스 이용대가로 수수료, 회원료 등을 회사가 정한 요율에 따라 지급해야 합니다.{"\n"}
            </Text>

            <Text style={styles.sectionTitle}>제3조 (수신확인통지, 구매신청 변경 및 취소)</Text>
            <Text style={styles.text}>
              - '회사'는 '구매자가 구매신청을 한 경우 '구매자'에게 수신확인통지를 합니다.{"\n"}
              - 수신확인통지를 받은 '구매자'는 의사표시의 불일치가 있는 경우 수신확인통지를 받은 후 즉시 구매신청 내용의 변경 또는 취소를 요청할 수 있고, '회사'는 배송 준비 전 '구매자'의 요청이 있는 경우 지체없이 그 요청에 따라 변경 또는 취소처리 하여야 합니다. 다만 이미 대금을 지불한 경우 본 약관의 '청약철회 등'에서 정한 바에 따릅니다.{"\n"}
            </Text>

            <Text style={styles.sectionTitle}>제4조 (재화 등의 공급)</Text>
            <Text style={styles.text}>
              - '회사'는 별도의 약정이 없는 이상, '구매자'가 청약을 한 날부터 7일 이내에 재화 등을 배송할 수 있도록 주 문제작, 포장 등 기타 필요한 조치를 취합니다. 다만 '회사가 이미 대금의 전부 또는 일부를 받은 경우에는 대금을 받은 날부터 3 영업일 이내에 필요한 조치를 취합니다.{"\n"}
              - 전항의 경우 '회사'는 '구매자'가 상품 등의 공급 절차 및 진행 상황을 확인할 수 있도록 적절한 조치를 취해야 합니다.{"\n"}
            </Text>

            <Text style={styles.sectionTitle}>제5조 (환급)</Text>
            <Text style={styles.text}>
              - '회사'는 '구매자'가 신청한 '상품'이 품절, 생산중단 등의 사유로 인도 또는 제공할 수 없게 된 경우 지체 없이 그 사유를 '구매자'에게 통지합니다. 이 때 '구매자'가 재화 등의 대금을 지불한 경우 대금을 받은 날부터 3 영업일 이내에 환급하거나 이에 필요한 조치를 취합니다.{"\n"}
            </Text>

            <Text style={styles.sectionTitle}>제6조 (청약철회)</Text>
            <Text style={styles.text}>
              - '회사'와 재화 등의 구매에 관한 계약을 체결한 '구매자'는 수신확인의 통지를 받은 날부터 7일 이내에 청약을 철회할 수 있습니다.{"\n"}
              - 다음 각호의 사유에 해당하는 경우, 배송받은 재화의 반품 또는 교환이 제한됩니다.{"\n"}
              {' '}가. '구매자'에게 책임있는 사유로 재화 등이 멸실 또는 훼손된 경우{"\n"}
              {' '}나. '구매자'의 사용 또는 소비에 의하여 재화의 가치가 현저히 감소한 경우{"\n"}
              {' '}다. 시간의 경과로 재판매가 곤란할 정도로 재화의 가치가 현저히 감소한 경우{"\n"}
              {' '}라. 같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그 원본이 되는 재화의 포장을 훼손한 경우{"\n"}
              {' '}마. '구매자'의 주문에 의하여 개별적으로 생산한 상품으로서 청약철회 및 교환의 제한에 대하여 사전에 고지한 경우{"\n"}
            </Text>

            <Text style={styles.sectionTitle}>제7조 (청약철회의 효과)</Text>
            <Text style={styles.text}>
              - '회사'는 '구매자'로부터 재화 등을 반환 받은 경우 3영업일 이내에 이미 지급받은 재화 등의 대금을 환급합니다. 이때 '회사'가 '구매자'에게 재화등의 환급을 지연한 때에는 그 지연기간에 대해 일정 이율의 지연이자를 지급합니다.{"\n"}
              - '회사'는 신용카드 결제의 경우 결제 대행사를 통해 환불을 진행합니다.{"\n"}
              - 청약철회의 경우 공급받은 재화등의 반환에 필요한 비용은 '구매자'가 부담합니다. 다만, 표시내용과 다른 경우는 '회사'가 비용을 부담합니다.{"\n"}
            </Text>

            <Text style={styles.sectionTitle}>제8조 (저작권의 귀속 및 이용)</Text>
            <Text style={styles.text}>
              - '쇼핑몰'이 제공하는 서비스 및 이와 관련된 모든 지식재산권은 '회사'에 귀속됩니다.{"\n"}
              - 이용자는 '쇼핑몰'에게 지식재산권이 있는 정보를 사전 승낙없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나, 제3자가 이용하게 하여서는 안됩니다.{"\n"}
              - 이용자가 서비스 내에 게시한 게시물 등 콘텐츠의 저작권은 해당 저작자에게 귀속됩니다.{"\n"}
            </Text>

            <Text style={styles.sectionTitle}>제9조 (분쟁의 해결)</Text>
            <Text style={styles.text}>
              - '회사'는 '이용자'가 제기하는 불만사항 및 의견을 지체없이 처리하기 위해 노력합니다. 다만, 신속한 처리가 어려운 경우 '이용자'에게 그 사유와 처리일정을 즉시 통보합니다.{"\n"}
              - 회사와 '이용자' 간 전자상거래에 관한 분쟁이 발생한 경우, '이용자'는 한국소비자원, 전자문서 전자거래 분쟁조정위원회 등 분쟁조정기관에 조정을 신청할 수 있습니다.{"\n"}
              - 회사와 '이용자' 간 발생한 분쟁에 관한 소송은 회사 소재지를 관할하는 법원을 제1심 관할법원으로 하며, 준거법은 대한민국의 법령을 적용합니다.{"\n"}
            </Text>

            <Text style={styles.sectionTitle}>부칙</Text>
            <Text style={styles.text}>본 약관은 2024.11.09.부터 적용합니다.</Text>
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>확인했어요</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: '#612FFF',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#DBFC72',
    fontWeight: 'bold',
  },
});

export default TermsofServiceModal;