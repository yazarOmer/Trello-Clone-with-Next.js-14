import { CardWrapper } from "../_components/card-wrapper";
import { LoginForm } from "../_components/login-form";

export default function LoginPage() {
  return (
    <CardWrapper
      headerTitle="Welcome Back"
      headerDescription="Please enter your details to sign in"
      footerLabel="Don't have an account?"
      footerAction="Create an account"
      footerHref="/register"
    >
      <LoginForm />
    </CardWrapper>
  );
}
