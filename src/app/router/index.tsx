import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { AuthLayout } from "@app/layouts/AuthLayout";
import { MainLayout } from "@app/layouts/MainLayout";
import { ProtectedRoute } from "@app/router/ProtectedRoute";
import { ROUTES } from "@app/router/routes";
import { Spinner } from "@components/ui/spinner";
import { B } from "@styles/theme";

const SplashPage = lazy(() =>
  import("@features/auth/pages/SplashScreen").then(m => ({ default: m.SplashScreen }))
);
const OnboardingPage = lazy(() =>
  import("@features/auth/pages/OnboardingScreen").then(m => ({ default: m.OnboardingScreen }))
);
const LoginPage = lazy(() =>
  import("@features/auth/pages/LoginScreen").then(m => ({ default: m.LoginScreen }))
);
const RegisterPage = lazy(() =>
  import("@features/auth/pages/RegisterPage").then(m => ({ default: m.RegisterPage }))
);
const ForgotPasswordPage = lazy(() =>
  import("@features/auth/pages/ForgotPasswordPage").then(m => ({ default: m.ForgotPasswordPage }))
);
const ResetPasswordPage = lazy(() =>
  import("@features/auth/pages/ResetPasswordPage").then(m => ({ default: m.ResetPasswordPage }))
);
const OtpVerificationPage = lazy(() =>
  import("@features/auth/pages/OTPScreen").then(m => ({ default: m.OTPScreen }))
);
const DashboardPage = lazy(() =>
  import("@features/dashboard/pages/HomeScreen").then(m => ({ default: m.HomeScreen }))
);
const MenuPage = lazy(() =>
  import("@features/menu/pages/MenuScreen").then(m => ({ default: m.MenuScreen }))
);
const CreateMenuPage = lazy(() =>
  import("@features/menu/pages/CreateMenuPage").then(m => ({ default: m.CreateMenuPage }))
);
const MenuDetailPage = lazy(() =>
  import("@features/menu/pages/MenuDetailPage").then(m => ({ default: m.MenuDetailPage }))
);
const EditMenuPage = lazy(() =>
  import("@features/menu/pages/EditMenuPage").then(m => ({ default: m.EditMenuPage }))
);
const OrdersPage = lazy(() =>
  import("@features/orders/pages/OrdersPage").then(m => ({ default: m.OrdersPage }))
);
const OrderDetailPage = lazy(() =>
  import("@features/orders/pages/OrderDetailPage").then(m => ({ default: m.OrderDetailPage }))
);
const CheckoutPage = lazy(() =>
  import("@features/orders/pages/CheckoutScreen").then(m => ({ default: m.CheckoutScreen }))
);
const CustomersPage = lazy(() =>
  import("@features/customers/pages/CustomersPage").then(m => ({ default: m.CustomersPage }))
);
const CustomerDetailPage = lazy(() =>
  import("@features/customers/pages/CustomerDetailPage").then(m => ({ default: m.CustomerDetailPage }))
);
const ProfilePage = lazy(() =>
  import("@features/customers/pages/ProfileScreen").then(m => ({ default: m.ProfileScreen }))
);
const StorePage = lazy(() =>
  import("@features/dashboard/pages/StoreScreen").then(m => ({ default: m.StoreScreen }))
);
const CartPage = lazy(() =>
  import("@features/orders/pages/CartScreen").then(m => ({ default: m.CartScreen }))
);
const PaymentPage = lazy(() =>
  import("@features/orders/pages/PaymentScreen").then(m => ({ default: m.PaymentScreen }))
);
const TrackingPage = lazy(() =>
  import("@features/orders/pages/TrackingScreen").then(m => ({ default: m.TrackingScreen }))
);
const LoyaltyPage = lazy(() =>
  import("@features/customers/pages/LoyaltyScreen").then(m => ({ default: m.LoyaltyScreen }))
);
const FavoritesPage = lazy(() =>
  import("@features/customers/pages/FavoritesScreen").then(m => ({ default: m.FavoritesScreen }))
);
const HistoryPage = lazy(() =>
  import("@features/orders/pages/HistoryScreen").then(m => ({ default: m.HistoryScreen }))
);
const NotificationsPage = lazy(() =>
  import("@features/dashboard/pages/NotificationsScreen").then(m => ({
    default: m.NotificationsScreen,
  }))
);
const NotFoundPage = lazy(() =>
  import("@features/common/pages/NotFoundPage").then(m => ({ default: m.NotFoundPage }))
);

function PageLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: B.bg }}>
      <Spinner size="w-8 h-8" border="border-slate-200 border-t-slate-600" />
    </div>
  );
}

function withSuspense(Component: React.LazyExoticComponent<React.ComponentType>) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.SPLASH, element: withSuspense(SplashPage) },
      { path: ROUTES.ONBOARDING, element: withSuspense(OnboardingPage) },
      { path: ROUTES.LOGIN, element: withSuspense(LoginPage) },
      { path: ROUTES.REGISTER, element: withSuspense(RegisterPage) },
      { path: ROUTES.FORGOT_PASSWORD, element: withSuspense(ForgotPasswordPage) },
      { path: ROUTES.RESET_PASSWORD, element: withSuspense(ResetPasswordPage) },
      { path: ROUTES.VERIFY_OTP, element: withSuspense(OtpVerificationPage) },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: ROUTES.DASHBOARD, element: withSuspense(DashboardPage) },
          { path: ROUTES.MENU, element: withSuspense(MenuPage) },
          { path: ROUTES.MENU_CREATE, element: withSuspense(CreateMenuPage) },
          { path: `${ROUTES.MENU}/:id/edit`, element: withSuspense(EditMenuPage) },
          { path: `${ROUTES.MENU}/:id`, element: withSuspense(MenuDetailPage) },
          { path: ROUTES.ORDERS, element: withSuspense(OrdersPage) },
          { path: `${ROUTES.ORDERS}/:id`, element: withSuspense(OrderDetailPage) },
          { path: ROUTES.CHECKOUT, element: withSuspense(CheckoutPage) },
          { path: ROUTES.CUSTOMERS, element: withSuspense(CustomersPage) },
          { path: `${ROUTES.CUSTOMERS}/:id`, element: withSuspense(CustomerDetailPage) },
          { path: ROUTES.PROFILE, element: withSuspense(ProfilePage) },
          { path: ROUTES.STORE, element: withSuspense(StorePage) },
          { path: ROUTES.CART, element: withSuspense(CartPage) },
          { path: ROUTES.PAYMENT, element: withSuspense(PaymentPage) },
          { path: ROUTES.TRACKING, element: withSuspense(TrackingPage) },
          { path: ROUTES.LOYALTY, element: withSuspense(LoyaltyPage) },
          { path: ROUTES.FAVORITES, element: withSuspense(FavoritesPage) },
          { path: ROUTES.HISTORY, element: withSuspense(HistoryPage) },
          { path: ROUTES.NOTIFICATIONS, element: withSuspense(NotificationsPage) },
        ],
      },
    ],
  },
  { path: ROUTES.NOT_FOUND, element: withSuspense(NotFoundPage) },
  { path: "*", element: <Navigate to={ROUTES.NOT_FOUND} replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
