export const authors = [
  { _id: "5b21ca3eeb7f6fbccd471850", name: "Marijn", surname: "Haverbeke" },
  { _id: "5b21ca3eeb7f6fbccd471851", name: "Addy", surname: "Osmani" },
  { _id: "5b21ca3eeb7f6fbccd471852", name: "Axel", surname: "Rauschmayer" },
  { _id: "5b21ca3eeb7f6fbccd471853", name: "Eric", surname: "Elliott" },
  { _id: "5b21ca3eeb7f6fbccd471854", name: "Nicholas", surname: "C. Zakas" },
  { _id: "5b21ca3eeb7f6fbccd471855", name: "Kyle", surname: "Simpson" },
  { _id: "5b21ca3eeb7f6fbccd471856", name: "Richard", surname: "E. Silverman" },
  { _id: "5b21ca3eeb7f6fbccd471857", name: "Glenn", surname: "Block, et al." }
];

export function getAuthors() {
  return authors;
}

export function getAuthor(id) {
  return authors.find(m => m._id === id);
}

export function saveAuthor(author) {
  let authorInDb = author.find(m => m._id === author._id) || {};
  authorInDb.title = author.title;

  if (!authorInDb._id) {
    authorInDb._id = Date.now();
    authors.push(authorInDb);
  }

  return authorInDb;
}

export function deleteAuthor(id) {
  let authorInDb = authors.find(m => m._id === id);
  authors.splice(authors.indexOf(authorInDb), 1);
  return authorInDb;
}
