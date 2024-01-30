import styled from 'styled-components/native';
import { GREEN } from '../../../styles/GlobalColor';
import { Caption11M } from '../../../styles/GlobalText';

interface ReviewCommentProps {
  value: string;
}

const ReviewComment = ({ value }: ReviewCommentProps) => {
  return (
    <ReviewContainer>
      <Caption11M>{value}</Caption11M>
    </ReviewContainer>
  )
}

const ReviewContainer = styled.View`
  display: flex;
  padding: 5px 12px;
  margin: 0px 5px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${GREEN};
`

export default ReviewComment;