import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({ theme }: any) => theme.colors.secondary};

  padding: 18px;
  border-radius: 5px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }: any) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }: any) => theme.colors.shape};
`;
