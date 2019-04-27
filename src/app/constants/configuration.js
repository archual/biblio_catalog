export const booksInitialState = {
  books: [],
  data: {
    _id: "",
    title: "",
    genreId: "",
    image: "",
    authors: []
  },
  errors: {}
};

export const tableInitialState = {
  currentPage: 1,
  pageSize: 4,
  sortColumn: { path: "", order: "asc" },
  searchQuery: ""
};

export const genresInitialState = {
  genres: [],
  selectedGenre: { _id: "", name: "All Genres" }
};

export const authorsInitialState = {
  authors: []
};

export const initialState = {
  books: [],
  genres: [],
  authors: []
};
