import {lazy} from 'react';

export const AsyncLogin = lazy(() =>
  import('./pages/LogInPage'),
);

export const AsyncRegister = lazy(() =>
  import('./pages/RegisterPage'),
);

export const AsyncReset = lazy(() =>
  import('./pages/ResetPage'),
);

export const AsyncHome = lazy(() =>
  import('./pages/HomePage'),
);

export const AsyncFavorite = lazy(() =>
  import('./pages/FavoritePage'),
);

export const AsyncCreate = lazy(() =>
  import('./pages/CreateProductsPage'),
);

export const AsyncEdit = lazy(() =>
  import('./pages/EditProfilePage'),
);

export const AsyncProduct = lazy(() =>
  import('./pages/ProductPage'),
);

export const AsyncProfile = lazy(() =>
    import('./pages/ProfilePage'),
);

export const AsyncInbox = lazy(() =>
    import('./pages/InboxPage'),
);



