import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import { Formik } from "formik";
import { Link } from "@react-navigation/native";
import * as yup from "yup";

let signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("This field must be a valid email")
    .required("This field is required."),
  password: yup
    .string()
    .min(6, "Password is too short")
    .required("This field is required.")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/,
      "Must contain One Uppercase, One Lowercase and a Number"
    )
    .matches(/^\S+$/, "Must not contain white-spaces"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "", name: "" }}
        validationSchema={signupSchema}
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
              id="name"
              label="Full Name"
              autoFocus
              autoComplete="email"
              autoCapitalize="none"
              mode={"outlined"}
              outlineColor="#ddd"
              activeOutlineColor="#4E89AE"
              style={[styles.input, { marginBottom: 28 }]}
              keyboardType="default"
              value={values.name}
              disabled={isSubmitting}
              error={!!errors.name && !!touched.name}
              onBlur={handleBlur("name")}
              onChangeText={handleChange("name")}
            />
            <TextInput
              id="email"
              label="Email Address"
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
              labelStyle={{ letterSpacing: 2 }}
            >
              SIGN UP
            </Button>
          </View>
        )}
      </Formik>
      <View style={styles.linksContainer}>
        <Link style={styles.linkText} to={{ screen: "Login" }}>
          Already have an account? Login
        </Link>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 40,
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
    letterSpacing: 1,
  },
});
