import { Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  title: string;
  onPress: () => void
}

const Button = ({ title, onPress, ...rest }: Props) => {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;
