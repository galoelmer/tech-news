import { useState, useCallback } from "react";
import { View } from "react-native";
import { Link } from "@react-navigation/native";
import { Button, TextInput, HelperText } from "react-native-paper";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";

import { useLoginUserMutation } from "@/services/api";
import { isFetchBaseQueryError } from "@/services/helpers";
import useNavigation from "@/hooks/useNavigation";
// import useAuth from "@/hooks/useAuth";

import styles from "./styles";
import type { InitialValues } from "./types";

let LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("This field must be a valid email")
    .required("This field is required."),
  password: yup.string().required("This field is required."),
});

const LoginForm = () => {
  // TODO: add redirect if user is already logged in
  // const { isAuth } = useAuth();
  const { navigate } = useNavigation();
  const [loginUser] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = useCallback(
    async (values: InitialValues, helpers: FormikHelpers<InitialValues>) => {
      try {
        await loginUser(values).unwrap();
        navigate("Home");
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const errorMessage =
            "error" in err ? err.error : "Something went wrong";
          helpers.setFieldError("message", errorMessage);
        }
      } finally {
        helpers.setSubmitting(false);
      }
    },
    []
  );

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "", message: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleFormSubmit}
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
            <HelperText type="error" visible={!!errors.message}>
              {errors.message}
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
