import { useState } from "react";
import { Modal } from "react-native";
import { useForm } from "react-hook-form";

import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import InputForm from "../../components/Forms/InputForm";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";
import CategorySelectButton from "../../components/Forms/CategorySelectButton";

import CategorySelect from "../CategorySelect";

interface FormData {
  name: string;
  amount: string;
}

const Register = () => {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCateogryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const { control, handleSubmit } = useForm();

  const handleTransactionsTypeSelect = (type: "up" | "down") => {
    setTransactionType(type);
  };

  const handleOpenSelectCategoryModal = () => {
    setCateogryModalOpen(true);
  };

  const handleCloseSelectCategoryModal = () => {
    setCateogryModalOpen(false);
  };

  const handleRegister = (form: FormData) => {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm name="name" control={control} placeholder="None" />
          <InputForm name="amount" control={control} placeholder="Preço" />
          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionsTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionsTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </TransactionsTypes>

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
};

export default Register;
