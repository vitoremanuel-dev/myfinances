import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({ isActive, type }: any) => isActive ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({ theme }: any) => theme.colors.text};
  border-radius: 5px;

  padding: 16px;

  ${({ isActive, type }: any) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${({ theme }: any) => theme.colors.sucess_light};
    `}

  ${({ isActive, type }: any) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${({ theme }: any) => theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }: any) =>
    type === "up" ? theme.colors.sucess : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }: any) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
