import HighlightCard from "../../components/HighlightCard";
import TransactionsCard, {
  TransactionsCardProps,
} from "../../components/TransactionsCard";

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
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface DataListProps extends TransactionsCardProps {
  id: string;
}

const Dashboard = () => {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = "@myfinances:transaction";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const parsedDate = new Date(item.date);
        const date = isNaN(parsedDate.getTime())
          ? "Data inválida"
          : Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            }).format(parsedDate);

        return {
          id: item.id,
          name: item.name,
          type: item.type,
          category: item.category,
          amount,
          date,
        };
      }
    );
    setData(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

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
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => <TransactionsCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
