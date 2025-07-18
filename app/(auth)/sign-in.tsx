import { View, Text, Alert} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({email: '', password: ''})

  const submit = async () => { 
    const {email, password} = form
    if(!email || !password) return Alert.alert('Ошибка', 'Введите действительный адрес электронной почты и пароль.')

      setIsSubmitting(true)

      try {
        await signIn({email, password})
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
      <CustomButton title="Войти" isLoading={isSubmitting} onPress={submit}/>

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          У вас нет аккаунта?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Зарегистрироваться
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
