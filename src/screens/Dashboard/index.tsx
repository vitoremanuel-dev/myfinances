import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
} from "./styles";

const Dashboard = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
        <UserInfo>
          <Photo source={{uri: 'https://avatars.githubusercontent.com/u/126992651?v=4'}}/>
          <User>
            <UserGreeting>Olá, </UserGreeting>
            <UserName>Vítor</UserName>
          </User>
        </UserInfo>
        </UserWrapper>
      </Header>
    </Container>
  );
};

export default Dashboard;
