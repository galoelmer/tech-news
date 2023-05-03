import { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Banner,
  Button,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

let ResetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("This field must be a valid email")
    .required("This field is required."),
});

const ResetPassword = () => {
  const [success, setSuccess] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(false);

  return (
    <View style={styles.container}>
      <>
        <Banner
          visible={success}
          elevation={4}
          icon={({ size }) => (
            <Icon name="check-circle-outline" size={size} color="#fff" />
          )}
          style={{
            width: "90%",
            backgroundColor: "#4eae73",
            borderRadius: 5,
          }}
          onShowAnimationFinished={() =>
            setTimeout(() => setDisplayInfo(true), 1000)
          }
        >
          <Text variant="titleLarge" style={styles.bannerText}>
            Your email address has been verified
          </Text>
          <Text variant="bodyMedium" style={styles.bannerText}>
            {"\n"}Please click on the link that has just been sent to your email
            account to reset your password.
          </Text>
        </Banner>
        <Banner
          visible={displayInfo}
          elevation={3}
          icon={({ size }) => (
            <Icon name="information-outline" size={size} color="#fff" />
          )}
          style={{
            width: "90%",
            backgroundColor: "#4E89AE",
            borderRadius: 5,
            marginTop: 15,
          }}
        >
          <Text variant="bodyMedium" style={styles.bannerText}>
            Haven't received and email? Please check your spam folder to make
            sure it's not in there.
          </Text>
        </Banner>
      </>
      {!success && (
        <>
          <Text variant="titleSmall" style={styles.formHeader}>
            Please enter your email address below and we will send you a link to
            reset your password.
          </Text>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={ResetPasswordSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setTimeout(() => {
                setSubmitting(false);
                setSuccess(true);
              }, 2000);
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
                <Button
                  style={styles.submitButton}
                  mode={"elevated"}
                  textColor="#fff"
                  onPress={submitForm}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  labelStyle={{ letterSpacing: 2 }}
                >
                  SUBMIT
                </Button>
              </View>
            )}
          </Formik>
        </>
      )}
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 20,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  formHeader: {
    marginBottom: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
    lineHeight: 25,
    letterSpacing: 1,
    paddingHorizontal: 20,
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
  bannerText: {
    fontFamily: "Roboto",
    color: "#fff",
    letterSpacing: 1,
    lineHeight: 22,
  },
});
