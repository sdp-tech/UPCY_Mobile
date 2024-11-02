import Request from '../../../common/requests';
import { getAccessToken, getRefreshToken } from '../../../common/storage';
import axios from 'axios';

const { get, post, put, del, patch } = Request();
// 위의 Request의 함수들 사용해도 되는데 일단 axios로 바로 해봤습니다..

export const createReformerMarket = async (
  market_name,
  market_introduce,
  market_address,
) => {};

export const getReformersMarketList = async () => {};

export const getSpecificMarket = async marketUUID => {
  const accessToken = await getAccessToken();
  const url = `https://upcy.co.kr/api/market/${marketUUID}`;

  try {
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(url, { headers });

    if (response && response.status === 200) {
      console.log('마켓 데이터를 불러옵니다:', response.data);
      return response.data;
    } else {
      console.error('마켓 데이터를 불러오던 중 문제가 발생했습니다.');
    }
  } catch (err) {
    if (err.response) {
      console.error('API 요청 오류:', err.response.status, err.response.data);
    } else {
      console.error(err.message);
    }
  }
};
