import { getBottomSpace } from "react-native-iphone-x-helper";
import HighlightCard from "../../components/HighlightCard";
import TransactionsCard from "../../components/TransactionsCard";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

const Dashboard = () => {
  const data = [
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "vendas", icon: "dollar-sign" },
      date: "07/08/2024",
    },
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "vendas", icon: "dollar-sign" },
      date: "07/08/2024",
    },
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "vendas", icon: "dollar-sign" },
      date: "07/08/2024",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/126992651?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Vítor Emanuel</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de Abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última entrada dia 03 de Abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 17.400,00"
          lastTransaction="01 à 16 de Abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          renderItem={({ item }: any) => <TransactionsCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace()
          }}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
