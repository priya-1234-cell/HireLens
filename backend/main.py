from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="HireLens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "HireLens API is running 🚀"}


CAREERS = {
    "AI Engineer": {
        "interests": ["AI", "Data"],
        "degrees": ["AIML", "CSE", "IT"],
        "skills": ["Python", "Machine Learning", "Deep Learning", "SQL"],
        "description": "Design and build intelligent systems using machine learning and AI.",
        "roadmap": [
            "Strengthen Python fundamentals",
            "Learn NumPy and Pandas",
            "Learn Machine Learning",
            "Study Deep Learning",
            "Build and deploy an AI project",
        ],
    },

    "Machine Learning Engineer": {
        "interests": ["AI", "Data"],
        "degrees": ["AIML", "CSE", "IT"],
        "skills": ["Python", "Statistics", "Machine Learning", "Deep Learning"],
        "description": "Develop, evaluate, and deploy machine learning models for real-world problems.",
        "roadmap": [
            "Master Python",
            "Learn statistics and probability",
            "Study ML algorithms",
            "Learn model evaluation",
            "Build and deploy ML projects",
        ],
    },

    "Data Scientist": {
        "interests": ["Data", "AI"],
        "degrees": ["AIML", "CSE", "IT"],
        "skills": ["Python", "Statistics", "SQL", "Data Visualization"],
        "description": "Turn data into insights and predictive models that support decision-making.",
        "roadmap": [
            "Learn Python for data analysis",
            "Study statistics",
            "Learn SQL",
            "Practice data visualization",
            "Build an end-to-end data project",
        ],
    },

    "Data Analyst": {
        "interests": ["Data"],
        "degrees": ["CSE", "IT", "AIML"],
        "skills": ["SQL", "Excel", "Python", "Data Visualization"],
        "description": "Analyze datasets and communicate useful insights through reports and dashboards.",
        "roadmap": [
            "Learn Excel",
            "Learn SQL",
            "Learn Python for analysis",
            "Practice visualization",
            "Build analytics dashboards",
        ],
    },

    "Computer Vision Engineer": {
        "interests": ["AI", "Robotics"],
        "degrees": ["AIML", "CSE", "ECE"],
        "skills": ["Python", "OpenCV", "Computer Vision", "Deep Learning"],
        "description": "Build intelligent systems that understand and process images and video.",
        "roadmap": [
            "Strengthen Python",
            "Learn image processing",
            "Learn OpenCV",
            "Study CNNs",
            "Build a computer vision project",
        ],
    },

    "Frontend Developer": {
        "interests": ["Web"],
        "degrees": ["CSE", "IT", "AIML"],
        "skills": ["HTML", "CSS", "JavaScript", "React"],
        "description": "Create responsive and interactive user interfaces for web applications.",
        "roadmap": [
            "Master HTML and CSS",
            "Learn JavaScript",
            "Learn React",
            "Practice Git and GitHub",
            "Build responsive applications",
        ],
    },

    "Full Stack Developer": {
        "interests": ["Web"],
        "degrees": ["CSE", "IT", "AIML"],
        "skills": ["JavaScript", "React", "Node.js", "SQL"],
        "description": "Build complete web applications across both frontend and backend.",
        "roadmap": [
            "Learn JavaScript",
            "Master React",
            "Learn Node.js",
            "Learn SQL and APIs",
            "Build a full-stack application",
        ],
    },

    "Cloud Engineer": {
        "interests": ["Cloud"],
        "degrees": ["CSE", "IT", "AIML", "ECE"],
        "skills": ["Linux", "Networking", "AWS", "Docker"],
        "description": "Design, deploy, and maintain scalable cloud infrastructure.",
        "roadmap": [
            "Learn Linux",
            "Learn networking",
            "Learn AWS or Azure",
            "Learn Docker",
            "Deploy a cloud application",
        ],
    },

    "Cybersecurity Analyst": {
        "interests": ["Cybersecurity"],
        "degrees": ["CSE", "IT", "ECE"],
        "skills": [
            "Networking",
            "Linux",
            "Cybersecurity",
            "Threat Analysis",
        ],
        "description": "Identify security threats, investigate incidents, and help protect systems and networks.",
        "roadmap": [
            "Learn networking",
            "Learn Linux",
            "Study cybersecurity fundamentals",
            "Learn threat detection",
            "Build a security-focused project",
        ],
    },

    "Robotics Engineer": {
        "interests": ["Robotics", "AI"],
        "degrees": ["ECE", "AIML", "CSE"],
        "skills": [
            "C / C++",
            "Embedded Systems",
            "Sensors",
            "Robotics",
        ],
        "description": "Develop intelligent robotic systems combining software, hardware, and automation.",
        "roadmap": [
            "Learn C / C++",
            "Study microcontrollers",
            "Learn sensors and actuators",
            "Study robotics fundamentals",
            "Build a robotics prototype",
        ],
    },
}


@app.post("/recommend")
def recommend(data: dict):

    name = data.get("name", "")
    degree = data.get("degree", "")
    interest = data.get("interest", "")

    try:
        cgpa = float(data.get("cgpa", 0))
    except:
        cgpa = 0

    results = []

    for career, info in CAREERS.items():

        score = 20
        reasons = []

        # Degree compatibility
        if degree in info["degrees"]:
            score += 25
            reasons.append(
                f"Your {degree} background is relevant to this career."
            )

        # Interest compatibility
        if interest in info["interests"]:
            score += 40
            reasons.append(
                f"Your interest in {interest} strongly aligns with this career."
            )

        # CGPA contribution
        if cgpa >= 9:
            score += 15
            reasons.append(
                "Your strong academic performance supports this recommendation."
            )
        elif cgpa >= 8:
            score += 10
            reasons.append(
                "Your academic performance provides a solid foundation."
            )
        elif cgpa >= 7:
            score += 5
            reasons.append(
                "Your academic profile provides a reasonable foundation."
            )

        # Small bonus for related technical backgrounds
        if degree in info["degrees"] and interest in info["interests"]:
            score += 5

        score = min(score, 100)

        if not reasons:
            reasons.append(
                "This career could be explored as an alternative direction."
            )

        results.append({
            "career": career,
            "score": score,
            "description": info["description"],
            "reasons": reasons,
            "skills": info["skills"],
            "roadmap": info["roadmap"],
        })

    # Highest score first
    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    top = results[:3]

    # Combine skills from top recommendations
    skills = []

    for career in top:
        for skill in career["skills"]:
            if skill not in skills:
                skills.append(skill)

    skills = skills[:8]

    # Main career
    primary = top[0]

    # Dynamic insight
    if primary["score"] >= 90:
        insight = (
            f"{primary['career']} is a very strong match for your current profile. "
            "Your academic background and interests align closely with this direction."
        )
    elif primary["score"] >= 75:
        insight = (
            f"{primary['career']} is a strong potential direction for you. "
            "You already have some relevant foundations, but practical projects "
            "and targeted skill development will strengthen your profile."
        )
    else:
        insight = (
            f"{primary['career']} is one possible direction based on your profile. "
            "Explore it through projects and practical experience before making "
            "a final career decision."
        )

    return {
        "name": name,
        "degree": degree,
        "cgpa": cgpa,
        "interest": interest,

        "primary_career": primary["career"],
        "primary_score": primary["score"],
        "primary_description": primary["description"],
        "primary_reasons": primary["reasons"],

        "careers": [
            item["career"]
            for item in top
        ],

        "career_scores": [
            {
                "career": item["career"],
                "score": item["score"],
                "description": item["description"],
                "reasons": item["reasons"],
            }
            for item in top
        ],

        "skills": skills,

        "roadmap": primary["roadmap"],

        "insight": insight,
    }