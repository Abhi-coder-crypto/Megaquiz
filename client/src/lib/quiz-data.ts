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
    text: "Which factor increases the risk of surgical site infection the MOST?",
    type: "mcq",
    options: [
      "Patient age",
      "Duration of surgery",
      "Sterile product quality",
      "Surgeon experience"
    ],
    correctAnswer: "Duration of surgery"
  },
  {
    id: 4,
    text: "What are the most common infection challenges you face in surgical practice?",
    type: "text"
  },
  {
    id: 5,
    text: "How do current infection-control guidelines influence your product selection?",
    type: "text"
  },
  {
    id: 6,
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
    id: 7,
    text: "In a post-operative skin and soft tissue infection with mixed aerobic–anaerobic flora, what would be your choice of oral antibiotic, and what factors guide your decision?",
    type: "text"
  },
  {
    id: 8,
    text: "For post-incision wound infection with purulent discharge, What would be your choice of oral antibiotic and why?",
    type: "text"
  },
  {
    id: 9,
    text: "In diabetic foot infection (mild–moderate, non-MRSA), what would be your guideline-preferred oral therapy?",
    type: "text"
  },
  {
    id: 10,
    text: "For post-drainage perianal abscess, which oral antibiotic is most appropriate?",
    type: "text"
  },
  {
    id: 11,
    text: "Which oral antibiotic you recommend for human or animal bite wounds encountered in surgical practice and why?",
    type: "text"
  },
  {
    id: 12,
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
    id: 13,
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
    id: 14,
    text: "When selecting an oral antibiotic for surgical infections, the most critical factor is:",
    type: "mcq",
    options: [
      "Brand familiarity",
      "Cost alone",
      "Guideline-backed broad coverage",
      "Shortest duration only"
    ]
  },
  {
    id: 15,
    text: "While prescribing Amoxyclav, what factors do you consider, and how do they influence your choice?",
    type: "text"
  }
];
