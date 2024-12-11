# Resume Builder

This project is a **React-based resume builder** that allows users to create and preview a resume using a modern component library. It was developed by [Alaa Abdallah](https://github.com/alaa-abdallah1) to showcases integration with [shadcn/ui](https://ui.shadcn.com/) components, and lazy-loading a rich text editor.

## Introduction

This challenge aimed to build a resume builder UI inspired by the provided demo. The solution involves:

- An editor to input and edit resume content.
- Integration with the [shadcn/ui](https://ui.shadcn.com/) component library for consistent styling and UI patterns.
- Lazy-loading of a rich text editor to reduce initial bundle size.
- The ability to preview the resume.
- The option to download the resume as a PDF.
- Emphasis on code cleanliness, modularity, and best practices.

A key aspect of this challenge was the effective use of Large Language Model (LLM) coding assistants (like ChatGPT or Claude) to expedite development. A recording of all LLM prompts used is included as part of the deliverables.

## Live Demo
[View the live demo here](https://resume-builder-iv9z.onrender.com/)


## Features

- **Resume Editor**: Users can fill out different sections of their resume, including basic details, work experience, education, skills, and more.
- **WYSIWYG Editor**: A rich text editor (using `react-quill` or a similar tool) is integrated to format text.
- **Preview Mode**: Users can preview the formatted resume in a print-ready layout that mimics an A4 page.
- **Responsive & Accessible UI**: Built on shadcn/ui and TailwindCSS, the UI is responsive and maintains accessibility best practices.
- **Download Feature**: Once the user is satisfied with the resume, they can download it as a PDF.

## Requirements and Prerequisites

- **Node.js** (v16 or later recommended)
- **Yarn** or **npm** for installing dependencies
- A modern browser (Chrome, Firefox, Safari, Edge) for testing


## Recording of LLM Prompt Usage

A short screencast is provided separately (as per the challenge instructions) showing the prompts history with the chosen LLM (e.g., ChatGPT). This video demonstrates how the LLM was integrated into the workflow, including solution brainstorming, code snippets, and troubleshooting steps.

Watch this video.

https://vimeo.com/1038212029/072360ac49?share=copy

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/alaa-abdallah1/resume-builder.git
   cd resume-builder
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```
   _(Or use `npm install` if you prefer.)_

## Running the Application

1. **Development Server**:
   Start the development server:

   ```bash
   yarn dev
   ```

   The app will be available at [http://localhost:10000](http://localhost:10000) (or a similar port depending on your configuration).

2. **Production Build**:
   To create an optimized production build:
   ```bash
   yarn build
   ```
   Then serve the production build:
   ```bash
   yarn preview
   ```

## Project Structure

Below is a simplified overview of the project structure:

![image](https://github.com/user-attachments/assets/7bf6e872-022e-4180-acca-69fa562a67f9)

## Generated Resume By This App

![image](https://github.com/user-attachments/assets/996a705d-aeda-4f57-b6fd-4a5134c31088)


**Key directories and files**:

- `components/` contains all UI and form components.
- `pages/` includes main route pages.
- `lib/utils.ts` holds utility helpers.
- `vite.config.ts` for Vite configuration.

## Key Libraries and Tools Used

- **React 18+**: Building the interactive UI.
- **Vite**: Fast build tooling and dev server.
- **TypeScript**: Static typing for safer, more maintainable code.
- **shadcn/ui**: Pre-built UI components following Tailwind CSS best practices.
- **react-quill**: Rich text editor integration.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Development Notes

- **Time Constraint**: This project was developed in under 3 hours. Certain architectural or optimization decisions might have been simplified due to this constraint.
- **LLM Assistance**: LLM tools were used to accelerate development, troubleshoot issues, and refine code. The prompts, discussions, and suggestions provided by the LLM helped shape the final solution quickly.
- **Code Splitting**: `React.lazy()` and `Suspense` are used for the text editor to improve initial load times and reduce bundle size.


## Future Improvements

- **More Sections and Customizability**: Allow users to dynamically add or remove resume sections.
- **Internationalization (i18n)**: Support multiple languages.
- **Autosave & Persistence**: Save state to localStorage or a backend so the user can return to their resume later.
- **Enhanced Validation**: Add form validations and checks for required fields.

---

**Thank you for reviewing this project!** If you have any questions or need clarification, feel free to reach out.
