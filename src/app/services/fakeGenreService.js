export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Fantastic" },
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Finance" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Programming" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Management" }
];

export function getGenres() {
  return genres.filter(g => g);
}
