# React GPU Store

React GPU Store is a modern e-commerce application built with React, Redux, and TypeScript. It provides a seamless shopping experience for computer components, with a focus on GPUs, CPUs, and motherboards.

## Key Features

- **Product Catalog**: Browse a wide range of computer components with detailed specifications.
- **Search Functionality**: Easily find products using the search feature.
- **Shopping Cart**: Add products to cart, adjust quantities, and proceed to checkout.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Order Confirmation**: Receive detailed order summaries after purchase.

## Main Components

1. **App Component**: The core of the application, managing routes and global layout.
2. **TopMenu Component**: Navigation bar with search functionality and cart access.
3. **ProductList Component**: Displays the catalog of products with pagination.
4. **ProductDetails Component**: Shows detailed information about a specific product.
5. **Cart Component**: Manages the shopping cart functionality.
6. **Checkout Component**: Handles the order placement process.
7. **OrderConfirmation Component**: Displays the order summary after purchase.
8. **Footer Component**: Provides additional navigation and company information.

## Key Functionalities

✅ **Product Filtering**: Users can search for products, with results updating in real-time.

✅ **Dynamic Product Display**: Products are fetched from a simulated API and displayed with pagination.

✅ **Cart Management**: Add, remove, and update quantities of items in the cart.

✅ **Checkout Process**: Collect shipping information and process orders.

✅ **State Management**: Utilizes Redux for efficient state management across the application.

✅ **Responsive Design**: Tailwind CSS is used for a mobile-first, responsive layout.

## Code Structure and Logic

- **Redux Store**: Manages the global state for products and cart items.
- **Slices**: Separate slices for products and cart to manage specific parts of the state.
- **React Router**: Handles navigation between different views of the application.
- **TypeScript**: Ensures type safety throughout the application.

## Enhanced User Experience

- **Toast Notifications**: Provides feedback for user actions like adding items to cart.
- **Smooth Animations**: Incorporates subtle animations for a more engaging interface.
- **Detailed Product Information**: Comprehensive specs for each product type (GPU, CPU, Motherboard).

## Getting Started

1. Clone the repository
2. Run `npm install` to install dependencies
3. Use `npm run dev` to run the development server

## Live Preview

You can preview the live app version on [Netlify](https://reactpixelpulsestore.netlify.app/).

## Future Enhancements

- Integration with a backend API for real product data
- User authentication and account management
- Wishlist functionality
- Product reviews and ratings

This React GPU Store project demonstrates a robust e-commerce solution with a focus on computer components. It showcases the use of modern React practices, state management with Redux, and a responsive design using Tailwind CSS.
