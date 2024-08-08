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
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionsCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction?: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({
    entries: { amount: "R$ 0,00" },
    expensives: { amount: "R$ 0,00" },
    total: { amount: "R$ 0,00" },
  });

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const lasTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );
    return `${lasTransaction.getDate()} de ${lasTransaction.toLocaleString(
      "pt-BR",
      {
        month: "long",
      }
    )}`;
  }

  async function loadTransactions() {
    const dataKey = "@myfinances:transaction";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));
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
    setTransactions(transactionsFormatted);

    const lastTransactionsEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionsExpensives = getLastTransactionDate(
      transactions,
      "negative"
    );
    const totalInterval = `01 à ${lastTransactionsExpensives}`

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia ${lastTransactionsEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída dia ${lastTransactionsExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

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
          amount={highlightData.entries.amount || "R$ 0,00"}
          lastTransaction={highlightData.entries.lastTransaction!}
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.expensives.amount || "R$ 0,00"}
          lastTransaction={highlightData.expensives.lastTransaction!}
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction={highlightData.total.lastTransaction!}
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => <TransactionsCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
