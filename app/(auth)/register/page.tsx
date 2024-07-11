import { CardWrapper } from "../_components/card-wrapper";
import { RegisterForm } from "../_components/register-form";

export default function RegisterPage() {
  return (
    <CardWrapper
      headerTitle="Welcome to Tasker"
      headerDescription="Please enter your details to create an account"
      footerLabel="Already have an account?"
      footerAction="Sign in"
      footerHref="/login"
    >
      <RegisterForm />
    </CardWrapper>
  );
}
