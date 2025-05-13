# Maboa Tech Shop

Maboa Tech Shop is a technology-focused e-commerce project built with [Angular CLI](https://github.com/angular/angular-cli) (version 16.0.0). The application provides a comprehensive experience for both customers and administrators.

## Development and Setup

The project was generated using Angular CLI, ensuring a modular and scalable structure. Key configurations and tools include:

- **NPM Dependencies:**  
  Run `npm install` to install all required dependencies as defined in the `package.json` file.

- **Development Server:**  
  Use `ng serve` to start the development server. The application will be available at [`http://localhost:4200/`](http://localhost:4200/). Angular CLI enables automatic reload during development.

- **Tailwind CSS:**  
  Styling is handled with Tailwind, configured via `tailwind.config.js` and `postcss.config.js`, making it easy to create responsive and modern layouts.

- **Docker:**  
  The project includes a `Dockerfile` to facilitate containerization and distribution, ensuring more consistent production environments.

- **VS Code Integration:**  
  The `.vscode` folder contains settings to streamline debugging, automated tasks, and other integrations with this IDE.

## Features

### Site Features

- **Header and Footer:**  
  Present on all pages, providing easy navigation and access to contact information and social media.

- **Product List:**  
  The homepage displays all available products, including name, price, and image. Each product is clickable, leading to its detail page.

- **Product Details:**  
  This page shows complete information about the selected product, including a detailed description, images, and options to add to the cart.

- **Cart:**  
  Allows users to view added items, modify quantities, remove products, and see the purchase total. Navigation is available via an icon in the header.

### Admin Area Features

The admin area is designed to facilitate complete store management. Main features include:

- **Dashboard:**  
  An overview with key statistics such as total products, categories, orders, and sales. Provides quick access to administrative actions.

- **Product Management:**  
  Through the **Product Factory**, administrators can add, edit, and delete products. There are also options to filter and search products by categories and other properties.

- **Category Management:**  
  The **Category Factory** feature enables creation, editing, and removal of categories, with details such as icon, creation date, and update date.

- **Order Management:**  
  Using the **Order Factory**, administrators can view order statuses and update their information. Confirmation modals ensure safe deletion or modification actions.

- **Sales Reports:**  
  The **Sales List** section displays sales records, supporting performance analysis and strategic decision-making.

- **Tool Bar and Side Bar:**  
  Fixed elements in the admin interface that enable navigation between different modules (products, categories, orders, and sales), as well as notification and user control functions.

## Usage

To run the project locally, follow these steps:

1. **Install dependencies:**
   ```
   npm install
   ```
2. **Start the development server:**
   ```
   ng serve
   ```
3. **Access the application:**
   [http://localhost:4200/](http://localhost:4200/)

## Navigation

### Shopping Area (Frontend)

- **Main Navigation:**  
  The header contains links to the product list, product details, cart, and contact.

- **Product Details:**  
  Click any product to view detailed information and purchase options.

- **Cart:**  
  View added items and adjust quantities before completing the purchase.

### Admin Area

- **Login/Admin Link:**  
  A link in the header directs to the admin area. For demonstration purposes, access may be granted directly.

- **Dashboard:**  
  The admin homepage displays summaries of key statistics.

- **Product, Category, and Order Management:**  
  Separate modules for each area, allowing creation, editing, and deletion actions with confirmation modals.

- **Sales Reports:**  
  View sales data to monitor store performance.

## Contribution

To contribute to the project:

1. Fork the repository.
2. Create a new branch for your changes:
   ```
   git checkout -b my-branch
   ```
3. Commit your changes:
   ```
   git commit -am 'Added: My change'
   ```
4. Push the branch to the remote repository:
   ```
   git push origin my-branch
   ```
5. Open a Pull Request for review.

## License

Check the dependency license details in the `docs/3rdpartylicenses.txt` file.

---

This README summarizes the creation, setup, and complete features of MaboaTech Shop, covering both the end-user experience and essential administrative functionalities. If you have questions or suggestions, feel free to contribute.
