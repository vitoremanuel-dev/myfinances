import { Container } from "./styles";
import { TextInputProps } from "react-native";

type Props = TextInputProps;

const Input = ({ ...rest }: Props) => {
  return <Container {...rest} />;
};

export default Input;
