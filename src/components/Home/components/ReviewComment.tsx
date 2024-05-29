import styled from 'styled-components/native';
import { GREEN } from '../../../styles/GlobalColor';
import { Text, View } from 'react-native';

interface ReviewCommentProps {
  value: string;
  backgroundColor?: string;
}

const ReviewComment = ({ value, backgroundColor }: ReviewCommentProps) => {
  //   const View = styled.View`
  //   display: flex;
  //   padding: 5px 12px;
  //   margin: 0px 5px;
  //   justify-content: center;
  //   align-items: center;
  //   border-radius: 12px;
  //   background: ${backgroundColor};

  // `
  return (
    <View style={{
      paddingHorizontal: 12, paddingVertical: 5, marginLeft: 12, justifyContent: 'center', alignItems: 'center',
      borderRadius: 12, backgroundColor: backgroundColor ? backgroundColor : GREEN,
    }}>
      <Text style={{
        fontWeight: "700", fontSize: backgroundColor ? 14 : 10,
        color: backgroundColor ? '#FFFFFF' : 'black'
      }}>{value}</Text>
    </View>
  )
}



export default ReviewComment;