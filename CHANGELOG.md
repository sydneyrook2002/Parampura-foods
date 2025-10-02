# Changelog

All notable changes to the Parampara Eats e-commerce application will be documented in this file.

## [1.9.0] - 2024-07-29

### Added
- **Full Wishlist Functionality**: Users can now add/remove products from a wishlist via product cards and detail pages. A new "Wishlist" tab has been added to the "My Account" area to view saved items.
- **Dynamic Product Detail Page**: Replaced the static product page with a fully dynamic component that loads data for any product, including its specific reviews and related items, while preserving the user-provided layout.
- **Complete Blog System**: The "Blog" section is now fully functional. The main blog page lists all posts, and clicking "Read More" navigates to a dedicated detail page for each article.
- **Admin: Order Status Update**: Admins can now change an order's status (Pending, Shipped, Completed) directly from the order details modal in the "Manage Orders" page.
- **Static Info Pages**: Created a generic page to display content for static links like "Privacy Policy" and "Terms & Conditions".
- **Functional Links**: The main "Blog" navigation link, various footer links, and the "READ MORE" button on the homepage are now all functional.
- **Newsletter Subscription**: The footer newsletter form now provides user feedback on submission.

## [1.8.0] - 2024-07-29

### Added
- **Live Search Suggestions**: The header search bar now displays a real-time dropdown of the top 5 matching products as the user types, allowing for faster product discovery.
- **Responsive Search Bar Fix**: The search bar is now correctly positioned and fully functional on mobile and tablet devices, ensuring a consistent user experience across all screen sizes.

## [1.7.0] - 2024-07-29

### Added
- **Sitewide Search Functionality**: Implemented a fully functional product search. The search bar in the header now filters products by name and description, displaying results on a dedicated page.
- **Created "Contact Us" Page**: Implemented a new, multi-section "Contact Us" page, fully data-driven from `services/api.ts`. The page includes contact details, business hours, a functional contact form, and a location map. The corresponding navigation links are now active.

## [1.6.0] - 2024-07-29
- **Project files provided by user, this changelog entry is a placeholder to represent the state.**

## [1.5.0] - 2024-07-29

### Added
- **Complete Brand Identity Overhaul**: The application has been visually transformed to match the new "Parampara Eats" brand.
    - **Name Change**: Updated name from "Parampara Foods" to "Parampara Eats" sitewide.
    - **New Color Palette**: Implemented an earthy and sophisticated color scheme (deep green, cream, rich brown) across all components.
    - **New Typography**: Added elegant serif and clean sans-serif fonts (Cormorant Garamond & Lato) to match the new logo style.
    - **New Hero Section**: Replaced the homepage image slider with a new, static hero section based on the "Something is Cooking" banner, complete with new contact info.
- **Responsive Mobile Navigation**: Implemented a "hamburger" menu for tablet and mobile devices to ensure the main navigation is fully accessible on all screen sizes.

## [1.4.0] - 2024-07-28

### Added
- **Created "About Us" Page**: Implemented a new, multi-section "About Us" page that is fully data-driven from `services/api.ts`. The page includes a welcome section, a "Why Choose Us" panel, and a "Meet the Team" section to tell the brand's story.
- **Enabled Navigation**: The "About Us" links in the main header and the footer are now functional and navigate to the new page.

### Project Management
- **Updated Sprint Log**: Marked the "About Us" page task as complete in the `SPRINT_LOG.md`.

## [1.3.0] - 2024-07-28

### Project Management
- **Added Sprint Log**: Created a `SPRINT_LOG.md` file to act as a comprehensive project backlog. This document lists all unimplemented features, static links, and missing pages to provide a clear roadmap for future development.

## [1.2.0] - 2024-07-28

### UI/UX Enhancements
- **Redesigned Product Detail Page**: The product detail page has been completely overhauled to provide a modern, feature-rich experience.
    - **Image Gallery**: Replaced the single static image with a full gallery, including a main focused image and clickable thumbnails.
    - **Richer Information**: The UI now includes more detailed product information at a glance, such as SKU, Brand, and Availability.
    - **Enhanced CTA**: The "Add to Cart" section is now more prominent and includes a new "Add to Wishlist" button.
    - **Improved Reviews Tab**: The reviews section now includes a summary showing the average rating and total review count.
    - **Professional Polish**: Added social sharing buttons for a more complete e-commerce feel.

## [1.1.0] - 2024-07-28

### UI/UX Enhancements
- **Refined Product Card UI**: The `ProductCard` component has been redesigned to be more modern and less cluttered. It now features a subtle shadow instead of a hard border, a more balanced 4:3 image aspect ratio, and a cleaner, left-aligned layout for product information. The "Add to Cart" buttons are now perfectly aligned at the bottom of each card, creating a more professional and visually consistent grid.

## [1.0.0] - 2024-07-28

### Core Features
- **Project Scaffolding**: Initial setup with React, TypeScript, and Tailwind CSS.
- **Static UI Components**:
    - Header with top bar, search, and navigation.
    - Footer with multiple information columns.
    - Hero Slider on the homepage.
    - Testimonial Slider.
    - Blog and Brands sections.
- **Centralized Data**: All mock data (products, content, links, users) is managed in `services/api.ts` for easy backend integration.

### E-Commerce Functionality
- **Shopping Cart**:
    - Add products to the cart from product cards.
    - Interactive cart dropdown in the header showing items and subtotal.
    - Dedicated Cart Page with quantity management and totals.
    - Full Checkout flow leading to an order success page.
- **Product Discovery**:
    - Dynamic Category pages that display products based on the selected category.
    - Clickable products leading to a comprehensive **Product Detail Page**.
    - The detail page includes a large image, description, specifications, and a functional reviews tab.

### User & Authentication System
- **Customer Accounts**:
    - User Registration and Login pages with password verification.
    - A dedicated "My Account" page for customers to view their dashboard and order history.
- **Review System**:
    - Customers can leave star ratings and comments on products they have purchased via their "My Account" -> "Orders" page.

### Admin Panel & Features
- **Role-Based Access Control**:
    - Differentiates between 'admin' and 'customer' roles.
    - Admin-specific routes are protected and inaccessible to regular users.
- **Admin Dashboard**:
    - A dynamic dashboard showing key analytics for the current month (Revenue, Orders, New Customers).
    - Clear navigation to all management sections.
    - The admin interface hides customer-specific elements like the shopping cart, and all navigation links are role-aware.
- **Full CRUD Management**:
    - **Product Management**: Admins can create, read, update, and delete products. Changes are reflected on the live site instantly.
    - **User Management**: Admins can view all users and promote/demote users between 'customer' and 'admin' roles.
- **Advanced Admin Tools**:
    - **Order Management**: A dedicated page to view all customer orders and their details in a modal.
    - **Full Analytics Page**: A comprehensive analytics suite with time-based filtering (Month, Year, All Time), a sales visualization chart, and a list of top-selling products.
    - **Review Management**: A powerful interface to view all products sorted by average rating, inspect individual reviews, and a "Respond via Email" feature to engage with customers directly.

### UI/UX Enhancements
- **Interactive Product Cards**: Replaced simple hover effects with a persistent "Add to Cart" button that transforms into a quantity adjuster (`- [1] +`) once an item is in the cart.
- **Improved Homepage Flow**: Added a "Shop by Category" section and re-ordered homepage elements to prioritize the shopping journey.
- **Theme Adherence**: UI components like the category grid and product detail pages are designed to be consistent with the provided reference theme, featuring a professional and elegant design.
