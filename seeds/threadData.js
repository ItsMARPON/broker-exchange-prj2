const Thread = require("../models/thread");

// Creating Thread seed data
const postThread = [
  {
    thread: "I really want to help. I accept your offer.",
    counter_offer: "No changes.",
    user_id: 1,
    post_id: 1
  },
  {
    thread: "I can help. But don't accept your offer.",
    counter_offer: "free of charge",
    user_id: 2,
    post_id: 1
  },
];

const seedThreads = () => Thread.bulkCreate(postThread);

module.exports = seedThreads;
