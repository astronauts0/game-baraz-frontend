export class API_ENDPOINTS {
  //! Base
  static BASE = "/api";

  //! Auth
  static AUTH = "/api/auth";
  static AUTH_LOGIN = "/api/auth/login";
  static AUTH_REGISTER = "/api/auth/register";
  static AUTH_LOCK = (id: string | number) => `/api/auth/lock/${id}`;
  static AUTH_UNLOCK = (id: string | number) => `/api/auth/unlock/${id}`;

  //! Users
  static USERS = "/api/users";
  static MY_PROFILE = "/api/users/me";
  static MY_SELLER_PROFILE = "/api/users/me/seller";
  static USER_PROFILE = (id: string | number) => `/api/users/${id}`;

  //! Listings
  static LISTINGS = "/api/listings";
  static MY_LISTINGS = "/api/listings/my";
  static LISTING_BY_ID = (id: string | number) => `/api/listings/${id}`;

  //! Orders
  static ORDERS = "/api/orders";
  static MY_ORDERS = "/api/orders/my";
  static ORDER_BY_ID = (id: string | number) => `/api/orders/${id}`;
  static ORDER_STATUS = (id: string | number) => `/api/orders/${id}/status`;
  static ORDER_CONFIRM = (id: string | number) => `/api/orders/${id}/confirm`;

  //! Wallet
  static WALLET = "/api/wallet";
  static WALLET_TRANSACTIONS = "/api/wallet/transactions";
  static WALLET_WITHDRAW = "/api/wallet/withdraw";
  static WALLET_WITHDRAWALS = "/api/wallet/withdrawals";

  //! Payments
  static PAYMENTS = "/api/payments";
  static PAYMENT_WEBHOOK = "/api/payments/webhook";
  static PAYMENT_BY_ORDER = (orderId: string | number) => `/api/payments/order/${orderId}`;

  //! Reviews
  static REVIEWS = "/api/reviews";
  static REVIEWS_BY_USER = (userId: string | number) => `/api/reviews/user/${userId}`;
  static REVIEWS_BY_ORDER = (orderId: string | number) => `/api/reviews/order/${orderId}`;

  //! Disputes
  static DISPUTES = "/api/disputes";
  static MY_DISPUTES = "/api/disputes/my";
  static DISPUTE_BY_ORDER = (orderId: string | number) => `/api/disputes/order/${orderId}`;
  static DISPUTES_ALL = "/api/disputes"; // Admin only
  static RESOLVE_DISPUTE = (id: string | number) => `/api/disputes/${id}/resolve`;
}
