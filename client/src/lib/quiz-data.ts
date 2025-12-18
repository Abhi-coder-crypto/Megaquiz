export type QuestionType = "mcq" | "text";

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string;
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "According to surgical infection-control guidelines, the most important measure to prevent surgical site infection (SSI) is:",
    type: "mcq",
    options: [
      "Shorter surgery time",
      "Strict asepsis and sterile products",
      "Use of drains",
      "Post-operative antibiotics only"
    ],
    correctAnswer: "Strict asepsis and sterile products"
  },
  {
    id: 2,
    text: "When should surgical antibiotic prophylaxis ideally be administered?",
    type: "mcq",
    options: [
      "After wound closure",
      "6 hours before surgery",
      "Within 60 minutes before incision",
      "After surgery only"
    ],
    correctAnswer: "Within 60 minutes before incision"
  },
  {
    id: 3,
    text: "According to SSI guidelines, first-line oral therapy for mild–moderate surgical site infection after clean-contaminated surgery is:",
    type: "mcq",
    options: [
      "Ciprofloxacin",
      "Cefixime",
      "Amoxicillin–Clavulanate",
      "Linezolid"
    ]
  },
  {
    id: 4,
    text: "In post-operative wound infection with foul-smelling discharge, the key microbial coverage required is:",
    type: "mcq",
    options: [
      "Gram-positive cocci only",
      "Anaerobes",
      "Atypical organisms",
      "Fungal pathogens"
    ]
  },
  {
    id: 5,
    text: "For mild surgical site infection managed on OPD basis, best oral empirical choice is:",
    type: "mcq",
    options: [
      "Linezolid",
      "Cefixime",
      "Amoxicillin–Clavulanate",
      "Doxycycline"
    ]
  },
  {
    id: 6,
    text: "While prescribing Amoxyclav, what factors do you consider, and how do they influence your choice?",
    type: "text"
  }
];
