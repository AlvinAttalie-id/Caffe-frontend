# Caffe Brew Integration: Progress & Next Steps

This document outlines the detailed next steps to finalize the connection between the decoupled Laravel 13 backend and the React + TypeScript + Vite frontend.

---

## 1. Priority 1: Connect Favorites Screen

### Objective
Expose the full details of favorited products from the backend and display them in the Favorites screen instead of filtering static mock data.

### Todo Tasks
1. **Expose Mapped Favorites in App Provider**:
   - Open [AppProvider.tsx](file:///c:/laragon/www/caffe-brew-frontend/src/app/providers/AppProvider.tsx) and look at the `apiFavorites` query.
   - Import `normalizeProduct` from `@features/products/hooks/useProducts`.
   - Map `apiFavorites` into a list of full product objects:
     ```typescript
     const favoriteItems = useMemo<Product[]>(() => {
       if (!apiFavorites) return [];
       return apiFavorites.map(normalizeProduct);
     }, [apiFavorites]);
     ```
   - Add `favoriteItems` to the `AppContextValue` interface and context value.
2. **Update Favorites Screen**:
   - Open [FavoritesScreen.tsx](file:///c:/laragon/www/caffe-brew-frontend/src/features/customers/pages/FavoritesScreen.tsx).
   - Retrieve `favoriteItems` from `useAppContext()`.
   - Replace the mock filtration of `PRODUCTS` with `favoriteItems`.

---

## 2. Priority 2: Notifications Integration

### Objective
Generate notifications when order status changes and display them in the app.

### Todo Tasks
1. **Create NotificationController (Backend)**:
   - Create a new API controller [NotificationController.php](file:///c:/laragon/www/caffe-brew-backend/app/Http/Controllers/Api/NotificationController.php) with:
     - `index(Request $request)` to return all user notifications.
     - `markAsRead(Request $request, string $id)` to mark a single notification as read.
     - `markAllAsRead(Request $request)` to mark all notifications as read.
2. **Register Routes (Backend)**:
   - Add the notification routes in [api.php](file:///c:/laragon/www/caffe-brew-backend/routes/api.php) within the `auth:sanctum` group:
     ```php
     Route::get('/notifications', [NotificationController::class, 'index']);
     Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
     Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
     ```
3. **Dispatch Notifications on Order Status Update (Backend)**:
   - Boot the [Order.php](file:///c:/laragon/www/caffe-brew-backend/app/Models/Order.php) model to intercept `updated` events:
     ```php
     protected static function booted(): void
     {
         static::updated(function (Order $order) {
             if ($order->isDirty('status')) {
                 $order->user->notify(new \App\Notifications\OrderNotification($order));
             }
         });
     }
     ```
   - Update [OrderNotification.php](file:///c:/laragon/www/caffe-brew-backend/app/Notifications/OrderNotification.php) to customize the message in `toArray` based on the status (e.g., preparing, ready_for_pickup, completed).
4. **Create Notification React Query Hooks (Frontend)**:
   - Create `src/features/dashboard/hooks/useNotifications.ts` with hooks for retrieving notifications list, marking as read, and marking all as read.
5. **Connect Notifications UI (Frontend)**:
   - Update [NotificationsScreen.tsx](file:///c:/laragon/www/caffe-brew-frontend/src/features/dashboard/pages/NotificationsScreen.tsx) to call the query hook.
   - Bind "Mark all read" button to the corresponding mutation.

---

## 3. Priority 3: Connect Rewards/Loyalty Screen

### Objective
Bind points balance and transactions list to the API instead of mock values.

### Todo Tasks
1. **Create Rewards Query Hook (Frontend)**:
   - Create a React Query hook file to fetch `GET /api/rewards/balance` and `GET /api/rewards/history`.
2. **Connect Home Screen Points Indicator**:
   - Update [HomeScreen.tsx](file:///c:/laragon/www/caffe-brew-frontend/src/features/dashboard/pages/HomeScreen.tsx) to display the dynamic balance from the query.
3. **Connect Loyalty Screen Details**:
   - Update [LoyaltyScreen.tsx](file:///c:/laragon/www/caffe-brew-frontend/src/features/customers/pages/LoyaltyScreen.tsx) to show the fetched points balance and transaction list.

---

## 4. Priority 4: Profile Editor & Saved Addresses

### Objective
Allow updating user registration details, uploading avatars, and managing shipping addresses.

### Todo Tasks
1. **Connect Profile Update (Backend)**:
   - Implement `update` in [ProfileController.php](file:///c:/laragon/www/caffe-brew-backend/app/Http/Controllers/Api/ProfileController.php).
   - Implement avatar upload endpoints and connect user database mutations.
2. **Connect Profile Editing Panel & Address List (Frontend)**:
   - Build address manager panels in the Profile Screen.
   - Bind inputs to endpoints: `GET /addresses`, `POST /addresses`, `DELETE /addresses/{id}`.
