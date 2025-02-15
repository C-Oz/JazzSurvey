const surveyData = [
  {
    type: "imagePair",
    question: "Which image do you prefer?",
    options: [
      { id: "A", image: "imageA.jpg" },
      { id: "B", image: "imageB.jpg" },
    ],
  },
  {
    type: "imageSound",
    question: "How would you rate this image & sound combination?",
    image: "example.jpg",
    sound: "example.mp3",
    options: [1, 2, 3, 4, 5], // Rating scale
  },
  {
    type: "imagePair",
    question: "Which image do you prefer?",
    options: [
      { id: "C", image: "imageA.jpg" },
      { id: "D", image: "imageB.jpg" },
    ],
  },
];

export default surveyData;
