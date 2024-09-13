import { useState } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import Filter from "../../../common/Filter";
import { Body14B, Body14M, Body16B, Caption11M, Subtitle18B, Subtitle16M, Subtitle18M } from "../../../styles/GlobalText";
import { BLACK2, GRAY, LIGHTGRAY, PURPLE } from "../../../styles/GlobalColor";

type filterType = 'style' | 'material' | 'fit' | 'detail' | 'category';

type filterListType = {
    [key in filterType]: string[];
};

interface filterElementProps {
    list: string[];
    onPress: (type: string, value: string) => void;
    type: filterType;
    setPressable?: (value: string) => boolean;
    label?: string;
}

const FilterElement = ({
    list,
    onPress,
    type,
    label,
    setPressable,
}: filterElementProps) => {
    const defaultFilter: filterListType = {
        style: [],
        material: [],
        fit: [],
        detail: [],
        category: [],
    }
    const [filters, setFilters] = useState(defaultFilter);
    const filterList: filterListType = {
        style: [
            '빈티지',
            '미니멀',
            '캐주얼',
            '페미닌',
            '글램',
            '스트릿',
            '키치',
            '스포티',
            '홈웨어',
            '걸리시',
        ],
        material: [
            '면',
            '폴리에스테르',
            '나일론',
            '울',
            '린넨',
            '데님',
            '가죽',
            '스웨이드',
            '캐시미어',
        ],
        fit: ['노멀', '타이트', '오버사이즈', '와이드'],
        detail: [
            '지퍼',
            '단추',
            '셔링',
            '포켓',
            '워싱',
            '집업',
            '프릴',
            '보(리본)',
            '크롭',
            '칼라',
            '금속',
            '비즈',
        ],
        category: [
            "아우터",
            "상의",
            "하의",
            "가방",
            "모자",
            "잡화",
        ],
    };
    return (
        <View>
            <View style={{ margin: 10, marginTop: 18 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                    <Subtitle16M style={{ color: "#121212212" }}>{label}
                        {(type == "style" || type == "category" || type == "material") &&
                            <Subtitle18B style={{ color: PURPLE }}> *</Subtitle18B>
                        }
                    </Subtitle16M>
                    {(type == "detail" || type == "style") &&
                        <Caption11M style={{ color: PURPLE }}>● 중복가능</Caption11M>
                    }
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: 12,
                    }}>
                    {filterList[type].map((value, index) => {
                        return (
                            <Filter
                                value={value}
                                pressed={list.includes(value)}
                                pressable={setPressable ? setPressable(value) : true}
                                onPress={() => {
                                    onPress(type, value);
                                }}
                                key={index}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export default FilterElement;