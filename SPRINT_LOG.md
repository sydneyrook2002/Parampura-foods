# Project Sprint Log & Feature Backlog

This document tracks all unimplemented features, static links, and missing pages. It serves as a roadmap for future development sprints.

---

### I. Missing Pages & Core Functionality

1.  **About Us Page (`about`)**
    -   **Task**: Create a static page with information about Parampara Foods.
    -   **Affected Files**: `App.tsx`, `components/AboutPage.tsx` (new), `Header.tsx`, `Footer.tsx`.
    -   **Status**: Completed.

2.  **Contact Us Page (`contact`)**
    -   **Task**: Create a page with contact information, a map, and a functional contact form.
    -   **Affected Files**: `App.tsx`, `components/ContactPage.tsx` (new), `Header.tsx`, `Footer.tsx`.
    -   **Status**: Completed.

3.  **Blog Pages (`blog`, `blogDetail`)**
    -   **Task**: Create a main blog page listing all posts and a detail page for a single post.
    -   **Affected Files**: `App.tsx`, `components/BlogPage.tsx` (new), `components/BlogDetailPage.tsx` (new), `Header.tsx`, `components/BlogSection.tsx`.
    -   **Status**: Completed.

4.  **Static Information Pages (`pages`)**
    -   **Task**: Create static pages for 'Privacy Policy', 'Terms & Conditions', and 'Delivery Information'.
    -   **Affected Files**: `App.tsx`, new component files for each page, `Footer.tsx`.
    -   **Status**: Completed.

---

### II. Unimplemented Features

1.  **Wishlist Functionality**
    -   **Task**: Implement state management for a user's wishlist, make the "Add to Wishlist" button functional, and create a dedicated Wishlist page.
    -   **Affected Files**: `contexts/CartContext.tsx`, `components/ProductDetailPage.tsx`, `components/AccountPage.tsx`, `components/WishlistPage.tsx` (new).
    -   **Status**: Completed.

2.  **Search Functionality**
    -   **Task**: Implement product filtering based on the header search bar and display results on a new search results page.
    -   **Status**: Completed.
    -   **Sub-tasks**:
        -   **Live search suggestions**: Implement a real-time suggestions dropdown as the user types. (Status: Completed)
        -   **Responsive layout**: Ensure the search bar is visible and functional on mobile and tablet views. (Status: Completed)

3.  **Newsletter Subscription**
    -   **Task**: Implement the logic for the newsletter subscription form in the Footer.
    -   **Affected Files**: `contexts/CartContext.tsx` (or new context), `components/Footer.tsx`.
    -   **Status**: Completed (Frontend simulation).

4.  **Customer Address Management**
    -   **Task**: Implement CRUD (Create, Read, Update, Delete) for shipping/billing addresses in the "My Account" -> "Addresses" tab.
    -   **Affected Files**: `contexts/CartContext.tsx`, `components/AccountPage.tsx`, `types.ts`.
    -   **Status**: Not Started.

5.  **Customer Account Details Management**
    -   **Task**: Create a form to allow users to update their name, email, and password in "My Account" -> "Details".
    -   **Affected Files**: `contexts/CartContext.tsx`, `components/AccountPage.tsx`.
    -   **Status**: Not Started.

6.  **Admin: Order Status Update**
    -   **Task**: Allow admins to change an order's status (e.g., from 'Pending' to 'Shipped') on the "Manage Orders" page.
    -   **Affected Files**: `contexts/CartContext.tsx`, `components/admin/AdminOrdersPage.tsx`.
    -   **Status**: Completed.

---

### III. Static Links & Buttons to Make Functional

-   **Header**: `Blog` (Completed), `Contact Us` (Completed), `Pages` (Not Started - dropdown would be a new feature).
-   **Homepage**: `Welcome` section "READ MORE" button. (Completed)
-   **Footer**: `Information` and `My Account` links. (Completed)
-   **Product Detail Page**: Social sharing links. (Not Started - Low priority).
