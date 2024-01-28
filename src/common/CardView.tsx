import { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface CardViewProps {
  gap: number;    // 카드 사이 간격은 renderItem에서 marginHorizontal: gap / 2로 설정해주기
  offset: number;
  data: any[];
  pageWidth: number;  // 카드 width. Image width랑 동일하게 설정해주기
  renderItem: any;
  dot: boolean;   // dot 표시하고 싶을 때는 true로 설정하기
  onEndReached?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  onEndDrag?: () => void;
  green?: boolean;
  from?: string;
  onNext?: () => void;
  onPrev?: () => void;
}

interface DotProps {
  focused: boolean;
  green?: boolean;
}

const Dot = ({focused, green}: DotProps) => {
  return (
    <View style = {{
      width: focused ? 8 : 4,
      height: focused ? 8 : 4,
      marginHorizontal: 6,
      borderRadius: 16,
      backgroundColor: green ? '#67D393' : '#209DF5',
      opacity: focused ? 1 : 0.5
    }}/>
)
}

const CardView = ({ gap, offset, data, pageWidth, renderItem, dot, onEndReached, onRefresh, refreshing, onEndDrag, onNext, onPrev, from, green }: CardViewProps) => {
  const [page, setPage] = useState<number>(0);
  const prevScrollOffset = useRef<number>(0); // 이전 스크롤 위치를 저장할 ref

  useEffect(() => {
    setPage(0);
  }, [data])

  const onScroll = (e: any) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / (pageWidth + gap));
    setPage(newPage);
    prevScrollOffset.current = e.nativeEvent.contentOffset.x;
  };

  const handleOnScrollEndDrag = (e: any) => {
    const currentScrollOffset = e.nativeEvent.contentOffset.x;
    const currentPage = Math.round(currentScrollOffset / (pageWidth + gap));
    const maxScrollOffset = (data.length - 1) * (pageWidth + gap);

    const scrollDiff = currentScrollOffset - maxScrollOffset
    if (from === 'forest' && onEndDrag && currentPage === 2 && scrollDiff > (pageWidth / 4)) {
      onEndDrag();
    }

    if (from === 'story') {
      if (currentPage === 0 && onPrev && currentScrollOffset < prevScrollOffset.current && currentScrollOffset < (pageWidth / 4)) {
        onPrev();
      }
      if (currentPage === 3 && onNext && currentScrollOffset > prevScrollOffset.current && maxScrollOffset - currentScrollOffset < (pageWidth / 4)) {
        onNext();
      }
    }
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        onScrollEndDrag={handleOnScrollEndDrag}
        onEndReached={onEndReached}
        snapToInterval={pageWidth + gap}
        snapToAlignment='start'
        decelerationRate='fast'
        contentContainerStyle={{ paddingHorizontal: offset + gap / 2 }}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReachedThreshold={0}
      />
      {dot ? (
        <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          {Array.from({length: data.length}, (_, i) => i).map((i) => (
            <Dot key={i} focused={i === page ? true : false} green={green} />
          ))}
        </View>
      ):(<></>)}
    </>
  )
}

export default CardView