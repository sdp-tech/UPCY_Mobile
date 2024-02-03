import styled from 'styled-components/native';
import Slider from '../../../common/Slider';
import { Caption11M } from '../../../styles/GlobalText';

interface ReviewSummary {
  
}

const ReviewSummary = () => {
  return (
    <Container>
      <Caption11M></Caption11M>
    </Container>
  )
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default ReviewSummary;