/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.tsx",
    "./src/NavBar.tsx",
    "./src/HomePage.tsx",
    "./src/Section.tsx",
    "./src/Categories.tsx",
    "./src/Forms/SignUp.tsx",
    "./src/Forms/SignIn.tsx",
    "./src/AboutPage/AboutPage.tsx",
    "./src/Profile/Profile.tsx",
    "./src/Profile/field.tsx",
    "./src/Recipe/RecipeForm.tsx",
    "./src/RecipePage.tsx",
    "./src/RecipeCard.tsx",
    "./src/CommentSection/CommentSection.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        playFair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
