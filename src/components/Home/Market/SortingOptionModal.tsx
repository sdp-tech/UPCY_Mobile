import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
    useMemo,
    useRef,
  } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const CategoryMenuBox = styled.View`
  font-weight: 700;
  font-size: 1.6rem;
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const DropDownBoxWrap = styled.View`
  height: 152px;
  display: inline-block;
  width: 7.5rem;
`;

const DropDownContainer = styled.View`
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  list-style: none;
  overflow-y: scroll;
`;

const ListItem = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  list-style: none;
  padding: 1rem;
  z-index: 1;
  margin-top: 0.2rem;
`;

const CategoryDropDown = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onToggle = () => setIsOpen(!isOpen);
    const onOptionClicked = (value: string, index: number) => () => {
      console.log(value);
      setIsOpen(false);
    };
    return (
      <>
        <CategoryMenuBox onClick={onToggle}>
          <p>카테고리</p>
        </CategoryMenuBox>
        <DropDownBoxWrap>
          <DropDownContainer>
            {isOpen && (
              <>
                <ListItem onClick={onOptionClicked("발라드", 1)}>발라드</ListItem>
                <ListItem onClick={onOptionClicked("알앤비", 2)}>알앤비</ListItem>
                <ListItem onClick={onOptionClicked("랩", 3)}>랩</ListItem>
                <ListItem onClick={onOptionClicked("락", 4)}>락</ListItem>
                <ListItem onClick={onOptionClicked("트로트", 5)}>트로트</ListItem>
                <ListItem onClick={onOptionClicked("인디", 6)}>인디</ListItem>
              </>
            )}
          </DropDownContainer>
        </DropDownBoxWrap>
      </>
    );
  };
  
  export default CategoryDropDown;