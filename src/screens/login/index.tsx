import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import { Formik } from "formik";
import { Link } from "@react-navigation/native";
import * as yup from "yup";

import { isWeb } from "@/utils/checkPlatform";

let LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("This field must be a valid email")
    .required("This field is required."),
  password: yup.string().required("This field is required."),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setTimeout(() => setSubmitting(false), 2000);
        }}
      >
        {({
          errors,
          handleBlur,
          touched,
          handleChange,
          isSubmitting,
          submitForm,
          values,
        }) => (
          <View style={styles.form}>
            <TextInput
              id="email"
              label="Email Address"
              autoFocus
              autoComplete="email"
              autoCapitalize="none"
              mode={"outlined"}
              outlineColor="#ddd"
              activeOutlineColor="#4E89AE"
              style={styles.input}
              keyboardType="email-address"
              value={values.email}
              disabled={isSubmitting}
              error={!!errors.email && !!touched.email}
              onBlur={handleBlur("email")}
              onChangeText={handleChange("email")}
            />
            <HelperText
              type="error"
              visible={!!errors.email && !!touched.email}
            >
              {errors.email}
            </HelperText>
            <TextInput
              id="password"
              label="Password"
              autoFocus
              autoComplete="password"
              autoCapitalize="none"
              mode={"outlined"}
              outlineColor="#ddd"
              activeOutlineColor="#4E89AE"
              style={styles.input}
              keyboardType="default"
              value={values.password}
              disabled={isSubmitting}
              error={!!errors.password && !!touched.password}
              onBlur={handleBlur("password")}
              onChangeText={handleChange("password")}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  onPress={() => setShowPassword(!showPassword)}
                  icon={showPassword ? "eye" : "eye-off"}
                />
              }
            />
            <HelperText
              type="error"
              visible={!!errors.password && !!touched.password}
            >
              {errors.password}
            </HelperText>
            <Button
              style={styles.submitButton}
              mode={"elevated"}
              textColor="#fff"
              onPress={submitForm}
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              LOGIN
            </Button>
          </View>
        )}
      </Formik>
      <View style={styles.linksContainer}>
        <Link style={styles.linkText} to={{ screen: "ResetPassword" }}>
          Forgot password?
        </Link>
        <Link style={styles.linkText} to={{ screen: "Signup" }}>
          Don't have an account? Sign up
        </Link>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 20,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    alignItems: "center",
    width: "100%",
  },
  input: {
    backgroundColor: "#fff",
    width: "85%",
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#4E89AE",
    width: "85%",
    borderRadius: 5,
    marginTop: 20,
  },
  linksContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  linkText: {
    color: "#4E89AE",
    marginTop: 15,
  },
});
