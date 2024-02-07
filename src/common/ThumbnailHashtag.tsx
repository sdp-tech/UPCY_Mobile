import styled from 'styled-components/native';
import { PURPLE3 } from '../styles/GlobalColor';
import { Caption11M } from '../styles/GlobalText';

interface ThumbnailHashtagProps {
  value: string;
}

const ThumbnailHashtag = ({ value }: ThumbnailHashtagProps) => {
  return (
    <Container>
      <Caption11M>{value}</Caption11M>
    </Container>
  )
}

const Container = styled.View`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${PURPLE3};
`

export default ThumbnailHashtag;