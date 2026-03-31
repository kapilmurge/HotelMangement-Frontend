export const environment = {
  production: true,
  apiBaseUrl: 'https://novella-biaxial-mustafa.ngrok-free.dev'
};

// right now this is optiona'l since we are using the same API base URL for both development and production, but it allows us to easily switch to a different backend URL in the future if needed without changing the code in our services.