import express from "express"
import cors from "cors"
import axios from "axios"
import dotenv from "dotenv"
import crypto from "crypto"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// In-memory cache for responses
const responseCache = new Map()

// Function to generate cache key from message
function getCacheKey(message) {
  return crypto.createHash('md5').update(message.toLowerCase().trim()).digest('hex')
}

// Check if question is related to civic issues
function isCivicIssueRelated(message) {
  const lowerMsg = message.toLowerCase().trim()
  
  // Civic issue related keywords
  const civicKeywords = [
    // Basic greetings (allowed)
    'hello', 'hi', 'hey', 'help', 'madad', 'सहायता',
    
    // Civic infrastructure
    'road', 'सड़क', 'pothole', 'गड्ढा', 'street', 'गली',
    'water', 'पानी', 'supply', 'आपूर्ति', 'tap', 'नल',
    'electricity', 'बिजली', 'power', 'current', 'करंट',
    'garbage', 'कचरा', 'waste', 'कूड़ा', 'sanitation', 'स्वच्छता',
    'drainage', 'नाली', 'sewer', 'गंदा पानी',
    'streetlight', 'light', 'बत्ती', 'रोशनी',
    
    // Public safety & services
    'safety', 'सुरक्षा', 'police', 'पुलिस', 'emergency', 'आपातकाल',
    'complaint', 'शिकायत', 'grievance', 'समस्या', 'problem', 'issue',
    'municipal', 'नगर', 'corporation', 'निगम', 'panchayat', 'पंचायत',
    
    // Government services
    'government', 'सरकार', 'service', 'सेवा', 'scheme', 'yojana', 'योजना',
    'certificate', 'प्रमाण', 'document', 'दस्तावेज़',
    'ration', 'राशन', 'pension', 'पेंशन',
    
    // Platform features
    'vaani', 'वाणी', 'login', 'लॉगिन', 'complaint', 'शिकायत',
    'voice', 'आवाज़', 'volunteer', 'स्वयंसेवक', 'track', 'status',
    'file', 'submit', 'report', 'register'
  ]
  
  // Check if message contains any civic-related keyword
  return civicKeywords.some(keyword => lowerMsg.includes(keyword))
}

function getCivicIssueResponse(message) {
  const lowerMsg = message.toLowerCase().trim()
  
  // Greetings
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg === 'hey') {
    return "Hello! I'm VAANI, your civic assistant. 🏛️\n\nI help you with civic and public service issues like:\n• Roads & potholes (सड़क और गड्ढे)\n• Water supply (पानी की आपूर्ति)\n• Electricity issues (बिजली की समस्या)\n• Garbage & sanitation (कचरा और स्वच्छता)\n• Streetlights (सड़क की बत्तियां)\n• Drainage problems (नाली की समस्या)\n\n📱 You can:\n✓ Login and file complaints\n✓ Use voice input (no reading needed!)\n✓ Get help from volunteers\n✓ Track your complaint status\n\nHow can I help you today?"
  }
  
  if (lowerMsg.includes('help') || lowerMsg.includes('madad') || lowerMsg.includes('सहायता')) {
    return "I'm VAANI - here to help with civic issues! 🏛️\n\n📋 I can assist with:\n• Road damage & potholes\n• Water supply problems\n• Electricity issues\n• Garbage collection\n• Streetlight repairs\n• Drainage & sewage\n• Public safety concerns\n• Government service complaints\n\n📱 VAANI Platform Features:\n✓ File complaints easily\n✓ Voice input available (बोलकर शिकायत करें)\n✓ Volunteer assistance\n✓ Track complaint until resolved\n\nWhat civic issue can I help you with?"
  }
  
  // Platform/VAANI info
  if (lowerMsg.includes('vaani') || lowerMsg.includes('वाणी') || lowerMsg.includes('platform')) {
    return "Welcome to VAANI! 🎙️\n\nVAANI is your voice-powered civic complaint platform.\n\n✨ Key Features:\n• 📝 File civic complaints online\n• 🎤 Voice input for those who can't read/write\n• 👥 Get help from trained volunteers\n• 📊 Track complaint status in real-time\n• ⚡ Fast resolution of civic issues\n\n🏛️ Report Issues:\n• Roads, water, electricity\n• Garbage, drainage, streetlights\n• Public safety & government services\n\n🔐 Login to file your first complaint!\n\nWhat would you like to know?"
  }
  
  // Login/File complaint
  if (lowerMsg.includes('login') || lowerMsg.includes('file') || lowerMsg.includes('submit') || lowerMsg.includes('complaint')) {
    return "Filing a Complaint on VAANI 📝\n\n🔐 Step 1: Login\n• Click 'Login' button\n• Use email/phone/Google\n\n📋 Step 2: File Complaint\n• Select issue type\n• Describe the problem\n• Add location & photos\n\n🎤 Voice Input Available!\n• Can't read/write? No problem!\n• Use voice to describe your issue\n• We'll convert it to text\n\n👥 Need Help?\n• Volunteers are available\n• They'll guide you through the process\n\n📊 Track Status:\n• Monitor complaint progress\n• Get updates until resolved\n\nReady to file a complaint? Login now!"
  }
  
  // Voice feature
  if (lowerMsg.includes('voice') || lowerMsg.includes('आवाज़') || lowerMsg.includes('speak') || lowerMsg.includes('बोल')) {
    return "VAANI Voice Feature 🎤\n\n✨ Voice Input Benefits:\n• No need to read or write\n• Speak in your language\n• Easy for everyone\n• Fast complaint filing\n\n📱 How to Use:\n1. Login to VAANI\n2. Click 'File Complaint'\n3. Tap microphone icon 🎤\n4. Speak your issue clearly\n5. We'll convert to text\n6. Review & submit\n\n🗣️ Supported:\n• Hindi, English, regional languages\n• Clear voice recognition\n• Volunteer assistance available\n\nMaking civic complaints accessible for all!"
  }
  
  // Volunteer
  if (lowerMsg.includes('volunteer') || lowerMsg.includes('स्वयंसेवक')) {
    return "VAANI Volunteers 👥\n\n🤝 How Volunteers Help:\n• Guide you through complaint filing\n• Assist with voice input\n• Help those who can't read/write\n• Provide language support\n• Track complaint for you\n\n📞 Get Volunteer Help:\n1. Login to VAANI\n2. Click 'Need Help?'\n3. Connect with volunteer\n4. Get personalized assistance\n\n✨ Volunteers are trained to:\n• Handle all civic issues\n• Be patient & supportive\n• Ensure your complaint is filed correctly\n\nNeed volunteer assistance? Contact us!"
  }
  
  // Track status
  if (lowerMsg.includes('track') || lowerMsg.includes('status') || lowerMsg.includes('check')) {
    return "Track Your Complaint 📊\n\n🔍 How to Track:\n1. Login to VAANI\n2. Go to 'My Complaints'\n3. View all your complaints\n4. Check real-time status\n\n📈 Status Updates:\n• Submitted ✓\n• Under Review 🔍\n• Assigned to Department 📋\n• In Progress 🔧\n• Resolved ✅\n\n🔔 Notifications:\n• Get updates via SMS/email\n• Track until complete resolution\n• View department responses\n\n⏱️ Fast Resolution:\nWe ensure your civic issues are resolved quickly!\n\nLogin to track your complaints now!"
  }
  
  // Road issues
  if (lowerMsg.includes('road') || lowerMsg.includes('सड़क') || lowerMsg.includes('pothole') || lowerMsg.includes('गड्ढा')) {
    return "Road Issues & Potholes 🛣️\n\n📋 Common Problems:\n• Potholes (गड्ढे)\n• Broken roads (टूटी सड़कें)\n• Road cracks (दरारें)\n• Damaged footpaths (फुटपाथ)\n\n📱 How to Report:\n1. Login to VAANI\n2. Select 'Road Issue'\n3. Add location & photo\n4. Describe the problem\n5. Submit complaint\n\n🎤 Use voice input if needed!\n\n⏱️ Resolution Time:\n• Emergency: 24-48 hours\n• Regular: 3-7 days\n\n📊 Track your complaint status\n\nReady to report a road issue?"
  }
  
  // Water supply
  if (lowerMsg.includes('water') || lowerMsg.includes('पानी') || lowerMsg.includes('supply') || lowerMsg.includes('tap')) {
    return "Water Supply Issues 💧\n\n📋 Common Problems:\n• No water supply (पानी नहीं आ रहा)\n• Low pressure (कम दबाव)\n• Contaminated water (गंदा पानी)\n• Leaking pipes (पाइप लीक)\n• Irregular supply (अनियमित आपूर्ति)\n\n📱 Report on VAANI:\n1. Login to platform\n2. Select 'Water Supply'\n3. Describe issue with voice/text\n4. Add location details\n5. Submit & track\n\n⏱️ Response Time: 24-48 hours\n\n🎤 Voice input available!\n👥 Volunteers can help!\n\nFile your water complaint now!"
  }
  
  // Electricity
  if (lowerMsg.includes('electricity') || lowerMsg.includes('बिजली') || lowerMsg.includes('power') || lowerMsg.includes('current')) {
    return "Electricity Issues ⚡\n\n📋 Common Problems:\n• Power outage (बिजली गुल)\n• Voltage fluctuation (वोल्टेज में उतार-चढ़ाव)\n• Damaged wires (तार टूटे हुए)\n• Meter problems (मीटर की समस्या)\n• Frequent power cuts (बार-बार कटौती)\n\n📱 Report on VAANI:\n1. Login to platform\n2. Select 'Electricity Issue'\n3. Use voice/text to describe\n4. Add location & details\n5. Track until resolved\n\n⏱️ Response Time:\n• Emergency: 2-4 hours\n• Regular: 24-48 hours\n\n🎤 Voice complaint available!\n\nReport your electricity issue now!"
  }
  
  // Garbage/Sanitation
  if (lowerMsg.includes('garbage') || lowerMsg.includes('कचरा') || lowerMsg.includes('waste') || lowerMsg.includes('sanitation') || lowerMsg.includes('स्वच्छता')) {
    return "Garbage & Sanitation Issues 🗑️\n\n📋 Common Problems:\n• Garbage not collected (कचरा नहीं उठाया)\n• Overflowing bins (भरे हुए डिब्बे)\n• Littering (गंदगी फैली हुई)\n• Foul smell (बदबू)\n• Irregular collection (अनियमित संग्रह)\n\n📱 Report on VAANI:\n1. Login to platform\n2. Select 'Garbage/Sanitation'\n3. Describe with voice/text\n4. Add photos & location\n5. Track complaint\n\n⏱️ Response: 24-48 hours\n\n🎤 Voice input available!\n👥 Get volunteer help!\n\nFile your sanitation complaint!"
  }
  
  // Streetlights
  if (lowerMsg.includes('streetlight') || lowerMsg.includes('light') || lowerMsg.includes('बत्ती') || lowerMsg.includes('रोशनी')) {
    return "Streetlight Issues 💡\n\n📋 Common Problems:\n• Lights not working (बत्ती नहीं जल रही)\n• Broken bulbs (टूटे बल्ब)\n• Damaged poles (खंभे टूटे)\n• Dim lighting (कम रोशनी)\n• Irregular timing (समय पर नहीं जलती)\n\n📱 Report on VAANI:\n1. Login to platform\n2. Select 'Streetlight Issue'\n3. Use voice/text input\n4. Specify exact location\n5. Track repair status\n\n⏱️ Response: 24-72 hours\n\n🎤 Voice complaint available!\n\nReport streetlight issues now!"
  }
  
  // Drainage
  if (lowerMsg.includes('drainage') || lowerMsg.includes('नाली') || lowerMsg.includes('sewer') || lowerMsg.includes('drain')) {
    return "Drainage & Sewage Issues 🚰\n\n📋 Common Problems:\n• Blocked drains (नाली बंद)\n• Overflowing sewage (गंदा पानी बह रहा)\n• Foul smell (बदबू)\n• Broken manholes (मैनहोल टूटा)\n• Water logging (पानी जमा)\n\n📱 Report on VAANI:\n1. Login to platform\n2. Select 'Drainage Issue'\n3. Describe with voice/text\n4. Add location & photos\n5. Track resolution\n\n⏱️ Response: 24-48 hours\n\n🎤 Voice input available!\n👥 Volunteers ready to help!\n\nFile your drainage complaint!"
  }
  
  // Public safety
  if (lowerMsg.includes('safety') || lowerMsg.includes('सुरक्षा') || lowerMsg.includes('emergency') || lowerMsg.includes('danger')) {
    return "Public Safety Concerns 🚨\n\n📋 Report Issues:\n• Unsafe areas (असुरक्षित क्षेत्र)\n• Broken infrastructure (टूटी संरचना)\n• Missing safety signs (संकेत नहीं)\n• Dangerous conditions (खतरनाक स्थिति)\n• Emergency situations (आपातकाल)\n\n📱 Report on VAANI:\n1. Login immediately\n2. Select 'Public Safety'\n3. Describe urgency\n4. Add location details\n5. Get priority response\n\n🚨 For immediate emergencies:\n• Police: 100\n• Ambulance: 108\n• Fire: 101\n\n⏱️ Priority Response: 2-24 hours\n\nReport safety concerns now!"
  }
  
  // Government services
  if (lowerMsg.includes('government') || lowerMsg.includes('सरकार') || lowerMsg.includes('service') || lowerMsg.includes('certificate')) {
    return "Government Service Complaints 🏛️\n\n📋 Report Issues:\n• Delayed services (सेवा में देरी)\n• Document problems (दस्तावेज़ समस्या)\n• Unresponsive officials (अधिकारी जवाब नहीं दे रहे)\n• Corruption concerns (भ्रष्टाचार)\n• Service denial (सेवा से इनकार)\n\n📱 Report on VAANI:\n1. Login to platform\n2. Select 'Government Service'\n3. Describe issue clearly\n4. Add relevant details\n5. Track complaint\n\n🎤 Voice input available!\n👥 Volunteer assistance!\n\n⏱️ Response: 3-7 days\n\nFile your complaint now!"
  }
  
  // Default civic response
  return "I'm VAANI - your civic assistant! 🏛️\n\nI can help you with:\n\n🛣️ Infrastructure:\n• Roads & potholes\n• Water supply\n• Electricity\n• Streetlights\n• Drainage\n\n🗑️ Sanitation:\n• Garbage collection\n• Waste management\n• Cleanliness issues\n\n🚨 Safety & Services:\n• Public safety\n• Government services\n• Municipal complaints\n\n📱 VAANI Features:\n✓ Easy complaint filing\n✓ Voice input (no reading needed!)\n✓ Volunteer support\n✓ Real-time tracking\n\nWhat civic issue can I help you with?"
}
app.post("/chat", async (req,res)=>{
  try{
    const userMsg = req.body.message
    console.log("Received message:", userMsg)

    // Generate cache key
    const cacheKey = getCacheKey(userMsg)
    
    // Check if response is in cache
    if (responseCache.has(cacheKey)) {
      console.log("Returning cached response")
      const cachedResponse = responseCache.get(cacheKey)
      return res.json(cachedResponse)
    }

    // Check if question is civic-related
    if (!isCivicIssueRelated(userMsg)) {
      console.log("Off-topic question detected")
      const offTopicResponse = {
        role: "assistant",
        content: "I apologize, but I can only assist with civic and public service issues. 🏛️\n\nI'm VAANI - your civic assistant for:\n• Roads & infrastructure (सड़क और बुनियादी ढांचा)\n• Water supply (पानी की आपूर्ति)\n• Electricity (बिजली)\n• Sanitation & waste (स्वच्छता और कचरा)\n• Streetlights & drainage (बत्तियां और नाली)\n• Public safety (सार्वजनिक सुरक्षा)\n• Government services (सरकारी सेवाएं)\n\n📱 You can file complaints on VAANI platform using voice input!\n\nPlease ask me about civic issues. How can I help you?"
      }
      
      // Cache the off-topic response
      responseCache.set(cacheKey, offTopicResponse)
      return res.json(offTopicResponse)
    }

    // Try OpenAI first (only for civic-related questions)
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model:"gpt-4o-mini",
          messages:[
            { 
              role:"system", 
              content:`You are VAANI, a civic-issue–focused AI assistant.

Your role is strictly limited to helping users with civic and public service issues such as:
- Roads, potholes, infrastructure
- Water supply problems
- Sanitation and waste management
- Electricity issues
- Streetlights and drainage
- Public safety concerns
- Government service complaints

SCOPE CONTROL:
If a user asks any question unrelated to civic or public service issues, respond politely with:
1. A brief apology
2. A clear statement that you can assist only with civic issues
3. A short list of example civic topics

Do NOT answer questions about:
- General knowledge, entertainment, sports
- Personal advice, relationships
- Weather, news, current events
- Technology, coding, or unrelated topics

PLATFORM AWARENESS:
Inform users that they can:
- Login and file civic complaints through VAANI platform
- Submit complaints using voice input (for those who can't read/write)
- Get assistance from trained volunteers
- Track complaint status until resolution
- Fast, accessible, and inclusive civic issue resolution

RESPONSE STYLE:
- Professional, supportive, citizen-first tone
- Use both English and Hindi when appropriate
- Keep responses concise and actionable
- Never hallucinate features
- If intent is unclear, ask clarifying questions (civic-related only)

You must strictly follow these rules at all times.`
            },
            { role:"user", content:userMsg }
          ]
        },
        {
          headers:{
            "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type":"application/json"
          },
          timeout: 10000
        }
      )

      const responseData = response.data.choices[0].message
      console.log("Sending OpenAI response:", responseData)
      
      // Cache the OpenAI response
      responseCache.set(cacheKey, responseData)
      
      res.json(responseData)
    } catch (apiError) {
      console.log("OpenAI API Error:", apiError.response?.status, apiError.response?.data?.error?.message || apiError.message)
      
      // Fallback to civic-focused mock response
      console.log("Using civic mock response as fallback")
      const mockResponse = {
        role: "assistant",
        content: getCivicIssueResponse(userMsg)
      }
      
      // Cache the mock response
      responseCache.set(cacheKey, mockResponse)
      console.log("Sending mock response:", mockResponse)
      
      res.json(mockResponse)
    }

  }catch(err){
    console.log("Server Error:", err.message)
    res.status(500).json({
      role: "assistant",
      content: "I'm having trouble connecting right now. Please try again later."
    })
  }
})

// Endpoint to check cache stats (optional, for debugging)
app.get("/cache-stats", (req, res) => {
  res.json({
    cachedResponses: responseCache.size,
    message: "Cache is working to save API credits"
  })
})

app.listen(5000,()=>console.log("Server running on port 5000 with caching enabled"))