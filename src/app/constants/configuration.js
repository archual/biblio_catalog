export const booksInitialState = {
  books: [],
  data: {
    _id: "",
    title: "",
    genreId: {},
    image: "",
    authors: {}
  },
  errors: {},
  loading: false
};

export const tableInitialState = {
  currentPage: 1,
  pageSize: 4,
  sortColumn: { path: "", order: "asc" },
  searchQuery: ""
};

export const genresInitialState = {
  genres: [],
  selectedGenre: { _id: "", name: "All Genres" },
  loading: false
};

export const authorsInitialState = {
  authors: [],
  data: {
    _id: "",
    name: "",
    surname: ""
  },
  errors: {}
};

export const initialState = {
  books: [],
  genres: [],
  authors: []
};
