import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import logo from "./logo.svg";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import doc16 from "./doc16.png";
import doc17 from "./doc17.png";
import doc18 from "./doc18.png";
import doc19 from "./doc19.png";
import doc20 from "./doc20.png";
import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "General physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Anand Sharma",
    image: doc1,
    speciality: "General physician",
    degree: "MD, DM (Cardiology)",
    experience: "15 Years",
    about:
      "Dr. Sharma is a leading cardiologist with extensive experience in interventional cardiology, including angioplasty and stenting. He has successfully treated thousands of patients with complex heart conditions and is actively involved in preventive cardiology awareness. His expertise lies in advanced diagnostic techniques and minimally invasive cardiac procedures. Known for his compassionate approach, Dr. Sharma prioritizes patient education and long-term heart health. He is committed to providing evidence-based, patient-centered care to improve outcomes.",
    fees: 1500,
    address: {
      line1: "Indraprastha Apollo Hospitals",
      line2: "Sarita Vihar, New Delhi, India",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Priya Singh",
    image: doc2,
    speciality: "Neurologist",
    degree: "MD, DM (Neurology)",
    experience: "12 Years",
    about:
      "Dr. Singh specializes in diagnosing and managing neurological disorders such as stroke, epilepsy, migraines, and multiple sclerosis. She has extensive training in neuroimaging and advanced therapies for neurological conditions. With a patient-first approach, she focuses on personalized treatment plans that address both physical and emotional aspects. Dr. Singh also emphasizes early detection and lifestyle modifications to prevent recurrent neurological issues. Her empathetic care and dedication have earned her strong trust among patients.",
    fees: 1200,
    address: {
      line1: "Max Healthcare",
      line2: "Saket, New Delhi, India",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Rajesh Gupta",
    image: doc3,
    speciality: "General physician",
    degree: "MS (Orthopedics)",
    experience: "20 Years",
    about:
      "Dr. Gupta is a highly skilled orthopedic surgeon specializing in joint replacement surgeries, sports medicine, and trauma management. He has successfully performed numerous complex procedures, helping patients regain mobility and quality of life. With over two decades of expertise, he combines surgical precision with advanced rehabilitation techniques. His approach is patient-centric, focusing on reducing recovery time and enhancing long-term results. Dr. Gupta is well-regarded for his dedication to excellence in orthopedic care.",
    fees: 1800,
    address: {
      line1: "Fortis Escorts Hospital",
      line2: "Okhla, New Delhi, India",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Smita Rao",
    image: doc4,
    speciality: "Pediatrician",
    degree: "MD (Pediatrics)",
    experience: "10 Years",
    about:
      "Dr. Rao provides comprehensive healthcare for infants, children, and adolescents, with a focus on preventive medicine and growth monitoring. She is skilled in diagnosing and managing childhood illnesses, developmental concerns, and vaccination programs. Her warm and approachable nature helps young patients feel comfortable during consultations. Dr. Rao emphasizes parental guidance and education for overall child well-being. She is passionate about promoting healthy lifestyles and early intervention for long-term development.",
    fees: 800,
    address: {
      line1: "Manipal Hospitals",
      line2: "Old Airport Road, Bengaluru, India",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Vikram Joshi",
    image: doc5,
    speciality: "Dermatologist",
    degree: "MD (Dermatology)",
    experience: "8 Years",
    about:
      "Dr. Joshi is a dermatologist specializing in the treatment of skin, hair, and nail conditions ranging from acne to advanced dermatoses. He also provides cosmetic dermatology services including chemical peels, laser therapies, and anti-aging treatments. With a focus on patient education, he ensures individuals understand both prevention and cure strategies. His approach combines modern medical techniques with personalized care. Dr. Joshi is dedicated to improving skin health and boosting patient confidence.",
    fees: 900,
    address: {
      line1: "Apollo Hospitals",
      line2: "Bannerghatta Road, Bengaluru, India",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Neha Kapoor",
    image: doc6,
    speciality: "Gynecologist",
    degree: "MS (Obstetrics & Gynecology)",
    experience: "14 Years",
    about:
      "Dr. Kapoor offers comprehensive women’s healthcare services, including antenatal care, infertility treatment, and gynecological surgeries. She has expertise in laparoscopic procedures, high-risk pregnancies, and reproductive health management. Dr. Kapoor strongly believes in building long-term patient relationships and providing compassionate care throughout all life stages. Her approach integrates preventive screenings and patient education to promote overall well-being. She is highly regarded for her surgical precision and empathetic counseling.",
    fees: 1100,
    address: {
      line1: "Sir Ganga Ram Hospital",
      line2: "Rajendra Nagar, New Delhi, India",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Alok Kumar",
    image: doc7,
    speciality: "General physician",
    degree: "MCh (Urology)",
    experience: "18 Years",
    about:
      "Dr. Kumar is a senior urologist with extensive experience in managing urinary tract disorders, kidney stones, and male reproductive health issues. He is well-versed in minimally invasive urological surgeries, including laparoscopy and laser procedures. His commitment lies in offering safe, effective, and patient-friendly treatments. Dr. Kumar emphasizes early diagnosis and holistic management to ensure long-term health outcomes. Known for his precise surgical skills, he has built a strong reputation in urology care.",
    fees: 1600,
    address: {
      line1: "Medanta - The Medicity",
      line2: "Sector 38, Gurugram, India",
    },
  },
  {
    _id: "doc8",
    name: "Dr. Sunita Desai",
    image: doc8,
    speciality: "Gynecologist",
    degree: "MS (Ophthalmology)",
    experience: "16 Years",
    about:
      "Dr. Desai is a senior ophthalmologist specializing in cataract surgery, LASIK, glaucoma management, and retinal disorders. With advanced training in microsurgical techniques, she has restored vision for thousands of patients. She emphasizes preventive eye care and early detection of sight-threatening diseases. Dr. Desai is deeply committed to patient education and awareness regarding eye health. Her compassionate approach ensures a comfortable experience for patients of all age groups.",
    fees: 1000,
    address: {
      line1: "Sankara Nethralaya",
      line2: "College Road, Chennai, India",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Manish Jain",
    image: doc9,
    speciality: "Dermatologist",
    degree: "MD, DM (Medical Oncology)",
    experience: "13 Years",
    about:
      "Dr. Jain is a dedicated medical oncologist providing advanced cancer care with a focus on individualized treatment strategies. His expertise spans chemotherapy, targeted therapy, and immunotherapy for various cancers. He believes in a multidisciplinary approach, working closely with other specialists to ensure comprehensive care. Dr. Jain also emphasizes emotional support and counseling for patients and families. His patient-centered philosophy has helped many navigate cancer with confidence and hope.",
    fees: 2000,
    address: {
      line1: "Tata Memorial Hospital",
      line2: "Parel, Mumbai, India",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Rekha Reddy",
    image: doc10,
    speciality: "Dermatologist",
    degree: "MD, DM (Endocrinology)",
    experience: "11 Years",
    about:
      "Dr. Reddy is an endocrinologist specializing in diabetes, thyroid disorders, and metabolic diseases. She has deep expertise in hormonal management, lifestyle counseling, and advanced therapeutic interventions. Dr. Reddy works closely with patients to create personalized care plans that focus on long-term wellness. She is particularly passionate about diabetes management and preventive endocrinology. Her patient education initiatives empower individuals to manage chronic conditions effectively and improve overall quality of life.",
    fees: 1300,
    address: {
      line1: "Apollo Hospitals",
      line2: "Jubilee Hills, Hyderabad, India",
    },
  },
  {
    _id: "doc11",
    name: "Dr. Suresh Patwardhan",
    image: doc11,
    speciality: "Pediatricians",
    degree: "MD, DM (Gastroenterology)",
    experience: "19 Years",
    about:
      "Dr. Patwardhan is a senior gastroenterologist specializing in digestive system disorders including liver diseases, IBD, and gastrointestinal cancers. He has advanced expertise in performing endoscopic and colonoscopy procedures with patient safety as the top priority. Dr. Patwardhan focuses on accurate diagnosis and evidence-based treatment approaches. His empathetic communication helps patients feel confident and informed about their care. With nearly two decades of practice, he is a trusted expert in gastroenterology.",
    fees: 1700,
    address: {
      line1: "Asian Institute of Gastroenterology",
      line2: "Gachibowli, Hyderabad, India",
    },
  },
  {
    _id: "doc12",
    name: "Dr. Kavita Sharma",
    image: doc12,
    speciality: "Pediatricians",
    degree: "MD (Psychiatry)",
    experience: "9 Years",
    about:
      "Dr. Sharma is a compassionate psychiatrist dedicated to supporting mental well-being across a wide spectrum of conditions, including anxiety, depression, mood disorders, and stress-related illnesses. She emphasizes holistic treatment that combines therapy, medication, and lifestyle changes. Dr. Sharma is passionate about reducing the stigma surrounding mental health and encouraging open communication. Her patient-focused approach creates a safe and supportive environment. She is committed to helping individuals achieve long-term psychological resilience.",
    fees: 1000,
    address: {
      line1: "Institute of Human Behaviour & Allied Sciences",
      line2: "Dilshad Garden, New Delhi, India",
    },
  },
  {
    _id: "doc13",
    name: "Dr. Amit Verma",
    image: doc13,
    speciality: "Pediatricians",
    degree: "MD, DM (Nephrology)",
    experience: "15 Years",
    about:
      "Dr. Verma is a nephrologist with deep expertise in managing kidney diseases, dialysis therapies, and kidney transplant procedures. He has successfully treated patients with chronic and acute kidney disorders, focusing on improving long-term outcomes. Dr. Verma’s approach combines clinical precision with patient counseling to ensure effective disease management. He is actively involved in awareness programs for kidney health. His dedication and empathetic care make him a trusted expert in nephrology.",
    fees: 1400,
    address: {
      line1: "All India Institute of Medical Sciences",
      line2: "Ansari Nagar, New Delhi, India",
    },
  },
  {
    _id: "doc14",
    name: "Dr. Anjali Sen",
    image: doc14,
    speciality: "Neurologist",
    degree: "MD, DM (Rheumatology)",
    experience: "12 Years",
    about:
      "Dr. Sen is a rheumatologist specializing in autoimmune and inflammatory conditions such as rheumatoid arthritis, lupus, and spondyloarthritis. She focuses on long-term management to improve mobility and quality of life for patients. With expertise in advanced biologic therapies, she provides modern treatment options tailored to individual needs. Dr. Sen emphasizes early diagnosis to prevent disease progression. Her holistic and empathetic approach makes her highly respected in rheumatology care.",
    fees: 1200,
    address: {
      line1: "KIMS Hospitals",
      line2: "Secunderabad, Telangana, India",
    },
  },
  {
    _id: "doc15",
    name: "Dr. Pradeep Nair",
    image: doc15,
    speciality: "Neurologist",
    degree: "MD, DNB (Pulmonology)",
    experience: "17 Years",
    about:
      "Dr. Nair is a pulmonologist specializing in respiratory diseases such as asthma, COPD, tuberculosis, and lung infections. He is highly skilled in bronchoscopy and critical respiratory care. Dr. Nair focuses on providing comprehensive management plans that include medication, lifestyle changes, and preventive strategies. With nearly two decades of experience, he has successfully treated both acute and chronic pulmonary conditions. His patient-first philosophy ensures high-quality, accessible respiratory care.",
    fees: 1300,
    address: {
      line1: "Narayana Health City",
      line2: "Bommasandra, Bengaluru, India",
    },
  },
  {
    _id: "doc16",
    name: "Dr. Meena Sharma",
    image: doc16,
    speciality: "Neurologist",
    degree: "MD (Infectious Diseases)",
    experience: "10 Years",
    about:
      "Dr. Sharma is an infectious disease specialist with expertise in managing complex bacterial, viral, and fungal infections. She has experience handling rare infections and working with multidisciplinary teams for holistic care. Dr. Sharma is passionate about infection prevention, antimicrobial stewardship, and patient safety. She also focuses on counseling patients and families regarding preventive measures. Her balanced approach of clinical expertise and compassion makes her a trusted physician in infectious diseases.",
    fees: 1100,
    address: {
      line1: "Jaslok Hospital",
      line2: "Pedder Road, Mumbai, India",
    },
  },
  {
    _id: "doc17",
    name: "Dr. Sandeep Kulkarni",
    image: doc17,
    speciality: "Gastroenterologist",
    degree: "MS (General Surgery)",
    experience: "22 Years",
    about:
      "Dr. Kulkarni is a senior general surgeon with more than two decades of experience in performing advanced surgical procedures. He is highly skilled in laparoscopy, trauma care, and complex abdominal surgeries. Known for his precision and commitment to patient safety, he has successfully treated numerous challenging cases. Dr. Kulkarni emphasizes minimally invasive approaches that reduce pain and recovery time. His dedication to surgical excellence makes him a respected name in the field.",
    fees: 1500,
    address: {
      line1: "Ruby Hall Clinic",
      line2: "Bund Garden Road, Pune, India",
    },
  },
  {
    _id: "doc18",
    name: "Dr. Leena Shah",
    image: doc18,
    speciality: "Gastroenterologist",
    degree: "MD, DM (Hematology)",
    experience: "14 Years",
    about:
      "Dr. Shah is a hematologist specializing in blood disorders, anemia, clotting abnormalities, and blood cancers. She provides advanced treatment plans, including chemotherapy and bone marrow transplant support. Dr. Shah’s patient care philosophy focuses on improving quality of life alongside clinical outcomes. She is actively engaged in awareness and education programs related to hematological health. Her empathetic counseling and evidence-based treatment make her a trusted hematology expert.",
    fees: 1800,
    address: {
      line1: "Kokilaben Dhirubhai Ambani Hospital",
      line2: "Andheri West, Mumbai, India",
    },
  },
  {
    _id: "doc19",
    name: "Dr. Rohit Khanna",
    image: doc19,
    speciality: "Gastroenterologist",
    degree: "MCh (Plastic Surgery)",
    experience: "16 Years",
    about:
      "Dr. Khanna is a renowned plastic and reconstructive surgeon with expertise in both cosmetic and reconstructive procedures. He specializes in facial reconstruction, burn management, and aesthetic surgeries. Dr. Khanna focuses on blending medical science with artistry to achieve natural-looking results. His patient-first approach ensures personalized care tailored to individual goals. With years of experience, he has successfully restored function and confidence for numerous patients.",
    fees: 2500,
    address: {
      line1: "BLK-Max Super Speciality Hospital",
      line2: "Pusa Road, New Delhi, India",
    },
  },
  {
    _id: "doc20",
    name: "Dr. Pooja Iyer",
    image: doc20,
    speciality: "Gynecologist",
    degree: "MCh (Neurosurgery)",
    experience: "19 Years",
    about:
      "Dr. Iyer is a skilled neurosurgeon specializing in brain and spine surgeries, including tumors, aneurysms, and spinal disorders. She is proficient in using advanced surgical techniques to minimize risks and optimize outcomes. Dr. Iyer strongly believes in combining surgical excellence with patient counseling and rehabilitation support. Her holistic care approach ensures both physical and emotional well-being for patients. With nearly two decades of experience, she is a trusted name in neurosurgery.",
    fees: 2200,
    address: {
      line1: "Christian Medical College",
      line2: "Ida Scudder Road, Vellore, India",
    },
  },
];
