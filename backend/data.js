import bcrypt from "bcryptjs";

const data = {
  users: [
    //creating sample users
    {
      name: "burcu",
      email: "burcuicen2000@gmail.com",
      //using bcrypt library to encode the password
      password: bcrypt.hashSync("admin", 8),
      isAdmin: true,
    },
    {
      name: "sally",
      email: "sally@gmail.com",
      //using bcrypt library to encode the password
      password: bcrypt.hashSync("123456", 8),
      isAdmin: true,
    },
    {
      name: "johndoe",
      email: "johndoe@gmail.com",
      //using bcrypt library to encode the password
      password: bcrypt.hashSync("john123", 8),
      isAdmin: false,
    },
    {
      name: "nataliesmith",
      email: "nataliesmith@gmail.com",
      //using bcrypt library to encode the password
      password: bcrypt.hashSync("natalie654", 8),
      isAdmin: false,
    },
    {
      name: "kevin",
      email: "kevin@gmail.com",
      //using bcrypt library to encode the password
      password: bcrypt.hashSync("kevin7894", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Day Dream",
      category: "Rings",
      image: "/images/product-1.png",
      price: 1950,
      countInStock: 5,
      rating: 4.5,
      numReviews: 12,
      description:
        "Making dreams come true. In the Daydream ring, small matte-surfaced buds form dainty flowers.",
    },
    {
      name: "Delicate Shimmer",
      category: "Rings",
      image: "/images/product-2-1.png",
      price: 671,
      countInStock: 7,
      rating: 4.0,
      numReviews: 5,
      description:
        "Our delicate rings are love at first sight. Designed by you in a round, emerald or oval cut and either 14k yellow gold, white gold, rose gold or sterling silver and gold filled. ",
    },
    {
      name: "Glimmer Glow",
      category: "Necklaces",
      image: "/images/product-3-2.png",
      price: 1600,
      countInStock: 8,
      rating: 4.5,
      numReviews: 7,
      description:
        "This sweet necklace sure is a charmer! A 5x3mm emerald-cut solitaire stone charm dangles from an 18 thin chain set in 14K white gold",
    },
    {
      name: "Daring Dazzle",
      category: "Earrings",
      image: "/images/product-4-1.png",
      price: 935,
      countInStock: 4,
      rating: 5.0,
      numReviews: 1,
      description:
        "A real set of stunners, these huggies will leave your lobes crawling with diamonds. Each 11mm earring has 7 prong-set diamonds set in an asymmetric pattern across the front, mimicking the graceful movement of creeping vines",
    },
    {
      name: "Forever Sparkle",
      category: "Necklaces",
      image: "/images/product-5-2.png",
      price: 1600,
      countInStock: 6,
      rating: 4.5,
      numReviews: 15,
      description:
        "An amethyst center stone will bring you spiritual awareness. This necklace is sustainably made with love and natural gemstones in Los Angeles and ships in approximately 3-4 days.",
    },
    {
      name: "The Pave Eternity",
      category: "Earrings",
      image: "/images/product-6-1.png",
      price: 996,
      countInStock: 12,
      rating: 4.0,
      numReviews: 8,
      description:
        "What are a huggie's best friend? Diamonds and flowers! These cheery earrings feature five diamonds set within floral-esque bezels along the front of the 11mm huggie, adding texture to the look. ",
    },
  ],
};
export default data;
