import { View, Text, Alert} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({name: '', email: '', password: ''})

  const submit = async () => { 
    if(!form.name || !form.email || !form.password) return Alert.alert('Ошибка', 'Введите свое имя,адрес электронной почты и пароль.')

      setIsSubmitting(true)

      try {
        Alert.alert('Успех', 'Пользователь успешно зарегистрирован.')
        router.replace('/')
      } catch (error: any) {
        Alert.alert('Ошибка', error.message)
      } finally {
        setIsSubmitting(false)
      }
  }

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Введите свое полное имя"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({...prev, name: text}))}
        label="Имя"
      />
      <CustomInput
        placeholder="Введите свой email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Введите свой пароль"
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
        label="Пароль"
        secureTextEntry={true}
      />
      <CustomButton title="Зарегистрироваться" isLoading={isSubmitting} onPress={submit}/>

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          У вас уже есть аккаунт?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Войти
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
