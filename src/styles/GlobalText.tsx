import { Text } from 'react-native';
import { BLACK,White } from './GlobalColor';
import { Children } from 'react';

export const Title20B = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Subtitle18B = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Subtitle18M = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Subtitle16B = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Subtitle16M = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Body16B = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Body16M = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Body16R = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Body14B = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Body14M = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};
export const Body14R = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 24,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Caption12M = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 12,
        fontWeight: '500',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Caption11M = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 11,
        fontWeight: '500',
        ...style,
      }}>
      {children}
    </Text>
  );
};
export const Caption14M = ({ children, style }: any) => {
  return (
    <Text
      style={{
        color: BLACK,
        fontSize: 14,
        fontWeight: '500',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Filter14M = ({ children, style }: any) => {
  return (
    <Text
      style={{
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Upcymall12M = ({ children, style }: any) => {
  return (
    <Text
      style={{
        fontSize: 12,
        fontWeight: '600',
        color: 'black',
        ...style,
      }}>
      {children}
    </Text>
  )
}

export const Filter11B = ({ children, style }: any) => {
  return (
    <Text style={{
      fontSize: 11,
      fontWeight: '700',
      color: '#612FEF',
      ...style
    }}>
      {children}
    </Text>
  )
}

export const Filter14B = ({ children, style }: any) => {
  return (
    <Text style={{
      color: BLACK,
      fontSize: 14,
      fontWeight: '700',
      ...style
    }}>
      {children}
    </Text>
  )
}
