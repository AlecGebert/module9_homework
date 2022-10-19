const jsonString = `{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }`;

const data = JSON.parse(jsonString);
const all = data.list;

const list = [];

for (let i = 0; i < all.length; i++) {
  list.push({
    name: all[i].name,
    age: Number(all[i].age),
    prof: all[i].prof,
  });
}

const result = {
  list,
};
console.log(result);
